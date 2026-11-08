/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TheMan } from '../components/TheMan';
import { TheJourney } from '../components/TheJourney';
import { TheGrace } from '../components/TheGrace';
import { TheLegacy } from '../components/TheLegacy';
import { Togetherness } from '../components/Togetherness';
import { Thanksgiving } from '../components/Thanksgiving';
import { Celebration } from '../components/Celebration';
import { Gallery } from '../components/Gallery';
import { Footer } from '../components/Footer';
import { SectionDivider } from '../components/SectionDivider';
import { ImageViewerProvider } from '../context/ImageViewerContext';

export default function App() {
  return (
    <ImageViewerProvider>
      <div className="min-h-screen bg-[#FAF6EC] text-[#2B2B2B] flex flex-col font-sans selection:bg-[#C9A24B] selection:text-[#4A0E1F]">
        {/* Fixed Navigation Bar with Official Thanksgiving Song Player */}
        <Navbar />

        {/* Main Page Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          <SectionDivider bg="bg-[#FAF6EC]" variant="burgundy" />

          {/* Section: The Man (Beyond the Title) */}
          <TheMan />

          <SectionDivider bg="bg-[#FAF6EC]" variant="burgundy" />

          {/* Section: The Journey (A Difficult Chapter - Hospital ICU) */}
          <TheJourney />

          <SectionDivider bg="bg-[#EFE4C8]" variant="burgundy" />

          {/* Section: The Grace of God (Hope and Healing) */}
          <TheGrace />

          <SectionDivider bg="bg-[#FAF6EC]" variant="burgundy" />

          {/* Section: The Legacy (Generosity & Youth Empowerment) */}
          <TheLegacy />

          <SectionDivider bg="bg-[#EFE4C8]" variant="burgundy" />

          {/* Section: Life, Family & Togetherness */}
          <Togetherness />

          <SectionDivider bg="bg-[#FAF6EC]" variant="burgundy" />

          {/* Section: The Thanksgiving (All Glory Belongs to God) */}
          <Thanksgiving />

          <SectionDivider bg="bg-[#FAF6EC]" variant="burgundy" />

          {/* Section: The Celebration (Saturday, November 14, 2026) */}
          <Celebration />

          <SectionDivider bg="bg-[#4A0E1F]" variant="on-dark" />

          {/* Section: Photo Gallery with Lightbox */}
          <Gallery />

          <SectionDivider bg="bg-[#3B0A18]" variant="on-dark" />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ImageViewerProvider>
  );
}
