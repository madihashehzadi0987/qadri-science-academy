import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { ACADEMY_EVENTS } from '../data/academyData';
import { AcademyEvent } from '../types';

export const ActivitiesEventsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalEvent, setActiveModalEvent] = useState<AcademyEvent | null>(null);

  const categories = ['All', 'Science & Tech', 'Sports', 'Competitions', 'Academic'];

  const filteredEvents =
    selectedCategory === 'All'
      ? ACADEMY_EVENTS
      : ACADEMY_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <section id="activities" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Beyond The Books</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Activities, Events & <span className="text-amber-400">Co-Curriculars</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Holistic education thrives on scientific inquiry, athletic vitality, and cultural expression.
            Explore our vibrant annual calendar of science expos, sports meets, and study excursions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all hover:-translate-y-1 shadow-xl flex flex-col group"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={evt.imageUrl}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-400 text-slate-950 shadow-md">
                    {evt.category}
                  </span>
                </div>
                {evt.isUpcoming && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow animate-pulse">
                      Upcoming
                    </span>
                  </div>
                )}
              </div>

              {/* Event Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-amber-400/90 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {evt.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {evt.highlights.length} Featured Highlights
                  </span>
                  <button
                    onClick={() => setActiveModalEvent(evt)}
                    className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    <span>Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full">
              <img
                src={activeModalEvent.imageUrl}
                alt={activeModalEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-400 text-slate-950">
                  {activeModalEvent.category}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {activeModalEvent.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{activeModalEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{activeModalEvent.time}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{activeModalEvent.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">About the Event</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeModalEvent.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">Event Highlights</h4>
                <div className="space-y-2">
                  {activeModalEvent.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
