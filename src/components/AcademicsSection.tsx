import React, { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  Award,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../data/academyData';
import { AcademicProgram } from '../types';

interface AcademicsSectionProps {
  onOpenAdmission: (gradePref?: string) => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onOpenAdmission }) => {
  const [selectedWingId, setSelectedWingId] = useState<string>('junior-wing');
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'testing'>('overview');

  const selectedProgram: AcademicProgram =
    ACADEMIC_PROGRAMS.find((p) => p.id === selectedWingId) || ACADEMIC_PROGRAMS[0];

  const wingButtons = [
    { id: 'junior-wing', label: 'Junior Wing', classes: 'Classes 1 to 5', icon: BookOpen },
    { id: 'middle-wing', label: 'Middle Wing', classes: 'Classes 6 to 8', icon: FlaskConical },
    { id: 'matric-science-bio', label: 'Matric Science', classes: '9th & 10th (Bio)', icon: Award },
    { id: 'matric-science-cs', label: 'Matric Computer', classes: '9th & 10th (CS)', icon: Layers },
  ];

  return (
    <section id="academics" className="py-20 bg-slate-950 text-white relative">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Structured Academic Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Excellence: <span className="text-amber-400">Classes 1–10 & Matric</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our progressive curriculum is structured into three specialized wings, providing unbroken academic continuity
            from foundational literacy to top board rankings.
          </p>
        </div>

        {/* Wing Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {wingButtons.map((wing) => {
            const Icon = wing.icon;
            const isSelected = selectedWingId === wing.id;
            return (
              <button
                key={wing.id}
                onClick={() => setSelectedWingId(wing.id)}
                className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all text-left group ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 transition-colors ${
                    isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-amber-400 group-hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm leading-tight text-white">{wing.label}</span>
                <span className="text-[11px] text-amber-400/90 font-medium mt-0.5">{wing.classes}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Wing Content Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                  {selectedProgram.badge || 'Academic Wing'}
                </span>
                <span className="text-slate-400 text-xs font-medium">BISE Board Aligned</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedProgram.title}</h3>
              <p className="text-amber-400 text-xs sm:text-sm font-medium">{selectedProgram.tagline}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAdmission(selectedProgram.title)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all flex items-center gap-2"
              >
                <span>Apply for this Wing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub Navigation Inside Program Card */}
          <div className="flex border-b border-slate-800 px-6 sm:px-8 bg-slate-950/40 gap-6 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`py-3.5 border-b-2 transition-colors ${
                activeTab === 'curriculum'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Curriculum & Subjects
            </button>
            <button
              onClick={() => setActiveTab('testing')}
              className={`py-3.5 border-b-2 transition-colors ${
                activeTab === 'testing'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Evaluation & Daily Timings
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedProgram.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {selectedProgram.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Wing Quick Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/40">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-[11px] text-slate-400">Class Timings</div>
                    <div className="text-xs font-semibold text-white">{selectedProgram.timing}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/40">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-[11px] text-slate-400">Target Age Group</div>
                    <div className="text-xs font-semibold text-white">{selectedProgram.ageGroup}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/40">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-[11px] text-slate-400">Assessment Cycle</div>
                    <div className="text-xs font-semibold text-white">Weekly Chapter + Monthly Mock</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Curriculum & Subjects */}
          {activeTab === 'curriculum' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Standard Prescribed Subjects</h4>
                <p className="text-xs text-slate-400">
                  Compliant with BISE Punjab Textbook Board, enriched with international science concepts
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedProgram.subjects.map((subj, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200"
                  >
                    <div className="w-6 h-6 rounded bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="font-medium">{subj}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/50 border border-amber-500/20 text-xs space-y-1.5 text-slate-300">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Practical Science Laboratory Sessions:
                </span>
                <p>
                  Secondary (9th & 10th) students conduct hands-on laboratory sessions twice every week under the direct
                  supervision of senior lab demonstrators. Each student is trained to maintain pristine practical note-journals
                  and master viva-voce questions ahead of the board examination.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Evaluation & Schedule */}
          {activeTab === 'testing' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Testing Policy */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" /> 4-Tier Continuous Evaluation System
                  </h4>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <strong className="text-amber-400 block mb-0.5">1. Daily Formula & Vocabulary Check:</strong>
                      15-minute quick written drill at the beginning of morning assembly.
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <strong className="text-amber-400 block mb-0.5">2. Saturday Chapter-End Tests:</strong>
                      Strict examination hall condition tests. Answer sheets returned with red ink marking and rubric corrections.
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <strong className="text-amber-400 block mb-0.5">3. Monthly Grand Cumulative Tests:</strong>
                      Comprehensive coverage of 3–4 chapters simulating half-term BISE standards.
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <strong className="text-amber-400 block mb-0.5">4. Winter Full-Syllabus Board Pre-Mocks:</strong>
                      Two complete rounds of board simulations during Dec–Feb prior to annual papers.
                    </div>
                  </div>
                </div>

                {/* Daily Schedule Structure */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" /> Typical Campus Routine
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-amber-400 font-semibold">07:30 AM – 07:50 AM</span>
                      <span className="text-slate-300">Assembly, Tilawat, National Anthem & Daily Quiz</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-amber-400 font-semibold">07:50 AM – 10:30 AM</span>
                      <span className="text-slate-300">Core Science & Mathematics Lectures (Periods 1–3)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-emerald-400 font-semibold">10:30 AM – 11:00 AM</span>
                      <span className="text-slate-300">Nutritional Break & Guided Physical Recreation</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-amber-400 font-semibold">11:00 AM – 01:15 PM</span>
                      <span className="text-slate-300">Language, Social Sciences & Lab Practicals</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-amber-400 font-semibold">01:15 PM – 02:30 PM</span>
                      <span className="text-slate-300">Zuhr Prayer Congregation & Supervised Study Drill</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/50 text-blue-300 text-xs">
                    Evening test batches and board revision clinics run from 4:00 PM to 7:00 PM for enrolled matric students.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
