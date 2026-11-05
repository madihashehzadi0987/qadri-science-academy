import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export const ContactSection: React.FC = () => {
  const scrollToAdmission = () => {
    const el = document.getElementById('admission-form');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Campus Help Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact <span className="text-amber-400">Qadri Science Academy</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions regarding admissions, fee structure, board exam coaching, or campus visits?
            Our administrative desk and counselors are available to assist you.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Admissions Hotline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Admissions & Helpline</h3>
              <p className="text-xs text-slate-400 mt-1">Direct phone and WhatsApp assistance</p>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary WhatsApp / Call:</span>
                <a
                  href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="text-base font-bold text-amber-400 hover:underline block"
                >
                  {ACADEMY_INFO.contact.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Campus Landline:</span>
                <span className="text-sm font-semibold text-white">
                  {ACADEMY_INFO.contact.alternatePhone}
                </span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${ACADEMY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Campus Location */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-blue-400/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Main Campus Address</h3>
              <p className="text-xs text-slate-400 mt-1">Convenient location near main boulevard</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ACADEMY_INFO.contact.address}
            </p>
            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Card 3: Office Hours & Fast Admission */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-amber-400/40 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Office & Visiting Hours</h3>
                <p className="text-xs text-slate-400 mt-1">Counselor consultations for parents</p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Monday – Saturday:</span>
                  <span className="font-semibold text-white">7:30 AM – 3:30 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Visiting Hours:</span>
                  <span className="font-semibold text-amber-400">10:00 AM – 1:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sunday:</span>
                  <span className="text-slate-500">Closed (Tests only)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToAdmission}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Apply on Admission Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
