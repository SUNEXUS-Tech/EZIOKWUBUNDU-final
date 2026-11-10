import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, ZoomIn, Sparkles, Filter } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryCategory } from '../types';
import { useImageViewer } from '../context/ImageViewerContext';

interface DedicatedGalleryProps {
  onBack: () => void;
}

export const DedicatedGallery: React.FC<DedicatedGalleryProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All Moments');
  const { openViewer } = useImageViewer();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const getCategoryCount = (cat: GalleryCategory) => {
    if (cat === 'All Moments') return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((item) => item.category === cat).length;
  };

  const handleOpenPhoto = (index: number) => {
    openViewer(
      filteredItems.map((item) => ({
        src: item.imageSrc,
        alt: item.title,
        title: item.title,
        caption: item.caption,
        category: item.category,
        dateOrEra: item.dateOrEra,
      })),
      index
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] text-[#2B2B2B] pt-20 pb-24">
      {/* Top Breadcrumb & Back Navigation Strip (Light Ivory Theme) */}
      <div className="bg-[#FAF6EC]/95 backdrop-blur-md border-b border-[#B18A43]/25 sticky top-14 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#350D19] hover:text-[#FAF6EC] px-3.5 py-1.5 rounded-full border border-[#B18A43]/40 hover:border-[#350D19] hover:bg-[#350D19] bg-[#F5EEDF] transition-all cursor-pointer group shadow-sm active:scale-95"
          >
            <ArrowLeft size={16} className="text-[#B18A43] group-hover:text-[#FAF6EC] transition-transform group-hover:-translate-x-1" />
            <span>Back to Main Experience</span>
          </button>

          <div className="text-right">
            <span className="text-[11px] sm:text-xs text-[#350D19]/70 uppercase tracking-widest font-mono">
              Archive: <strong className="text-[#B18A43] font-semibold">{filteredItems.length}</strong> / {GALLERY_ITEMS.length} Photos
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        {/* Exhibition Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[#B18A43] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Sparkles size={14} className="text-[#B18A43]" />
            <span>Complete Photographic Archive</span>
          </div>

          <h1 className="font-serif text-[#350D19] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            The Complete Gallery of Eziokwubundu I
          </h1>

          <p className="text-sm sm:text-base text-[#2B2B2B]/85 font-light leading-relaxed">
            A comprehensive visual record of 27 moments honouring Jude Ifeanyi Anwukah. From his regal heritage and community impact, through the harrowing valley of critical illness in intensive care, to divine healing, restored fellowship, and heartfelt thanksgiving.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs text-[#B18A43] uppercase tracking-wider font-semibold mb-3 px-1">
            <Filter size={13} />
            <span>Filter by Chapter</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 shadow-sm ${
                    isSelected
                      ? 'bg-[#350D19] text-[#FAF6EC] border-[#350D19] font-semibold shadow-md'
                      : 'bg-[#F5EEDF] hover:bg-[#EFE4C8] text-[#350D19] border-[#B18A43]/30 hover:border-[#B18A43]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? 'bg-[#B18A43]/30 text-[#E7D5A9]'
                        : 'bg-[#350D19]/10 text-[#350D19]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 27 Photographs Grid (Deep Burgundy Cards on Light Ivory Canvas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(index)}
              data-no-lightbox="true"
              className="group relative rounded-xl overflow-hidden border border-[#B18A43]/30 bg-[#2A0510] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
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
                  <div className="w-11 h-11 rounded-full bg-[#B18A43] text-[#350D19] flex items-center justify-center shadow-xl">
                    <ZoomIn size={20} />
                  </div>
                </div>

                {/* Category Pill Tag on Image */}
                <div className="absolute top-3 left-3 bg-[#350D19]/90 backdrop-blur-sm border border-[#B18A43]/40 px-2.5 py-1 rounded-full text-[10px] text-[#E7D5A9] uppercase tracking-wider font-semibold pointer-events-none shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Card Caption Information (Deep Burgundy Background with Warm Ivory Text) */}
              <div className="p-4 sm:p-5 bg-gradient-to-t from-[#1F030B] to-[#350D19] flex-1 flex flex-col justify-between border-t border-[#B18A43]/20">
                <div>
                  <h3 className="font-serif text-[#FAF6EC] font-semibold text-base sm:text-lg mb-1.5 group-hover:text-[#E7D5A9] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF6EC]/80 line-clamp-3 leading-relaxed font-light">
                    {item.caption}
                  </p>
                </div>

                {item.dateOrEra && (
                  <div className="mt-3 pt-2.5 border-t border-[#B18A43]/20 flex items-center justify-between text-[10px] text-[#B18A43] uppercase tracking-widest font-medium">
                    <span>{item.dateOrEra}</span>
                    <span className="text-[#FAF6EC]/60 font-mono">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Return CTA Banner (Deep Burgundy Framing on Light Ivory Canvas) */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#350D19] via-[#571D2B] to-[#350D19] border border-[#B18A43]/40 text-[#FAF6EC] text-center shadow-xl">
          <Camera size={32} className="text-[#B18A43] mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6EC] mb-3">
            Every Step a Testimony
          </h2>
          <p className="text-sm sm:text-base text-[#FAF6EC]/85 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            You have viewed the complete photographic archive. Join us in continuing this journey of faith, family, and thanksgiving.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B18A43] hover:bg-[#C9A24B] text-[#350D19] font-semibold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Return to Main Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
};
