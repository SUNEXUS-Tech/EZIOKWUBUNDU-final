import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface ImageViewerItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  category?: string;
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

  // Lock body scroll and handle keyboard shortcuts
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
        } else if (e.key === 'z' || e.key === 'Z') {
          toggleZoom();
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
  }, [isOpen, closeViewer, nextImage, prevImage, toggleZoom]);

  const active = items[currentIndex];

  return (
    <ImageViewerContext.Provider value={{ openViewer, closeViewer, openImage, closeImage }}>
      {children}

      {/* Full-Screen Website-Wide Lightbox Modal */}
      {isOpen && active && (
        <div
          data-image-viewer="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 text-white animate-fadeIn select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeViewer();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-1 pb-2 border-b border-white/10 z-20">
            <div className="text-left pr-4 min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-[#C9A24B] uppercase tracking-widest font-semibold">
                <Sparkles size={12} className="text-[#E0BE6C]" />
                <span>{active.category || 'Eziokwubundu I Archive'}</span>
              </div>
              <p className="font-serif text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl">
                {active.title || active.alt}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {items.length > 1 && (
                <span className="text-xs text-white/60 tracking-wider font-mono mr-1">
                  {currentIndex + 1} / {items.length}
                </span>
              )}

              <button
                onClick={toggleZoom}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#C9A24B] hover:text-[#4A0E1F] text-xs font-medium transition-all text-white border border-white/20 cursor-pointer"
                title={isZoomed ? 'Reset zoom (or press Z)' : 'Zoom in (or press Z)'}
                aria-label={isZoomed ? 'Reset Zoom' : 'Zoom In'}
              >
                {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
                <span className="hidden sm:inline">{isZoomed ? 'Reset' : 'Zoom'}</span>
              </button>

              <button
                onClick={closeViewer}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white border border-white/20 cursor-pointer"
                aria-label="Close Lightbox"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Central Image Viewer Stage */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-2 sm:my-3 overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeViewer();
            }}
          >
            {/* Previous Image Button (if collection) */}
            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-[#C9A24B] hover:text-[#4A0E1F] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg"
                aria-label="Previous photograph"
                title="Previous (Left arrow)"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Image Canvas */}
            <div
              className={`max-h-[75vh] max-w-full flex items-center justify-center transition-all duration-300 ${
                isZoomed ? 'cursor-zoom-out overflow-auto p-4' : 'cursor-zoom-in'
              }`}
              onClick={toggleZoom}
              title={isZoomed ? 'Click to reset size' : 'Click to zoom in'}
            >
              <img
                src={active.src}
                alt={active.alt}
                className={`max-h-[74vh] max-w-[92vw] object-contain rounded-lg shadow-2xl transition-transform duration-300 select-none ${
                  isZoomed ? 'scale-150 sm:scale-175 my-auto' : 'scale-100'
                }`}
                loading="eager"
              />
            </div>

            {/* Next Image Button (if collection) */}
            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-[#C9A24B] hover:text-[#4A0E1F] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg"
                aria-label="Next photograph"
                title="Next (Right arrow)"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Caption & Navigation Hint */}
          <div className="max-w-3xl mx-auto text-center pt-2 pb-1 z-20">
            {active.caption && (
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light mb-1 px-4">
                {active.caption}
              </p>
            )}
            <p className="text-[10px] text-white/50 tracking-wider">
              {items.length > 1 ? 'Use arrow keys or buttons to navigate · ' : ''}
              Click or tap image to zoom · Tap outside or press Esc to close
            </p>
          </div>
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

