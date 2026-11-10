import React from 'react';
import { Camera, ZoomIn, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { useImageViewer } from '../context/ImageViewerContext';

interface GalleryProps {
  onExploreFull?: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onExploreFull }) => {
  const { openViewer } = useImageViewer();

  // Curate 6 signature photographs representing each chapter of the journey
  const curatedPreviewIds = [
    'g-man-portrait',    // The Man Behind the Name
    'g-journey-icu',     // A Difficult Chapter (ICU)
    'g-journey-awakening', // Hope and Healing turning point
    'g-hope-home',       // Restored & Back Home
    'g-family-nature',   // Family & Togetherness
    'g-cel-hands',       // Life Celebrated (Hands raised in praise)
  ];

  const previewItems = curatedPreviewIds
    .map((id) => GALLERY_ITEMS.find((item) => item.id === id))
    .filter((item): item is typeof GALLERY_ITEMS[0] => item !== undefined);

  // If for any reason fallback is needed, take first 6
  const displayItems = previewItems.length >= 6 ? previewItems : GALLERY_ITEMS.slice(0, 6);

  const handleOpenPhoto = (itemToOpen: typeof GALLERY_ITEMS[0]) => {
    // Open in context of the full 27-item collection so visitors can browse through all of them
    const fullIndex = GALLERY_ITEMS.findIndex((item) => item.id === itemToOpen.id);
    openViewer(
      GALLERY_ITEMS.map((item) => ({
        src: item.imageSrc,
        alt: item.title,
        title: item.title,
        caption: item.caption,
        category: item.category,
        dateOrEra: item.dateOrEra,
      })),
      fullIndex !== -1 ? fullIndex : 0
    );
  };

  const handleNavigateToGallery = () => {
    if (onExploreFull) {
      onExploreFull();
    } else {
      window.location.hash = '#/gallery';
    }
  };

  return (
    <section id="gallery" aria-label="Photo Gallery" className="py-24 px-4 sm:px-6 bg-[#3B0A18] text-[#FAF6EC] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#C9A24B] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Camera size={14} />
            <span>Photo Gallery</span>
          </div>

          <h2 className="font-serif text-[#FAF6EC] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            A life told through photographs.
          </h2>

          <p className="text-sm sm:text-base text-[#FAF6EC]/85 font-light leading-relaxed">
            Every photograph preserves a sacred moment. Together, these memories tell a story of character, kinship, difficult seasons, miraculous hope, restoration, and joyous triumph.
          </p>
        </div>

        {/* Curated Preview Grid (6 Photographs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-14">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(item)}
              data-no-lightbox="true"
              className="group relative rounded-xl overflow-hidden border border-[#C9A24B]/30 bg-[#2A0510] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-black/40">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero.webp';
                  }}
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-[#C9A24B] text-[#4A0E1F] flex items-center justify-center shadow-xl">
                    <ZoomIn size={20} />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-[#3B0A18]/85 backdrop-blur-sm border border-[#C9A24B]/40 px-2.5 py-1 rounded-full text-[10px] text-[#C9A24B] uppercase tracking-wider font-semibold pointer-events-none shadow-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-gradient-to-t from-[#20040B] to-[#2E0713] flex-1 flex flex-col justify-between border-t border-[#C9A24B]/15">
                <div>
                  <h3 className="font-serif text-[#FAF6EC] font-semibold text-base sm:text-lg mb-1.5 group-hover:text-[#C9A24B] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF6EC]/70 line-clamp-2 leading-relaxed font-light">
                    {item.caption}
                  </p>
                </div>

                {item.dateOrEra && (
                  <div className="mt-3 pt-2.5 border-t border-[#C9A24B]/15 flex items-center justify-between text-[10px] text-[#C9A24B] uppercase tracking-widest">
                    <span>{item.dateOrEra}</span>
                    <span className="text-[#FAF6EC]/50 font-mono">Curated Preview</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prominent Exhibition CTA Bar to Explore Full Gallery */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2A0510] via-[#4A0E1F] to-[#2A0510] border border-[#C9A24B]/45 p-8 sm:p-12 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B0A18] border border-[#C9A24B]/35 text-[#C9A24B] text-xs uppercase tracking-widest font-semibold mb-4">
              <Layers size={13} />
              <span>Full Archive · 27 Photographs</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF6EC] mb-3 leading-snug">
              Step Inside the Full Exhibition
            </h3>

            <p className="text-sm sm:text-base text-[#FAF6EC]/85 font-light leading-relaxed mb-6">
              Browse the complete collection of 27 photographs across all chapters of Jude Ifeanyi Anwukah&apos;s journey, including the hospital vigil, family reunions, and gala praise celebrations.
            </p>

            <button
              onClick={handleNavigateToGallery}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C9A24B] hover:bg-[#D8B45B] text-[#4A0E1F] font-bold text-sm sm:text-base tracking-wide transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer group"
              aria-label="Explore Full Gallery (27 Photographs)"
            >
              <Sparkles size={18} className="text-[#4A0E1F]" />
              <span>Explore Full Gallery</span>
              <span className="text-xs font-mono font-normal bg-[#4A0E1F]/15 px-2 py-0.5 rounded-full">
                27 Photos
              </span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
