import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  ArrowUp,
  Heart,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

interface FooterProps {
  onOpenAdmission: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmission, onOpenTracker }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs relative">
      {/* Top Banner inside Footer */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Ready to Join Qadri Science Academy?
              </h4>
              <p className="text-xs text-slate-400">
                Admissions open for Academic Session 2026–2027. Early registrations qualify for merit fee waivers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTracker}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Track Application
            </button>
            <button
              onClick={onOpenAdmission}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-colors"
            >
              Submit Admission Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Branding & Affiliation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-400/40 p-1 flex items-center justify-center text-amber-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-crest font-bold text-base text-white tracking-wide block">
                  QADRI SCIENCE ACADEMY
                </span>
                <span className="text-[11px] text-amber-400/90 font-medium">
                  قادری سائنس اکیڈمی • Est. {ACADEMY_INFO.establishedYear}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Nurturing generations of doctors, engineers, and scientists through conceptual clarity, modern science
              laboratories, and unshakeable moral discipline.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] leading-tight">
                  {ACADEMY_INFO.affiliation}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Govt Reg. No: {ACADEMY_INFO.registrationNo}
              </div>
            </div>
          </div>

          {/* Col 3: Academic Wings */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Academic Wings
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#academics" className="hover:text-amber-400 transition-colors">
                  Junior Wing (Classes 1–5)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-400 transition-colors">
                  Middle Wing (Classes 6–8)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-400 transition-colors">
                  Matric Science (Pre-Medical 9th–10th)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-400 transition-colors">
                  Matric Computer Science (9th–10th)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-400 transition-colors">
                  Evening Board Test Batches
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-400 transition-colors">
                  Science Lab Practicals
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Quick Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About the Academy
                </a>
              </li>
              <li>
                <a href="#toppers" className="hover:text-amber-400 transition-colors">
                  Board Toppers Hall of Fame
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-amber-400 transition-colors">
                  TechnoVation Science Expo
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-amber-400 transition-colors">
                  Official Date Sheets & Circulars
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  Laboratory Photo Gallery
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Track Admission Application
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Helpline */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Contact & Visiting
            </h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Near Madina Chowk, Education Enclave</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${ACADEMY_INFO.contact.phone}`} className="hover:text-white">
                  {ACADEMY_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${ACADEMY_INFO.contact.email}`} className="hover:text-white">
                  {ACADEMY_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Mon–Sat: 7:30 AM – 3:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            &copy; {currentYear} {ACADEMY_INFO.name}. All Rights Reserved. Prepared for Vercel & Supabase integration.
          </p>

          <div className="flex items-center gap-4">
            <span>Affiliated with BISE</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
