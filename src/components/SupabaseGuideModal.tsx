import React, { useState } from 'react';
import {
  Database,
  X,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Terminal,
  FileCode,
  Server,
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface SupabaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseGuideModal: React.FC<SupabaseGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedEnv, setCopiedEnv] = useState(false);
  const isDbLive = isSupabaseConfigured();

  if (!isOpen) return null;

  const copyEnvSnippet = () => {
    const snippet = `# Supabase Environment Variables for Vercel & Vite
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key`;
    navigator.clipboard.writeText(snippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
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
              <span>{isDbLive ? 'Supabase Connected' : 'Supabase Ready (Awaiting Credentials)'}</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Supabase Database & Vercel Deployment Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            This application is engineered with the official <code className="text-amber-400">@supabase/supabase-js</code> client,
            clean environment variable isolation, and a complete SQL migration file ready for Supabase & Vercel.
          </p>
        </div>

        {/* How it works */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span>1. Environment Variables in .env / Vercel Dashboard</span>
            </div>
            <p className="text-xs text-slate-400">
              In your Supabase project (Project Settings &rarr; API), copy your Project URL and anon public key.
              Then add them to your local <code className="text-slate-200">.env</code> or Vercel Environment Variables:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 relative">
              <pre className="overflow-x-auto whitespace-pre">
{`VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...`}
              </pre>
              <button
                onClick={copyEnvSnippet}
                className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 flex items-center gap-1"
              >
                <Copy className="w-3 h-3 text-amber-400" />
                <span>{copiedEnv ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>2. Ready-to-Run SQL Schema (<code className="text-emerald-300">supabase/schema.sql</code>)</span>
            </div>
            <p className="text-xs text-slate-400">
              The project includes a complete migration script at <code className="text-slate-200 font-mono">/supabase/schema.sql</code> provisioning:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li>
                <strong className="text-white">admission_enquiries</strong>: saves student name, class applying for, guardian info, contact numbers, previous percentage, tracking ID, and admission status with Row Level Security (RLS).
              </li>
              <li>
                <strong className="text-white">contact_messages</strong>: captures inquiry messages from parents.
              </li>
              <li>
                <strong className="text-white">announcements</strong>: live academic bulletin board with pre-seeded circulars.
              </li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>3. Vercel Deployment Configuration (<code className="text-blue-300">vercel.json</code>)</span>
            </div>
            <p className="text-xs text-slate-400">
              A pre-configured <code className="text-slate-200 font-mono">vercel.json</code> has been included in the root directory.
              Simply push your repo to GitHub and import into Vercel; build command is <code className="text-amber-400 font-mono">npm run build</code> and output directory is <code className="text-amber-400 font-mono">dist</code>.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center border-t border-slate-800 text-xs">
          <span className="text-slate-400">
            Current Status: {isDbLive ? '⚡ Live Supabase Operations Active' : '💾 Safe Local Queue Active (Auto-connects on env load)'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
