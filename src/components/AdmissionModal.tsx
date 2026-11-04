import React from 'react';
import { X, GraduationCap } from 'lucide-react';
import { AdmissionFormSection } from './AdmissionFormSection';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGrade?: string;
  onOpenSupabaseGuide: () => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  initialGrade,
  onOpenSupabaseGuide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full my-auto max-h-[92vh] overflow-y-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-2 sm:p-4">
          <AdmissionFormSection
            initialGrade={initialGrade}
            onOpenSupabaseGuide={onOpenSupabaseGuide}
          />
        </div>
      </div>
    </div>
  );
};
