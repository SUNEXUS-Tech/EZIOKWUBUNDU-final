import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryCategory } from '../types';
import { useImageViewer } from '../context/ImageViewerContext';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All Moments');
  const { openViewer } = useImageViewer();

  const categories: GalleryCategory[] = [
    'All Moments',
    'The Man Behind the Name',
    'A Difficult Chapter',
    'Hope and Healing',
    'Family and Togetherness',
    'Life Celebrated',
  ];

  const filteredItems = selectedCategory === 'All Moments'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOpenPhoto = (index: number) => {
    openViewer(
      filteredItems.map((item) => ({
        src: item.imageSrc,
        alt: item.title,
        title: item.title,
        caption: item.caption,
        category: item.category,
      })),
      index
    );
  };

  return (
    <section id="gallery" aria-label="Photo Gallery" className="py-24 px-4 sm:px-6 bg-[#3B0A18] text-[#FAF6EC]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#C9A24B] text-[#4A0E1F] border-[#C9A24B] font-semibold shadow-md'
                    : 'bg-[#4A0E1F]/50 text-[#FAF6EC]/80 border-[#C9A24B]/30 hover:border-[#C9A24B] hover:text-[#FAF6EC]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(index)}
              data-no-lightbox="true"
              className="group relative rounded-xl overflow-hidden border border-[#C9A24B]/30 bg-[#2A0510] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero.webp';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-[#C9A24B] text-[#4A0E1F] flex items-center justify-center shadow-lg">
                    <ZoomIn size={18} />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-[#3B0A18]/80 backdrop-blur-sm border border-[#C9A24B]/40 px-2.5 py-1 rounded-full text-[10px] text-[#C9A24B] uppercase tracking-wider font-semibold pointer-events-none">
                  {item.category}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-t from-[#20040B] to-[#2E0713]">
                <h3 className="font-serif text-[#FAF6EC] font-semibold text-base mb-1 group-hover:text-[#C9A24B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#FAF6EC]/70 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
                {item.dateOrEra && (
                  <span className="inline-block mt-2 text-[10px] text-[#C9A24B] uppercase tracking-widest">
                    {item.dateOrEra}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
