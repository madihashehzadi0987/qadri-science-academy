import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Search,
  Database,
  ExternalLink,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { isSupabaseConfigured } from '../lib/supabase';

interface NavbarProps {
  onOpenAdmission: () => void;
  onOpenTracker: () => void;
  onOpenSupabaseGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmission,
  onOpenTracker,
  onOpenSupabaseGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isDbConfigured = isSupabaseConfigured();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'academics', 'toppers', 'activities', 'notices', 'gallery', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Academy', id: 'about' },
    { label: 'Academics (1–10 & Matric)', id: 'academics' },
    { label: 'Board Toppers', id: 'toppers' },
    { label: 'Events & Activities', id: 'activities' },
    { label: 'Notices', id: 'notices' },
    { label: 'Photo Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Notification Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Admissions Open 2026–2027 (Classes 1–10 & Matric)
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Office: 7:30 AM – 3:30 PM
            </span>
            <span className="hidden lg:inline-block text-slate-500">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              Reg. No: {ACADEMY_INFO.registrationNo}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-semibold text-xs">{ACADEMY_INFO.contact.phone}</span>
            </a>

            <button
              onClick={onOpenSupabaseGuide}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                isDbConfigured
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                  : 'bg-amber-950/70 text-amber-300 border border-amber-800/80 hover:bg-amber-900'
              }`}
              title="Click to view Supabase database schema & status"
            >
              <Database className="w-3 h-3" />
              <span>{isDbConfigured ? 'Supabase Live' : 'Supabase Ready'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800 py-2.5'
            : 'bg-slate-900/90 backdrop-blur-sm border-b border-slate-800/80 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Academy Crest & Branding */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md shadow-amber-900/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex flex-col items-center justify-center text-center p-1 border border-amber-400/40">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span className="text-[7px] font-bold tracking-wider text-amber-300 uppercase leading-none mt-0.5">
                  QSA
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-crest font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  QADRI SCIENCE ACADEMY
                </span>
              </div>
              <p className="text-[11px] text-amber-400/90 font-medium tracking-wide">
                Excellence in Science & Matric Education • Est. {ACADEMY_INFO.establishedYear}
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-all shadow-sm"
              title="Track submitted admission enquiry"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Form</span>
            </button>

            <button
              onClick={onOpenAdmission}
              className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Admission Enquiry</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAdmission}
              className="md:hidden px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-slate-950"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 shadow-2xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-amber-500/20 text-amber-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmission();
              }}
              className="w-full py-2.5 rounded-lg text-center font-bold text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md"
            >
              Submit Admission Enquiry 2026–27
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="py-2 px-3 rounded-lg text-center text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
              >
                Track Status
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupabaseGuide();
                }}
                className="py-2 px-3 rounded-lg text-center text-xs font-medium bg-slate-800 text-amber-300 border border-slate-700"
              >
                Database Info
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
