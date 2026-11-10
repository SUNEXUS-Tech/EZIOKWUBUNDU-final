/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
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
import { DedicatedGallery } from '../components/DedicatedGallery';
import { Footer } from '../components/Footer';
import { SectionDivider } from '../components/SectionDivider';
import { ImageViewerProvider } from '../context/ImageViewerContext';
import { Presentation } from '../components/Presentation';

export default function App() {
  const getIsGalleryRoute = () => {
    const hash = window.location.hash.toLowerCase();
    return hash === '#/gallery' || hash === '#gallery-archive' || hash === '#gallery-full';
  };

  const [isGalleryRoute, setIsGalleryRoute] = useState<boolean>(getIsGalleryRoute);
  const [isPresentationRoute, setIsPresentationRoute] = useState<boolean>(() => window.location.pathname.replace(/\/$/, '') === '/presentation');

  useEffect(() => {
    if (window.location.pathname.replace(/\/$/, '') === '/presentation') {
      window.history.replaceState({ ...window.history.state, presentationRoute: true }, '');
    }
    const handleRouteChange = () => setIsPresentationRoute(window.location.pathname.replace(/\/$/, '') === '/presentation');
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const isGallery = getIsGalleryRoute();
      setIsGalleryRoute(isGallery);

      // If switched back to a specific main page anchor (e.g. #gallery, #man, #celebration)
      if (!isGallery) {
        const hash = window.location.hash.replace('#', '');
        if (hash && hash !== '/') {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 60);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleExploreFullGallery = useCallback(() => {
    window.location.hash = '#/gallery';
  }, []);

  const handleBackToMain = useCallback(() => {
    // If user has previous navigation history within the app, go back or route to #gallery
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      window.history.back();
    } else {
      window.location.hash = '#gallery';
    }
  }, []);

  if (isPresentationRoute) return <Presentation />;

  return (
    <ImageViewerProvider>
      <div className="min-h-screen bg-[#FAF6EC] text-[#2B2B2B] flex flex-col font-sans selection:bg-[#C9A24B] selection:text-[#4A0E1F]">
        {/* Fixed Navigation Bar with Official Thanksgiving Song Player (persists without audio restart) */}
        <Navbar isGalleryRoute={isGalleryRoute} />

        {/* Content View Switcher */}
        {isGalleryRoute ? (
          <main className="flex-1">
            <DedicatedGallery onBack={handleBackToMain} />
          </main>
        ) : (
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

            {/* Section: Photo Gallery Curated Preview & Exhibition CTA */}
            <Gallery onExploreFull={handleExploreFullGallery} />

            <SectionDivider bg="bg-[#3B0A18]" variant="on-dark" />
          </main>
        )}

        {/* Footer */}
        <Footer isGalleryRoute={isGalleryRoute} />
      </div>
    </ImageViewerProvider>
  );
}
