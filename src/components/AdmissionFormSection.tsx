import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Copy,
  Printer,
  Sparkles,
  Database,
  ShieldCheck,
  User,
  GraduationCap,
  Phone,
  Mail,
  Home,
  Clock,
} from 'lucide-react';
import { submitAdmissionEnquiry, isSupabaseConfigured } from '../lib/supabase';
import { AdmissionEnquiryData } from '../types';

interface AdmissionFormProps {
  initialGrade?: string;
  onOpenSupabaseGuide: () => void;
}

export const AdmissionFormSection: React.FC<AdmissionFormProps> = ({
  initialGrade,
  onOpenSupabaseGuide,
}) => {
  const [formData, setFormData] = useState({
    student_name: '',
    dob: '',
    gender: 'male' as 'male' | 'female',
    grade_applying: initialGrade || 'Class 9th (Matric Science - Pre-Medical)',
    guardian_name: '',
    guardian_relation: 'Father',
    phone: '',
    email: '',
    previous_school: '',
    previous_marks_percentage: '',
    stream_interest: 'Science (Biology)',
    address: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    trackingId: string;
    source: 'supabase' | 'local';
    error?: string;
    submittedData: typeof formData;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const isDbLive = isSupabaseConfigured();

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

    try {
      const result = await submitAdmissionEnquiry(formData);
      if (result.success) {
        setSubmissionSuccess({
          trackingId: result.trackingId,
          source: result.source,
          error: result.error,
          submittedData: { ...formData },
        });
      }
    } catch (err: any) {
      alert(`Submission error: ${err?.message || 'Please check your inputs'}`);
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
    setFormData({
      student_name: '',
      dob: '',
      gender: 'male',
      grade_applying: 'Class 9th (Matric Science - Pre-Medical)',
      guardian_name: '',
      guardian_relation: 'Father',
      phone: '',
      email: '',
      previous_school: '',
      previous_marks_percentage: '',
      stream_interest: 'Science (Biology)',
      address: '',
      notes: '',
    });
  };

  return (
    <section id="admission-form" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions 2026–2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Online <span className="text-amber-400">Admission Enquiry Form</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fill out the form below to register your student for Classes 1–10 and Matric. Our admissions office will
            review your credentials and schedule an interactive assessment session.
          </p>

          {/* Database Connectivity Banner */}
          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={onOpenSupabaseGuide}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                isDbLive
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80 hover:bg-emerald-900'
                  : 'bg-slate-950 text-amber-300 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>
                {isDbLive
                  ? 'Connected to Supabase Database (admission_enquiries table)'
                  : 'Supabase Ready: Set VITE_SUPABASE_URL in .env / Vercel (Click for Schema)'}
              </span>
            </button>
          </div>
        </div>

        {/* If Form Submitted Successfully -> Display Receipt */}
        {submissionSuccess ? (
          <div className="bg-slate-950 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Admission Enquiry Registered!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Thank you for applying to Qadri Science Academy. Your application has been logged into the admissions
                system.
              </p>
            </div>

            {/* Tracking ID Hero Box */}
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 text-center space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Official Application Tracking ID
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-wider">
                {submissionSuccess.trackingId}
              </div>
              <p className="text-xs text-slate-400">
                Please save this reference number. You can use it to track your evaluation status at any time.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={copyTrackingId}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Reference ID'}</span>
                </button>
                <button
                  onClick={printReceipt}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-blue-400" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            {/* Application Summary Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
              <div className="font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Summary of Submitted Details</span>
                <span className="text-amber-400 font-normal text-xs">
                  Storage: {submissionSuccess.source === 'supabase' ? 'Supabase Cloud DB' : 'Local Queue (Pending Supabase Sync)'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-slate-300">
                <div>
                  <span className="text-slate-400 block text-xs">Student Name:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.student_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Grade Applying For:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.grade_applying}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Guardian Name:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.guardian_name} ({submissionSuccess.submittedData.guardian_relation})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Contact Phone:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Email Address:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Previous Percentage:</span>
                  <span className="font-semibold text-white">{submissionSuccess.submittedData.previous_marks_percentage || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Next Steps Guidance */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-300 space-y-2">
              <strong className="text-amber-400 flex items-center gap-1.5 font-bold">
                <Clock className="w-4 h-4" /> What Happens Next?
              </strong>
              <p>
                1. Our Admissions Officer will contact you on <strong>{submissionSuccess.submittedData.phone}</strong> within 24 hours.
              </p>
              <p>
                2. Please bring original birth certificate, previous school marksheet, and 2 passport photos for the assessment test on Saturday at 9:00 AM.
              </p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Step 1: Student Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                <User className="w-4 h-4" />
                <span>1. Student Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Student Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="student_name"
                    value={formData.student_name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ali Raza"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Date of Birth <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Gender <span className="text-rose-400">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="male">Male (Boys Section)</option>
                    <option value="female">Female (Girls Section)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Academic Program Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                <GraduationCap className="w-4 h-4" />
                <span>2. Grade & Academic Wing Selection</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Grade / Class Applying For <span className="text-rose-400">*</span>
                  </label>
                  <select
                    name="grade_applying"
                    value={formData.grade_applying}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <optgroup label="Secondary & Matriculation (BISE)">
                      <option value="Class 9th (Matric Science - Pre-Medical)">
                        Class 9th (Matric Science - Biology Group)
                      </option>
                      <option value="Class 9th (Matric Science - Computer Science)">
                        Class 9th (Matric Science - Computer Science Group)
                      </option>
                      <option value="Class 10th (Matric Science - Pre-Medical)">
                        Class 10th (Matric Science - Biology Group)
                      </option>
                      <option value="Class 10th (Matric Science - Computer Science)">
                        Class 10th (Matric Science - Computer Science Group)
                      </option>
                    </optgroup>
                    <optgroup label="Middle Wing">
                      <option value="Class 8">Class 8 (Pre-Matric)</option>
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

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Academic Stream Interest
                  </label>
                  <select
                    name="stream_interest"
                    value={formData.stream_interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Science (Biology / Medical)">Medical & Biology Track</option>
                    <option value="Computer Science / Engineering">Engineering & Computer Science Track</option>
                    <option value="General Science Foundation">General Science Foundation (Junior/Middle)</option>
                    <option value="Evening Board Test Series Only">Evening Board Mock Test Batch Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Guardian Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                <Home className="w-4 h-4" />
                <span>3. Guardian & Contact Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Father / Guardian Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="guardian_name"
                    value={formData.guardian_name}
                    onChange={handleInputChange}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Relationship <span className="text-rose-400">*</span>
                  </label>
                  <select
                    name="guardian_relation"
                    value={formData.guardian_relation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Elder Brother">Elder Brother</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp / Mobile Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Guardian Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="guardian@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Residential Address & City <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House #, Street, Colony / Area, City"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Academic Background */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                <FileText className="w-4 h-4" />
                <span>4. Previous Academic Background</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Previous School / Institute Name
                  </label>
                  <input
                    type="text"
                    name="previous_school"
                    value={formData.previous_school}
                    onChange={handleInputChange}
                    placeholder="e.g. Army Public School / Govt High School"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Previous Grade Marks / Percentage (for Scholarship)
                  </label>
                  <input
                    type="text"
                    name="previous_marks_percentage"
                    value={formData.previous_marks_percentage}
                    onChange={handleInputChange}
                    placeholder="e.g. 92% or 460/500"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Special Remarks or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any specific questions, hostel inquiries, or medical considerations..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button & Assurance */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Your application details are secure and treated with strict confidentiality.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Saving to Database...</span>
                ) : (
                  <>
                    <span>Submit Official Admission Enquiry</span>
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
