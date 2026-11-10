import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface ImageViewerItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  category?: string;
  dateOrEra?: string;
}

interface ImageViewerContextType {
  openViewer: (items: ImageViewerItem | ImageViewerItem[], startIndex?: number) => void;
  closeViewer: () => void;
  openImage: (image: ImageViewerItem) => void;
  closeImage: () => void;
}

const ImageViewerContext = createContext<ImageViewerContextType | undefined>(undefined);

export const ImageViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ImageViewerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Touch handling for mobile swipe and double-tap zoom
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef<number>(0);

  const openViewer = useCallback((newItems: ImageViewerItem | ImageViewerItem[], startIndex = 0) => {
    const list = Array.isArray(newItems) ? newItems : [newItems];
    if (list.length === 0) return;
    setItems(list);
    setCurrentIndex(Math.min(Math.max(0, startIndex), list.length - 1));
    setIsZoomed(false);
    setIsOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
  }, []);

  // Backward compatibility aliases
  const openImage = useCallback((image: ImageViewerItem) => {
    openViewer([image], 0);
  }, [openViewer]);

  const closeImage = closeViewer;

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const nextImage = useCallback(() => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevImage = useCallback(() => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Global delegated click listener for any photograph on the website
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore clicks on buttons, links, or inputs
      if (target.closest('button, a, input, textarea, select')) return;

      // Ignore clicks inside the active viewer
      if (target.closest('[data-image-viewer="true"]')) return;
      if (target.closest('[data-no-lightbox="true"]')) return;

      // Find image element either directly clicked or inside a clicked image card/container
      let img = target.closest('img');
      if (!img) {
        const card = target.closest('[data-image-card="true"], [data-image-tile="true"], .group');
        if (card) {
          img = card.querySelector('img');
        }
      }

      if (img && img.src) {
        if (img.classList.contains('no-lightbox')) return;
        const src = img.getAttribute('src') || img.src;

        // Ensure it's a gallery or narrative image
        if (src.includes('/images/') || src.includes('.webp')) {
          const alt = img.getAttribute('alt') || 'Photograph of Jude Ifeanyi Anwukah';
          const parentCard = img.closest('.group') || img.closest('[data-image-card="true"]') || img.parentElement;
          const titleEl = parentCard?.querySelector('h3, h4, .font-serif, span.font-serif, p.font-serif');
          const captionEl = parentCard?.querySelector('p:not(.font-serif), span.text-xs');

          const rawTitle = titleEl?.textContent?.trim();
          const title = rawTitle && rawTitle !== alt ? rawTitle : alt;
          const caption = captionEl?.textContent?.trim() || undefined;

          openViewer([{
            src,
            alt,
            title,
            caption: caption && caption !== title ? caption : undefined,
          }], 0);
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [openViewer]);

  // Lock body scroll and handle keyboard navigation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeViewer();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, closeViewer, nextImage, prevImage]);

  // Touch handlers for mobile swipe navigation and double-tap zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    const lastTap = lastTapRef.current;
    const touchStart = touchStartRef.current;

    // Double tap detection (< 300ms between taps with minimal movement)
    if (now - lastTap < 300) {
      toggleZoom();
      lastTapRef.current = 0;
      touchStartRef.current = null;
      return;
    }
    lastTapRef.current = now;

    if (!touchStart || e.changedTouches.length === 0) return;

    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    const duration = now - touchStart.time;

    // Horizontal swipe threshold: > 45px distance, mostly horizontal, within 450ms
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4 && duration < 450) {
      if (deltaX < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    touchStartRef.current = null;
  };

  const active = items[currentIndex];

  return (
    <ImageViewerContext.Provider value={{ openViewer, closeViewer, openImage, closeImage }}>
      {children}

      {/* Full-Screen Exhibition Lightbox Modal with Deep Charcoal-Wine Background */}
      {isOpen && active && (
        <div
          data-image-viewer="true"
          className="fixed inset-0 z-50 bg-[#211016] flex flex-col justify-between text-[#F5EEDF] animate-fadeIn select-none overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeViewer();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={active.title || active.alt}
        >
          {/* 1. Header Bar: Deep Burgundy #571D2B, full title without truncation, close button on far right */}
          <header className="bg-[#571D2B] border-b border-[#B18A43]/30 px-4 sm:px-8 py-3.5 sm:py-4 z-30 shadow-md flex items-center justify-between gap-4">
            <div className="flex-1 text-left min-w-0 pr-2">
              <div className="flex items-center gap-2 text-[#E7D5A9] text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold mb-0.5">
                <Sparkles size={13} className="text-[#B18A43] shrink-0" />
                <span className="truncate">{active.category || 'The Triumph of Eziokwubundu I'}</span>
                {active.dateOrEra && (
                  <>
                    <span className="text-[#B18A43]" aria-hidden="true">·</span>
                    <span className="text-[#E7D5A9]/80 font-normal">{active.dateOrEra}</span>
                  </>
                )}
              </div>
              <h2 className="font-serif text-base sm:text-xl font-bold text-[#F5EEDF] leading-snug break-words">
                {active.title || active.alt}
              </h2>
            </div>

            <div className="shrink-0">
              <button
                onClick={closeViewer}
                className="w-10 h-10 rounded-full bg-[#211016]/80 hover:bg-[#B18A43] hover:text-[#211016] text-[#F5EEDF] border border-[#B18A43]/40 flex items-center justify-center transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#B18A43]"
                aria-label="Close Lightbox (Esc)"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </header>

          {/* 2. Central Image Viewer Stage */}
          <div
            className="relative flex-1 flex items-center justify-center w-full px-2 sm:px-6 py-2 overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeViewer();
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Image Navigation Arrow */}
            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 sm:left-6 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#571D2B]/90 hover:bg-[#B18A43] text-[#F5EEDF] hover:text-[#211016] border border-[#B18A43]/50 flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B18A43]"
                aria-label="Previous photograph (Left arrow)"
                title="Previous (Left arrow)"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Image Canvas with Photograph Numbering Overlay Badge */}
            <div
              className={`relative max-h-[68vh] max-w-full flex items-center justify-center transition-all duration-300 ${
                isZoomed ? 'cursor-zoom-out overflow-auto p-4' : 'cursor-zoom-in'
              }`}
              onDoubleClick={toggleZoom}
              title={isZoomed ? 'Double-click to reset size' : 'Double-click or double-tap to zoom'}
            >
              <img
                src={active.src}
                alt={active.alt}
                className={`max-h-[66vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-lg shadow-2xl transition-transform duration-300 select-none ${
                  isZoomed ? 'scale-150 sm:scale-175 my-auto' : 'scale-100'
                }`}
                loading="eager"
              />

              {/* Photograph Numbering Badge: Top-right corner overlay inside image container */}
              {items.length > 1 && (
                <div
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-3 py-1 rounded-full bg-[#571D2B]/90 backdrop-blur-md border border-[#B18A43]/60 text-[#F5EEDF] text-xs font-mono font-semibold tracking-wider shadow-lg pointer-events-none"
                  aria-label={`Photograph ${currentIndex + 1} of ${items.length}`}
                >
                  <span className="text-[#E7D5A9]">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#B18A43] mx-1">/</span>
                  <span className="text-[#F5EEDF]/80">
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>

            {/* Next Image Navigation Arrow */}
            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 sm:right-6 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#571D2B]/90 hover:bg-[#B18A43] text-[#F5EEDF] hover:text-[#211016] border border-[#B18A43]/50 flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B18A43]"
                aria-label="Next photograph (Right arrow)"
                title="Next (Right arrow)"
              >
                <ChevronRight size={26} />
              </button>
            )}
          </div>

          {/* 3. Bottom Caption Panel: Deep Burgundy #571D2B with Warm White & Antique Gold details */}
          <footer className="bg-[#571D2B] border-t border-[#B18A43]/30 px-4 sm:px-8 py-3.5 sm:py-4.5 z-30 shadow-lg">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              {active.caption ? (
                <p className="text-sm sm:text-base text-[#F5EEDF] leading-relaxed font-normal mb-2 max-w-3xl">
                  {active.caption}
                </p>
              ) : active.title ? (
                <p className="font-serif text-sm sm:text-base text-[#F5EEDF] font-medium mb-1">
                  {active.title}
                </p>
              ) : null}

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#E7D5A9]/75 tracking-wider">
                <span>Double-tap or double-click to {isZoomed ? 'reset' : 'zoom'}</span>
                <span className="text-[#B18A43]" aria-hidden="true">·</span>
                <span>Swipe or arrow keys to navigate</span>
                <span className="text-[#B18A43] hidden sm:inline" aria-hidden="true">·</span>
                <span className="hidden sm:inline">Esc to close</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </ImageViewerContext.Provider>
  );
};

export const useImageViewer = (): ImageViewerContextType => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    throw new Error('useImageViewer must be used within an ImageViewerProvider');
  }
  return context;
};
