import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/academyData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Science Labs',
    'Matric Toppers',
    'Science Exhibition',
    'Campus Life',
    'Sports & Activities',
  ];

  const filteredPhotos =
    activeCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const openLightbox = (photo: GalleryPhoto) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Moments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Photo Gallery: <span className="text-amber-400">Campus & Laboratory Life</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Take a visual tour through our advanced scientific apparatus, matric award ceremonies, robotic displays,
            and vibrant student learning spaces.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-950/80 text-amber-400 border border-amber-400/30">
                    {photo.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/60 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </div>

                {/* Bottom Title & Caption */}
                <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 hover:text-amber-400 transition-colors hidden sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Photo Card in Lightbox */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative max-h-[70vh] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src={filteredPhotos[lightboxIndex].imageUrl}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="mt-4 text-center max-w-2xl px-4 space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-400 text-slate-950 mb-1">
                {filteredPhotos[lightboxIndex].category} ({lightboxIndex + 1} of {filteredPhotos.length})
              </span>
              <h3 className="text-lg font-bold text-white">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {filteredPhotos[lightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Navigation Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 hover:text-amber-400 transition-colors hidden sm:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
