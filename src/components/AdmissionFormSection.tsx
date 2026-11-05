import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  Sparkles,
  Database,
  ShieldCheck,
  User,
  GraduationCap,
  Phone,
  Home,
  RefreshCw,
  Key,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  submitAdmissionEnquiry,
  getSupabaseConfig,
  testSupabaseConnection,
} from '../lib/supabase';

interface AdmissionFormProps {
  initialGrade?: string;
  onOpenSupabaseGuide: () => void;
}

export const AdmissionFormSection: React.FC<AdmissionFormProps> = ({
  initialGrade,
  onOpenSupabaseGuide,
}) => {
  // Exactly 5 Fields as requested
  const [formData, setFormData] = useState({
    student_name: '',
    guardian_name: '',
    grade_applying: initialGrade || 'Class 9th (Matric Science)',
    phone: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    trackingId: string;
    tableName?: string;
    statusText: 'Saved in Supabase Successfully';
    submittedData: typeof formData;
  } | null>(null);

  const [submissionStatus, setSubmissionStatus] = useState<{
    statusText: 'Saved in Supabase Successfully' | 'Not Saved Yet';
    message: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Live Connection Diagnostics
  const [dbStatus, setDbStatus] = useState<{
    tested: boolean;
    loading: boolean;
    connected: boolean;
    url: string;
    tableFound?: string;
    error?: string;
  }>({
    tested: false,
    loading: false,
    connected: false,
    url: '',
  });

  const [showOverrideInputs, setShowOverrideInputs] = useState(false);
  const [overrideUrl, setOverrideUrl] = useState('');
  const [overrideKey, setOverrideKey] = useState('');
  const [overrideMessage, setOverrideMessage] = useState('');

  const config = getSupabaseConfig();
  const isDbLive = config.isConfigured;

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setDbStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await testSupabaseConnection();
      setDbStatus({
        tested: true,
        loading: false,
        connected: res.connected,
        url: res.url,
        tableFound: res.tableFound,
        error: res.error,
      });
    } catch (err: any) {
      setDbStatus({
        tested: true,
        loading: false,
        connected: false,
        url: config.url || 'Not set',
        error: err?.message || 'Connection test failed',
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const result = await submitAdmissionEnquiry(formData);

      if (result.success) {
        // Saved in Supabase Successfully
        setSubmissionSuccess({
          trackingId: result.trackingId,
          tableName: result.tableName,
          statusText: 'Saved in Supabase Successfully',
          submittedData: { ...formData },
        });
        setSubmissionStatus({
          statusText: 'Saved in Supabase Successfully',
          message: `Saved in Supabase Successfully (Table: ${result.tableName || 'admission_inquiries'}, ID: ${result.trackingId})`,
        });
      } else {
        // Not Saved Yet
        setSubmissionSuccess(null);
        setSubmissionStatus({
          statusText: 'Not Saved Yet',
          message: result.error || 'Not Saved Yet: Supabase rejected the insert or credentials are not active.',
        });
      }
    } catch (err: any) {
      setSubmissionSuccess(null);
      setSubmissionStatus({
        statusText: 'Not Saved Yet',
        message: `Not Saved Yet: ${err?.message || 'Network connection failed.'}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTrackingId = () => {
    if (submissionSuccess) {
      navigator.clipboard.writeText(submissionSuccess.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const printReceipt = () => {
    window.print();
  };

  const resetForm = () => {
    setSubmissionSuccess(null);
    setSubmissionStatus(null);
    setFormData({
      student_name: '',
      guardian_name: '',
      grade_applying: 'Class 9th (Matric Science)',
      phone: '',
      address: '',
    });
  };

  const saveRuntimeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideUrl.trim() || !overrideKey.trim()) return;

    localStorage.setItem('VITE_SUPABASE_URL', overrideUrl.trim());
    localStorage.setItem('VITE_SUPABASE_ANON_KEY', overrideKey.trim());
    setOverrideMessage('Credentials saved! Retesting connection...');
    setTimeout(() => {
      checkConnection();
      setOverrideMessage('');
      setShowOverrideInputs(false);
    }, 1000);
  };

  return (
    <section id="admission-form" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admission 2026–2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Admission <span className="text-amber-400">Enquiry Form</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Quick 5-field official application form for Classes 1 to 10 and Matric.
          </p>
        </div>

        {/* Database Live Status Strip */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3 h-3 rounded-full ${
                  dbStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <div>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  Supabase Status:
                  {dbStatus.loading ? (
                    <span className="text-slate-400 font-normal">Testing connection...</span>
                  ) : dbStatus.connected ? (
                    <span className="text-emerald-400 font-bold">
                      Connected to {dbStatus.tableFound || 'admission_inquiries'}
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold">
                      {isDbLive ? 'Table not found yet' : 'Credentials not detected on Vercel'}
                    </span>
                  )}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  URL: <span className="text-slate-300 font-mono">{config.url || '(not set)'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={checkConnection}
                disabled={dbStatus.loading}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${dbStatus.loading ? 'animate-spin' : ''}`} />
                <span>Test</span>
              </button>

              <button
                type="button"
                onClick={() => setShowOverrideInputs(!showOverrideInputs)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 flex items-center gap-1 transition-colors"
              >
                <Key className="w-3 h-3" />
                <span>Config</span>
                {showOverrideInputs ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={onOpenSupabaseGuide}
                className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 font-semibold flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3" />
                <span>SQL Script</span>
              </button>
            </div>
          </div>

          {/* Quick Browser Config Drawer */}
          {showOverrideInputs && (
            <form onSubmit={saveRuntimeCredentials} className="mt-3 pt-3 border-t border-slate-800 space-y-3">
              <div className="text-xs text-slate-300 font-semibold">
                Direct Supabase Key Setup (Runs in your browser instantly):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Project URL</label>
                  <input
                    type="text"
                    required
                    placeholder="https://your-id.supabase.co"
                    value={overrideUrl}
                    onChange={(e) => setOverrideUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Anon Public Key</label>
                  <input
                    type="password"
                    required
                    placeholder="eyJh..."
                    value={overrideKey}
                    onChange={(e) => setOverrideKey(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {overrideMessage && (
                <div className="text-xs text-emerald-400 font-medium">{overrideMessage}</div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300"
                >
                  Save & Connect
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ALWAYS SHOW THE STATUS MESSAGE */}
        {submissionStatus && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all animate-in fade-in ${
              submissionStatus.statusText === 'Saved in Supabase Successfully'
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/80 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {submissionStatus.statusText === 'Saved in Supabase Successfully' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
              )}
              <div>
                <h4 className="text-base font-extrabold tracking-wide">
                  {submissionStatus.statusText}
                </h4>
                <p className="text-xs mt-0.5 opacity-90 leading-relaxed font-mono">
                  {submissionStatus.message}
                </p>
              </div>
            </div>

            {submissionStatus.statusText === 'Not Saved Yet' && (
              <div className="mt-3 pt-3 border-t border-rose-800/60 flex flex-wrap items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={onOpenSupabaseGuide}
                  className="px-3 py-1 rounded bg-rose-900/80 hover:bg-rose-800 text-white font-semibold"
                >
                  View SQL to Create Table in Supabase &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => setShowOverrideInputs(true)}
                  className="text-amber-300 hover:underline"
                >
                  Enter credentials in browser &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* If Form Submitted Successfully -> Display Receipt */}
        {submissionSuccess ? (
          <div className="bg-slate-950 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            {/* Top Status Banner */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-sm font-extrabold uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Saved in Supabase Successfully</span>
              </div>
              <p className="text-xs text-slate-300">
                Your admission enquiry has been saved to your Supabase table{' '}
                <strong className="text-amber-400 font-mono">{submissionSuccess.tableName}</strong>.
              </p>
            </div>

            {/* Tracking ID Box */}
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 text-center space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Official Tracking ID
              </span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-wider">
                {submissionSuccess.trackingId}
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={copyTrackingId}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{copied ? 'Copied!' : 'Copy Reference ID'}</span>
                </button>
                <button
                  type="button"
                  onClick={printReceipt}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-400" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            {/* 5 Submitted Fields Summary */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="font-bold text-white border-b border-slate-800 pb-2">
                Submitted Student Information (5 Fields)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[11px]">1. Student Full Name:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.student_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">2. Father / Guardian Name:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.guardian_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">3. Class Applying For:</span>
                  <span className="font-semibold text-amber-400">{submissionSuccess.submittedData.grade_applying}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">4. Contact / WhatsApp:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.phone}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">5. City / Address:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.address}</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
              >
                Submit Another Admission Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* EXACTLY 1 FORM WITH EXACTLY 5 FIELDS */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
          >
            {/* Field 1: Student Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Student Full Name</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                name="student_name"
                value={formData.student_name}
                onChange={handleInputChange}
                placeholder="Enter student full name (e.g. Muhammad Ali)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Field 2: Father / Guardian Name */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Father / Guardian Name</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleInputChange}
                placeholder="Enter father or guardian name (e.g. Tariq Mehmood)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Field 3: Class / Grade Applying For */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>3. Class / Grade Applying For</span>
                <span className="text-rose-400">*</span>
              </label>
              <select
                name="grade_applying"
                value={formData.grade_applying}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              >
                <optgroup label="Matriculation & Secondary (BISE)">
                  <option value="Class 9th (Matric Science - Biology)">Class 9th (Matric Science - Biology Group)</option>
                  <option value="Class 9th (Matric Science - Computer Science)">Class 9th (Matric Science - Computer Science Group)</option>
                  <option value="Class 10th (Matric Science - Biology)">Class 10th (Matric Science - Biology Group)</option>
                  <option value="Class 10th (Matric Science - Computer Science)">Class 10th (Matric Science - Computer Science Group)</option>
                </optgroup>
                <optgroup label="Middle Wing">
                  <option value="Class 8 (Pre-Matric)">Class 8 (Pre-Matric)</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 6">Class 6</option>
                </optgroup>
                <optgroup label="Junior Wing">
                  <option value="Class 5">Class 5</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 1">Class 1</option>
                </optgroup>
              </select>
            </div>

            {/* Field 4: Contact / WhatsApp Number */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>4. Contact / WhatsApp Number</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+92 3XX XXXXXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Field 5: City / Residential Address */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>5. City / Residential Address</span>
                <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={2}
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter residential area / street, and city (e.g. Madina Colony, Multan)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Directly records into Supabase & confirms status instantly.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Saving to Supabase...</span>
                ) : (
                  <>
                    <span>Submit Admission Form</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
