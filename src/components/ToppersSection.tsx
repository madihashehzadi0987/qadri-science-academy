import React from 'react';
import { Trophy, Award, Star, Quote, GraduationCap, CheckCircle } from 'lucide-react';
import { BOARD_TOPPERS } from '../data/academyData';

export const ToppersSection: React.FC = () => {
  return (
    <section id="toppers" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Hall of Distinction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Matriculation <span className="text-amber-400">Board Toppers</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Consistently producing top position holders and exceptional 1000+ scores in BISE Annual Examinations.
            Here are our stars who made their parents and mentors proud.
          </p>
        </div>

        {/* Toppers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BOARD_TOPPERS.map((topper, index) => (
            <div
              key={topper.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge Banner */}
                <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-4 py-2 flex items-center justify-between text-slate-950 font-bold text-xs">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Top Board Merit #{index + 1}</span>
                  </span>
                  <span>Class of {topper.year}</span>
                </div>

                <div className="p-6 space-y-5">
                  {/* Photo & Quick Score */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-md flex-shrink-0">
                      <img
                        src={topper.photoUrl}
                        alt={topper.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                        {topper.name}
                      </h3>
                      <p className="text-amber-400 text-xs font-semibold mt-0.5">{topper.group}</p>
                      <p className="text-[11px] text-slate-400">
                        {topper.board} • Roll #{topper.rollNumber}
                      </p>
                    </div>
                  </div>

                  {/* Big Marks Highlight Box */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Board Total Marks</div>
                      <div className="text-2xl font-black text-white font-crest">
                        {topper.marks}{' '}
                        <span className="text-xs font-normal text-slate-400">/ {topper.totalMarks}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-medium">Percentage</div>
                      <div className="text-xl font-extrabold text-amber-400">{topper.percentage}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative pl-3 border-l-2 border-amber-400/40 text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{topper.quote}&rdquo;
                  </div>
                </div>
              </div>

              {/* Bottom Current Higher Education Institution */}
              <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate font-medium">{topper.currentInstitution}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Merit Scholarship Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Star className="w-4 h-4" />
              <span>Merit Recognition Scheme</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Do You Have 90%+ in Your Previous Grade or School Examination?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Qadri Science Academy awards up to 100% Tuition Fee Waivers & free study materials for high-achieving
              science students joining Classes 9th and 10th.
            </p>
          </div>

          <a
            href="#admission-form"
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg whitespace-nowrap transition-transform active:scale-95"
          >
            Apply for Merit Scholarship
          </a>
        </div>
      </div>
    </section>
  );
};
