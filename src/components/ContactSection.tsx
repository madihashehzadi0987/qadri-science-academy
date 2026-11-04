import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { submitContactMessage } from '../lib/supabase';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSentSuccess(true);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }
    } catch (e: any) {
      alert(`Message error: ${e?.message || 'Please try again'}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Our Admissions Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact <span className="text-amber-400">Qadri Science Academy</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions regarding admissions, fee concessions, board exam batches, or campus visits?
            Our administrative team is here to assist you.
          </p>
        </div>

        {/* Contact Info & Message Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Campus Details & Office Timings */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Building className="w-5 h-5 text-amber-400" />
                <span>Campus Administration Office</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Address */}
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Campus Address</span>
                    <span className="text-xs text-slate-400 leading-relaxed">
                      {ACADEMY_INFO.contact.address}
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Helpline / WhatsApp</span>
                    <a
                      href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
                      className="text-xs text-amber-400 hover:underline block"
                    >
                      {ACADEMY_INFO.contact.phone} (Admissions)
                    </a>
                    <span className="text-[11px] text-slate-400">
                      Landline: {ACADEMY_INFO.contact.alternatePhone}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Official Emails</span>
                    <a
                      href={`mailto:${ACADEMY_INFO.contact.email}`}
                      className="text-xs text-amber-400 hover:underline block"
                    >
                      {ACADEMY_INFO.contact.email}
                    </a>
                    <a
                      href={`mailto:${ACADEMY_INFO.contact.infoEmail}`}
                      className="text-xs text-slate-400 hover:underline block"
                    >
                      {ACADEMY_INFO.contact.infoEmail}
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Campus Timings</span>
                    <span className="text-xs text-slate-400 leading-relaxed block">
                      {ACADEMY_INFO.contact.timings}
                    </span>
                    <span className="text-[11px] text-amber-400/90 block mt-0.5">
                      Visiting Hours: {ACADEMY_INFO.contact.visitingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Campus Location Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-amber-400" /> Campus Location Map
                </span>
                <span className="text-[11px] text-slate-400">Easy Main Road Access</span>
              </div>
              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/40 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-white">Qadri Science Academy Main Campus</div>
                  <div className="text-[11px] text-slate-400">Opposite Education Complex, Near Madina Chowk</div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-amber-400"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <span>Send an Instant Message to Admin</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Our admissions coordinator typically replies within 2–4 hours during business days.
                </p>
              </div>

              {sentSuccess ? (
                <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out to Qadri Science Academy. A counselor has received your message and will respond shortly.
                  </p>
                  <button
                    onClick={() => setSentSuccess(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="e.g. Asad Ullah"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Contact Phone / WhatsApp <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 3XX XXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="youremail@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Subject of Inquiry <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Matric Admission 2026 / Fee Inquiry"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Message / Question <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your question, desired class, or visiting appointment..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Saves to Supabase contact_messages table
                    </span>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all active:scale-95 flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                    >
                      {isSending ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
