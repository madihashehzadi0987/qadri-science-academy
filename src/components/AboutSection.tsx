import React from 'react';
import {
  GraduationCap,
  Target,
  Compass,
  CheckCircle,
  FlaskConical,
  BookOpen,
  Microscope,
  Shield,
  Sparkles,
  Award,
} from 'lucide-react';
import { ACADEMY_INFO, FACULTY_MEMBERS } from '../data/academyData';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Conceptual & Inquiry-Driven Science',
      desc: 'We replace rote memorization with physical experiments, visual models, and logical derivations so students genuinely understand the "why" behind every scientific formula.',
      icon: FlaskConical,
    },
    {
      title: 'Rigorous Board-Targeted Testing System',
      desc: 'Weekly topic evaluations, monthly grand tests, and rigorous winter mock exam series designed strictly around BISE board exam patterns and marking rubrics.',
      icon: Award,
    },
    {
      title: 'Individual Academic Mentorship (15:1 Ratio)',
      desc: 'Small batch sizes in science laboratories allow teachers to identify learning gaps early, providing dedicated remedial support and personalized guidance.',
      icon: Target,
    },
    {
      title: 'Character, Discipline & Moral Upbringing',
      desc: 'We cultivate polite manners, punctuality, intellectual humility, and Islamic ethics alongside modern scientific excellence to build respectable future citizens.',
      icon: Shield,
    },
  ];

  const facilities = [
    {
      title: 'Specialized Science Labs',
      desc: 'Separate, fully stocked Physics, Chemistry, and Biology laboratories equipped with individual apparatus sets and safety gear.',
      icon: Microscope,
    },
    {
      title: 'Modern Computer & AI Lab',
      desc: 'High-speed internet workstations with modern programming IDEs, algorithmic training, and interactive simulation software.',
      icon: Compass,
    },
    {
      title: 'Academic Science Library',
      desc: 'Extensive repository of science reference encyclopedias, board past paper solutions, and competitive exam workbooks.',
      icon: BookOpen,
    },
    {
      title: 'Safe & Monitored Campus',
      desc: '24/7 CCTV surveillance, biometric security, RO clean drinking water plants, and separate prayer & dining halls.',
      icon: Shield,
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legacy of Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-amber-400">Qadri Science Academy</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Established in {ACADEMY_INFO.establishedYear}, Qadri Science Academy has evolved into a premier center
            of educational excellence. We prepare students from <strong className="text-white">Classes 1 through 10 & Matric</strong> with
            an unwavering commitment to intellectual curiosity and moral character.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-7 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To deliver world-class science and matric education that bridges deep theoretical knowledge with
              practical laboratory competence. We aim to equip every student with analytical thinking, board exam
              distinction capability, and the moral fortitude to lead in science, medicine, technology, and society.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-400">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Concept Clarity Over Rote Learning</span>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-7 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To be the most trusted and transformative academic institution in the region, recognized for generating
              the highest percentage of medical and engineering qualifiers while instilling ethical responsibility,
              discipline, and a lifelong passion for scientific inquiry.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-blue-400">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Future Scientists, Doctors & Engineers</span>
            </div>
          </div>
        </div>

        {/* Principal's Message */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-lg relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                  alt="Prof. Muhammad Tariq Qadri"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold text-white">Prof. Muhammad Tariq Qadri</h4>
                <p className="text-amber-400 text-xs font-semibold">Principal & Head of Sciences</p>
                <p className="text-slate-400 text-[11px] mt-0.5">M.Phil Physics (Gold Medalist), B.Ed</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span>Message from the Principal</span>
                <span className="w-12 h-px bg-amber-400/40" />
              </div>

              <blockquote className="text-base sm:text-lg text-slate-200 italic font-serif leading-relaxed">
                &ldquo;Education is not the learning of dry facts, but the training of the mind to think, question, and
                create. At Qadri Science Academy, we believe that every child who walks through our gates possesses
                latent brilliance. Our sacred duty as teachers is to kindle that spark with rigorous science, compassionate
                mentoring, and unyielding discipline.&rdquo;
              </blockquote>

              <p className="text-sm text-slate-300 leading-relaxed">
                Whether your child is entering our Junior Wing to develop foundational literacy and curiosity, or stepping
                into our Matriculation labs to prepare for the board examination of their lifetime, we guarantee a focused,
                supportive, and intellectually stimulating environment.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                <span className="font-semibold text-white">Office Hours for Parents:</span>
                <span>Mon – Thu: 10:00 AM – 1:30 PM (By Appointment)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">The Four Pillars of Academic Rigor</h3>
            <p className="text-slate-400 text-xs mt-1">What makes learning at Qadri Science Academy distinctive</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 hover:border-amber-400/30 transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{pillar.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Facilities */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">Modern Campus & Infrastructure</h3>
            <p className="text-slate-400 text-xs mt-1">Purpose-built learning spaces configured for academic focus</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 hover:bg-slate-950/80 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{fac.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{fac.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faculty & Mentorship Section */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Distinguished Faculty</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Senior Subject Mentors</h3>
            <p className="text-slate-400 text-xs mt-1">
              Experienced pedagogues with verified track records in BISE Board Topper mentoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTY_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{member.name}</h4>
                      <p className="text-xs text-amber-400 font-medium">{member.role}</p>
                      <p className="text-[11px] text-slate-400">{member.experience}</p>
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] text-blue-300 font-medium">
                    {member.subject}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{member.bio}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{member.qualifications}</span>
                  <span className="text-amber-400 font-semibold">QSA Faculty</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
