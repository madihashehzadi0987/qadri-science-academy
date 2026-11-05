import React, { useState } from 'react';
import {
  Database,
  X,
  Copy,
  ShieldCheck,
  FileCode,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { isSupabaseConfigured, getSupabaseConfig } from '../lib/supabase';

interface SupabaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseGuideModal: React.FC<SupabaseGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const config = getSupabaseConfig();
  const isDbLive = config.isConfigured;

  if (!isOpen) return null;

  const sqlPrompt = `-- ====================================================================
-- PROMPT TO PASTE IN SUPABASE SQL EDITOR TO CREATE ADMISSION TABLE (5 FIELDS)
-- ====================================================================
-- Paste into: Supabase Dashboard -> SQL Editor -> Click 'Run'

CREATE TABLE IF NOT EXISTS public.admission_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_id VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(150) NOT NULL,     -- Field 1: Student Full Name
    guardian_name VARCHAR(150) NOT NULL,    -- Field 2: Father / Guardian Name
    grade_applying VARCHAR(100) NOT NULL,   -- Field 3: Class Applying For (1–10 & Matric)
    phone VARCHAR(30) NOT NULL,             -- Field 4: Contact / WhatsApp Number
    address TEXT NOT NULL,                  -- Field 5: City / Residential Address
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for instant tracking lookup
CREATE INDEX IF NOT EXISTS idx_admission_inquiries_tracking_id 
ON public.admission_inquiries (tracking_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous visitors to submit new admission inquiries
DROP POLICY IF EXISTS "Allow public insert to admission_inquiries" ON public.admission_inquiries;
CREATE POLICY "Allow public insert to admission_inquiries" 
ON public.admission_inquiries
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow public lookup of submitted status with their tracking_id
DROP POLICY IF EXISTS "Allow public select by tracking_id" ON public.admission_inquiries;
CREATE POLICY "Allow public select by tracking_id" 
ON public.admission_inquiries
FOR SELECT 
TO anon, authenticated
USING (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlPrompt);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const copyEnvSnippet = () => {
    const snippet = `VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key`;
    navigator.clipboard.writeText(snippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isDbLive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isDbLive ? 'Supabase Credentials Detected' : 'Supabase Credentials Missing in Build'}</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Supabase Prompt & Table Setup (5-Field Admission Form)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Copy the prompt below and paste it directly into your <strong>Supabase Dashboard &rarr; SQL Editor</strong> to create the table.
          </p>
        </div>

        {/* SQL Prompt Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <FileCode className="w-4 h-4" />
              SQL Prompt to Paste in Supabase
            </span>
            <button
              onClick={copySql}
              className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 flex items-center gap-1.5 shadow"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSql ? 'Copied Prompt!' : 'Copy SQL Prompt'}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-56 overflow-y-auto text-[11px] font-mono text-emerald-300">
            <pre className="whitespace-pre">{sqlPrompt}</pre>
          </div>
        </div>

        {/* Status Behavior Explanation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>"Saved in Supabase Successfully"</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Displayed whenever the 5 fields are successfully committed into your Supabase database table.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1">
            <div className="font-bold text-rose-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>"Not Saved Yet"</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Displayed whenever Supabase rejected the insert, the table is missing, or Vercel credentials are not active.
            </p>
          </div>
        </div>

        {/* Vercel Redeployment Notice */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Vercel Environment Variables Reminder</span>
            </span>
            <button
              onClick={copyEnvSnippet}
              className="text-amber-400 hover:underline text-[11px]"
            >
              {copiedEnv ? 'Copied Keys' : 'Copy Key Template'}
            </button>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            If you added <code className="text-amber-300">VITE_SUPABASE_URL</code> and <code className="text-amber-300">VITE_SUPABASE_ANON_KEY</code> to Vercel after your initial deploy, click <strong>Redeploy</strong> in Vercel so Vite can compile them into your website bundle.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-700 text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
