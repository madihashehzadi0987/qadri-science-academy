import React, { useState } from 'react';
import {
  Bell,
  Pin,
  Calendar,
  FileText,
  Download,
  Search,
  AlertCircle,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';
import { ACADEMY_NOTICES } from '../data/academyData';
import { Notice } from '../types';

export const NoticesSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);

  const filters = ['All', 'Admission', 'Examination', 'Notice', 'Holiday'];

  const filteredNotices = ACADEMY_NOTICES.filter((notice) => {
    const matchesFilter = selectedFilter === 'All' || notice.category === selectedFilter;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.circularNo && notice.circularNo.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="notices" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Academy Bulletin</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Notices & <span className="text-amber-400">Announcements</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Stay updated with official academic circulars, exam schedules, holiday notices, and parent meeting dates.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedFilter === filter
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {filter === 'All' ? 'All Notices' : filter}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or circular #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Notices Cards List */}
        <div className="space-y-4">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
              No circulars found matching your search. Try adjusting the category or search keyword.
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setActiveNoticeModal(notice)}
                className={`cursor-pointer bg-slate-950/80 border rounded-2xl p-5 sm:p-6 transition-all hover:border-amber-400/50 hover:bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                  notice.isPinned ? 'border-amber-500/40' : 'border-slate-800'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {notice.isPinned && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                        <Pin className="w-3 h-3 fill-current" /> Pinned Circular
                      </span>
                    )}
                    {notice.isNew && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500 text-white animate-pulse">
                        NEW
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
                      {notice.category}
                    </span>
                    {notice.circularNo && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        {notice.circularNo}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {notice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {notice.description}
                  </p>
                </div>

                {/* Right Metadata & Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80 text-xs text-slate-400 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{notice.date}</span>
                  </div>

                  <button className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Circular</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveNoticeModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded font-bold bg-amber-400 text-slate-950">
                  {activeNoticeModal.category}
                </span>
                {activeNoticeModal.circularNo && (
                  <span className="font-mono text-slate-400 text-xs">
                    Ref: {activeNoticeModal.circularNo}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">
                {activeNoticeModal.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Issue Date: {activeNoticeModal.date}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <p>{activeNoticeModal.description}</p>
              <p className="text-slate-400 text-xs pt-2">
                All concerned parents, faculty members, and students are advised to take note of the above circular. For inquiries, contact the academy administration office during visiting hours.
              </p>
            </div>

            {activeNoticeModal.attachmentName && (
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-200 truncate">
                  <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{activeNoticeModal.attachmentName}</span>
                </div>
                <button
                  onClick={() => {
                    alert(`Downloading official circular: ${activeNoticeModal.attachmentName}`);
                  }}
                  className="px-3 py-1.5 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 flex items-center gap-1.5 flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
