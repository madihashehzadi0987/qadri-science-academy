/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AcademicsSection } from './components/AcademicsSection';
import { ToppersSection } from './components/ToppersSection';
import { ActivitiesEventsSection } from './components/ActivitiesEventsSection';
import { NoticesSection } from './components/NoticesSection';
import { GallerySection } from './components/GallerySection';
import { AdmissionFormSection } from './components/AdmissionFormSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdmissionModal } from './components/AdmissionModal';
import { EnquiryTrackerModal } from './components/EnquiryTrackerModal';
import { SupabaseGuideModal } from './components/SupabaseGuideModal';

export default function App() {
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [isSupabaseGuideOpen, setIsSupabaseGuideOpen] = useState(false);
  const [selectedWingPref, setSelectedWingPref] = useState<string | undefined>(undefined);

  const handleOpenAdmission = (wingPref?: string) => {
    setSelectedWingPref(wingPref);
    // Smooth scroll to admission form on page
    const formEl = document.getElementById('admission-form');
    if (formEl) {
      const navOffset = 80;
      const elementPosition = formEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      setIsAdmissionModalOpen(true);
    }
  };

  const handleExploreAcademics = () => {
    const el = document.getElementById('academics');
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        onOpenAdmission={() => handleOpenAdmission()}
        onOpenTracker={() => setIsTrackerModalOpen(true)}
        onOpenSupabaseGuide={() => setIsSupabaseGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenAdmission={() => handleOpenAdmission()}
          onExploreAcademics={handleExploreAcademics}
        />

        {/* 2. About Academy */}
        <AboutSection />

        {/* 3. Academics (Classes 1–10 and Matric) */}
        <AcademicsSection
          onOpenAdmission={(gradePref) => handleOpenAdmission(gradePref)}
        />

        {/* 4. Board Toppers Hall of Fame */}
        <ToppersSection />

        {/* 5. Activities and Events */}
        <ActivitiesEventsSection />

        {/* 6. Notices and Announcements */}
        <NoticesSection />

        {/* 7. Photo Gallery */}
        <GallerySection />

        {/* 8. Admission Enquiry Form (Full Interactive Supabase Integrated) */}
        <AdmissionFormSection
          initialGrade={selectedWingPref}
          onOpenSupabaseGuide={() => setIsSupabaseGuideOpen(true)}
        />

        {/* 9. Contact Information & Message Form */}
        <ContactSection />
      </main>

      {/* Professional Footer */}
      <Footer
        onOpenAdmission={() => handleOpenAdmission()}
        onOpenTracker={() => setIsTrackerModalOpen(true)}
      />

      {/* Modals */}
      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        initialGrade={selectedWingPref}
        onOpenSupabaseGuide={() => setIsSupabaseGuideOpen(true)}
      />

      <EnquiryTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
      />

      <SupabaseGuideModal
        isOpen={isSupabaseGuideOpen}
        onClose={() => setIsSupabaseGuideOpen(false)}
      />
    </div>
  );
}
