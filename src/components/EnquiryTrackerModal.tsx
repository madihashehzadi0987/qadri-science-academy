import React, { useState } from 'react';
import {
  Search,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { lookupAdmissionEnquiry } from '../lib/supabase';
import { AdmissionEnquiryData } from '../types';

interface EnquiryTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryTrackerModal: React.FC<EnquiryTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<AdmissionEnquiryData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingIdInput.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    try {
      const data = await lookupAdmissionEnquiry(trackingIdInput);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'admitted':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            Admitted / Enrollment Confirmed
          </span>
        );
      case 'interview_scheduled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">
            Assessment & Interview Scheduled
          </span>
        );
      case 'reviewed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/40">
            Application Under Review
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
            Application Received (Pending Assessment)
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Search className="w-4 h-4" />
            <span>Admission Portal</span>
          </div>
          <h3 className="text-xl font-bold text-white">Track Admission Enquiry</h3>
          <p className="text-xs text-slate-400">
            Enter your official Tracking ID (e.g., <code className="text-amber-300 font-mono">QSA-2026-XXXX</code>) to check the latest verification status.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. QSA-2026-1234"
              value={trackingIdInput}
              onChange={(e) => setTrackingIdInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-amber-400 uppercase"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors disabled:opacity-60"
            >
              {isSearching ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {/* Results View */}
        {hasSearched && (
          <div className="pt-2">
            {result ? (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Tracking ID</span>
                    <span className="font-mono font-bold text-amber-400 text-base">
                      {result.tracking_id}
                    </span>
                  </div>
                  <div>{getStatusBadge(result.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Student:</span>
                    <strong className="text-white">{result.student_name}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Class / Wing:</span>
                    <strong className="text-white">{result.grade_applying}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Guardian:</span>
                    <span>{result.guardian_name} ({result.guardian_relation})</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Phone:</span>
                    <span>{result.phone}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1 text-slate-300">
                  <div className="font-semibold text-amber-400">Next Action:</div>
                  <p>
                    Please visit the admissions office on Saturday morning with original documents and previous grade report card for student diagnostic evaluation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                <div>
                  <strong>No record found for &quot;{trackingIdInput}&quot;.</strong>
                  <p className="mt-0.5 text-slate-400">
                    Please ensure the ID was typed correctly or submit a new enquiry form below.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
