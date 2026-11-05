import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AdmissionEnquiryData } from '../types';

// Retrieve credentials from Vite env or runtime localStorage override
export const getSupabaseConfig = () => {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/^["']|["']$/g, '');
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/^["']|["']$/g, '');

  let localUrl = '';
  let localKey = '';
  try {
    localUrl = (localStorage.getItem('VITE_SUPABASE_URL') || '').trim().replace(/^["']|["']$/g, '');
    localKey = (localStorage.getItem('VITE_SUPABASE_ANON_KEY') || '').trim().replace(/^["']|["']$/g, '');
  } catch (e) {
    // localStorage not accessible
  }

  const url = envUrl || localUrl;
  const key = envKey || localKey;

  const isConfigured = Boolean(
    url &&
    key &&
    url.startsWith('https://') &&
    !url.includes('your-project-id') &&
    key !== 'your-anon-public-key' &&
    key.length > 20
  );

  return {
    url,
    key,
    isConfigured,
    source: envUrl ? 'env' : localUrl ? 'local_storage' : 'none',
  };
};

export const isSupabaseConfigured = (): boolean => {
  return getSupabaseConfig().isConfigured;
};

// Create a Supabase client instance dynamically
export const getSupabaseClient = (): SupabaseClient | null => {
  const config = getSupabaseConfig();
  if (!config.isConfigured) return null;

  try {
    return createClient(config.url, config.key, {
      auth: {
        persistSession: false,
      },
    });
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

// Candidate table names to support both UK 'enquiries' and US/common 'inquiries'
export const ADMISSION_TABLE_CANDIDATES = ['admission_inquiries', 'admission_enquiries'] as const;
let cachedAdmissionTable: string | null = null;

// Generate tracking ID
export const generateTrackingId = (): string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `QSA-2026-${randomNum}`;
};

export interface SubmitAdmissionResult {
  success: boolean;
  trackingId: string;
  tableName?: string;
  statusText: 'Saved in Supabase Successfully' | 'Not Saved Yet';
  error?: string;
  details?: any;
}

/**
 * Submit the 5-field admission enquiry form to Supabase.
 * Exactly 5 fields:
 * 1. student_name
 * 2. guardian_name
 * 3. grade_applying
 * 4. phone
 * 5. address
 */
export async function submitAdmissionEnquiry(
  data: Omit<AdmissionEnquiryData, 'id' | 'created_at' | 'tracking_id'>
): Promise<SubmitAdmissionResult> {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    return {
      success: false,
      trackingId: '',
      statusText: 'Not Saved Yet',
      error:
        'Not Saved Yet: Supabase credentials (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are missing. In Vercel, set these in Project Settings and click Redeploy, or click "Config" above to enter them directly in your browser.',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      trackingId: '',
      statusText: 'Not Saved Yet',
      error: 'Not Saved Yet: Could not connect to Supabase client with the provided credentials.',
    };
  }

  const trackingId = generateTrackingId();
  const timestamp = new Date().toISOString();

  // Exactly 5 user fields + tracking_id + created_at
  const payload: Record<string, any> = {
    tracking_id: trackingId,
    student_name: data.student_name.trim(),
    guardian_name: data.guardian_name.trim(),
    grade_applying: data.grade_applying.trim(),
    phone: data.phone.trim(),
    address: data.address.trim(),
    created_at: timestamp,
  };

  const tablesToTry = cachedAdmissionTable
    ? [cachedAdmissionTable, ...ADMISSION_TABLE_CANDIDATES.filter((t) => t !== cachedAdmissionTable)]
    : ADMISSION_TABLE_CANDIDATES;

  let lastError: any = null;

  for (const tableName of tablesToTry) {
    try {
      const { error } = await client.from(tableName).insert([payload]);

      if (!error) {
        cachedAdmissionTable = tableName;
        return {
          success: true,
          trackingId,
          tableName,
          statusText: 'Saved in Supabase Successfully',
        };
      }

      lastError = error;

      // If table doesn't exist, try the other candidate name
      if (
        error.code === '42P01' ||
        error.message?.toLowerCase().includes('does not exist') ||
        error.message?.toLowerCase().includes('relation')
      ) {
        continue;
      }

      break;
    } catch (err: any) {
      lastError = err;
    }
  }

  const errorDesc = formatSupabaseError(lastError);
  console.error('Supabase INSERT failed:', lastError);

  return {
    success: false,
    trackingId: '',
    statusText: 'Not Saved Yet',
    error: `Not Saved Yet: ${errorDesc}`,
    details: lastError,
  };
}

/**
 * Lookup admission enquiry by tracking ID
 */
export async function lookupAdmissionEnquiry(
  trackingId: string
): Promise<AdmissionEnquiryData | null> {
  const sanitized = trackingId.trim().toUpperCase();
  const client = getSupabaseClient();
  if (!client) return null;

  const tablesToTry = cachedAdmissionTable
    ? [cachedAdmissionTable, ...ADMISSION_TABLE_CANDIDATES.filter((t) => t !== cachedAdmissionTable)]
    : ADMISSION_TABLE_CANDIDATES;

  for (const tableName of tablesToTry) {
    try {
      const { data, error } = await client
        .from(tableName)
        .select('*')
        .ilike('tracking_id', sanitized)
        .maybeSingle();

      if (!error && data) {
        cachedAdmissionTable = tableName;
        return data as AdmissionEnquiryData;
      }
    } catch (e) {
      // Continue to next table
    }
  }

  return null;
}

/**
 * Test connectivity and verify existing tables
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  url: string;
  tableFound?: string;
  error?: string;
}> {
  const config = getSupabaseConfig();
  if (!config.isConfigured) {
    return {
      connected: false,
      url: config.url || 'Not set',
      error: 'Environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not configured.',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      connected: false,
      url: config.url,
      error: 'Unable to initialize client with the specified credentials.',
    };
  }

  // Check which admission table exists
  for (const table of ADMISSION_TABLE_CANDIDATES) {
    try {
      const { error } = await client.from(table).select('count', { count: 'exact', head: true });
      if (!error) {
        cachedAdmissionTable = table;
        return {
          connected: true,
          url: config.url,
          tableFound: table,
        };
      }
      if (error && error.code !== '42P01') {
        cachedAdmissionTable = table;
        return {
          connected: true,
          url: config.url,
          tableFound: table,
        };
      }
    } catch (e: any) {
      // Continue
    }
  }

  return {
    connected: false,
    url: config.url,
    error: `Connected to Supabase project, but the 'admission_inquiries' table was not found yet. Run the SQL prompt in Supabase SQL editor to create it.`,
  };
}

/**
 * Format raw Supabase / Postgres errors into actionable user guidance
 */
function formatSupabaseError(err: any): string {
  if (!err) return 'Unknown database error occurred.';

  const code = err.code || '';
  const message = err.message || '';
  const details = err.details || '';
  const hint = err.hint || '';

  if (code === '42501' || message.toLowerCase().includes('row-level security') || message.toLowerCase().includes('violates row-level security')) {
    return `Row Level Security (RLS) is blocking public form submissions. Run this in your Supabase SQL Editor: CREATE POLICY "Allow public insert" ON public.admission_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);`;
  }

  if (code === '42P01' || message.toLowerCase().includes('does not exist')) {
    return `Table 'admission_inquiries' does not exist in your Supabase project yet. Please copy and run the SQL prompt in your Supabase SQL Editor.`;
  }

  if (code === '23505' || message.toLowerCase().includes('duplicate key') || message.toLowerCase().includes('unique')) {
    return `Tracking ID collision occurred. Please submit again.`;
  }

  if (code === '23502' || message.toLowerCase().includes('not-null constraint')) {
    return `Required column is missing or null: ${message}. ${details}`;
  }

  return `${message} ${details ? `(${details})` : ''} ${hint ? `Hint: ${hint}` : ''}`.trim();
}
