import React from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  BookOpen,
  Calendar,
  Sparkles,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

interface HeroProps {
  onOpenAdmission: () => void;
  onExploreAcademics: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdmission, onExploreAcademics }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background Decorative Glow & Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Registered & BISE Board Preparation Specialized</span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-amber-400" />
              <span className="hidden sm:inline-block text-slate-300 font-normal">Session 2026–2027</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Igniting Curiosity,{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Nurturing Board Distinctions
              </span>{' '}
              & Future Scientists.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From foundational primary cognition in <strong className="text-white">Classes 1–5</strong> to
              rigorous secondary sciences in <strong className="text-white">Classes 6–8</strong> and
              high-achieving <strong className="text-white">9th & 10th Matric</strong> (Pre-Medical & Computer
              Science). We blend conceptual mastery, cutting-edge laboratories, and steadfast character.
            </p>

            {/* Wing Pill Highlights */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-1 text-xs">
              <span className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-200 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Junior Wing (1–5)
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-200 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-blue-400" /> Middle Wing (6–8)
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/90 border border-amber-500/40 text-amber-300 font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Matric Science & CS (9th–10th)
              </span>
            </div>

            {/* Call to Actions */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenAdmission}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Admission Enquiry 2026–27</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreAcademics}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Academic Wings</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Registration Fee for Online Enquiry
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Merit Scholarships Available (up to 100%)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Separate Boys & Girls Sections
              </span>
            </div>
          </div>

          {/* Right Column: Visual Card with Topper & Lab Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <img
                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80"
                    alt="Qadri Science Academy Physics & Chemistry Laboratory"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Overlay Text in Card */}
                <div className="p-6 relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                      <FlaskConical className="w-3.5 h-3.5" /> Advanced Science Labs
                    </span>
                    <span className="text-xs text-slate-400">Classes 1–10 & Matric</span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    Where Scientific Concepts Turn Into Tangible Discovery
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Equipped with specialized physics apparatus, analytical chemistry glassware, high-power microscopes, and computer labs for complete practical readiness.
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                        98%
                      </div>
                      <div>
                        <div className="font-semibold text-white">Board Distinction</div>
                        <div className="text-[10px]">A+ Grades in Science</div>
                      </div>
                    </div>

                    <a
                      href="#toppers"
                      className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 hover:underline"
                    >
                      Hall of Fame &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Matric Badge Pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900/95 border border-amber-500/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md max-w-[240px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">1074 / 1100 Marks</div>
                    <div className="text-[11px] text-amber-400 font-medium">Top Board Position 2025</div>
                    <div className="text-[10px] text-slate-400">BISE Bahawalpur</div>
                  </div>
                </div>
              </div>

              {/* Floating Faculty Pill */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-xl backdrop-blur-md items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Prof. M. Tariq Qadri</div>
                  <div className="text-[10px] text-slate-400">M.Phil Physics (Principal)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Key Performance Statistics Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {ACADEMY_INFO.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/70 text-center hover:border-amber-500/30 transition-all hover:-translate-y-0.5"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight font-crest">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
