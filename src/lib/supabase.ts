import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AdmissionEnquiryData, ContactMessageData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid Supabase credentials have been injected
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseAnonKey !== 'your-anon-public-key' &&
    supabaseAnonKey.length > 20
  );
};

// Singleton client instance
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
      },
    })
  : null;

const STORAGE_ENQUIRIES_KEY = 'qsa_admission_enquiries';
const STORAGE_MESSAGES_KEY = 'qsa_contact_messages';

// Generate a professional human-readable tracking ID (e.g., QSA-2026-8472)
export const generateTrackingId = (): string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `QSA-2026-${randomNum}`;
};

/**
 * Submit an admission enquiry to Supabase.
 * If Supabase is configured, records to the `admission_enquiries` table.
 * If not yet configured, cleanly stores to localStorage and informs the user.
 */
export async function submitAdmissionEnquiry(
  data: Omit<AdmissionEnquiryData, 'id' | 'created_at' | 'tracking_id' | 'status'>
): Promise<{ success: boolean; trackingId: string; source: 'supabase' | 'local'; error?: string }> {
  const trackingId = generateTrackingId();
  const timestamp = new Date().toISOString();

  const record: AdmissionEnquiryData = {
    ...data,
    tracking_id: trackingId,
    status: 'pending',
    created_at: timestamp,
  };

  // If Supabase is connected, attempt direct write
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from('admission_enquiries')
        .insert([record])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert failed, falling back to local queue:', error.message);
        saveToLocalStorage(STORAGE_ENQUIRIES_KEY, record);
        return {
          success: true,
          trackingId,
          source: 'local',
          error: `Saved locally (Supabase table error: ${error.message}). Please ensure 'admission_enquiries' table is created.`,
        };
      }

      return {
        success: true,
        trackingId: inserted?.tracking_id || trackingId,
        source: 'supabase',
      };
    } catch (err: any) {
      console.error('Error contacting Supabase:', err);
      saveToLocalStorage(STORAGE_ENQUIRIES_KEY, record);
      return {
        success: true,
        trackingId,
        source: 'local',
        error: err?.message,
      };
    }
  }

  // Fallback: Safe Local Storage with deployment readiness instructions
  saveToLocalStorage(STORAGE_ENQUIRIES_KEY, record);
  return {
    success: true,
    trackingId,
    source: 'local',
  };
}

/**
 * Submit general contact inquiry message
 */
export async function submitContactMessage(
  data: Omit<ContactMessageData, 'id' | 'created_at'>
): Promise<{ success: boolean; source: 'supabase' | 'local'; error?: string }> {
  const timestamp = new Date().toISOString();
  const record: ContactMessageData = {
    ...data,
    created_at: timestamp,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('contact_messages').insert([record]);
      if (error) {
        saveToLocalStorage(STORAGE_MESSAGES_KEY, record);
        return { success: true, source: 'local', error: error.message };
      }
      return { success: true, source: 'supabase' };
    } catch (err: any) {
      saveToLocalStorage(STORAGE_MESSAGES_KEY, record);
      return { success: true, source: 'local', error: err?.message };
    }
  }

  saveToLocalStorage(STORAGE_MESSAGES_KEY, record);
  return { success: true, source: 'local' };
}

/**
 * Retrieve admission enquiry by tracking ID
 */
export async function lookupAdmissionEnquiry(
  trackingId: string
): Promise<AdmissionEnquiryData | null> {
  const sanitized = trackingId.trim().toUpperCase();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('admission_enquiries')
        .select('*')
        .ilike('tracking_id', sanitized)
        .maybeSingle();

      if (!error && data) {
        return data as AdmissionEnquiryData;
      }
    } catch (e) {
      console.warn('Error querying Supabase for trackingId:', e);
    }
  }

  // Search local cache
  const localItems = getFromLocalStorage<AdmissionEnquiryData>(STORAGE_ENQUIRIES_KEY);
  const found = localItems.find(
    (item) => item.tracking_id?.toUpperCase() === sanitized
  );
  return found || null;
}

/**
 * Helper to get all stored enquiries (useful for previewing submissions)
 */
export function getLocalEnquiries(): AdmissionEnquiryData[] {
  return getFromLocalStorage<AdmissionEnquiryData>(STORAGE_ENQUIRIES_KEY);
}

function saveToLocalStorage<T>(key: string, item: T) {
  try {
    const existing = getFromLocalStorage<T>(key);
    existing.unshift(item);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

function getFromLocalStorage<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
