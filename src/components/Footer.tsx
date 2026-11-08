import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { EVENT_DETAILS } from '../data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer aria-label="Page Footer" className="bg-[#4A0E1F] text-[#FAF6EC] text-center pt-20 pb-16 px-4 sm:px-6 border-t-2 border-[#C9A24B]/40 relative">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Heraldic Medallion */}
        <div className="w-12 h-12 rounded-full border border-[#C9A24B] bg-[#3B0A18] flex items-center justify-center text-[#C9A24B] mb-6 shadow-md">
          <span className="font-serif font-bold text-sm">E·I</span>
        </div>

        <div className="inline-flex items-center gap-2 text-[#C9A24B] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          <Sparkles size={14} />
          <span>A Life Celebrated · A Testimony Preserved</span>
        </div>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#FAF6EC]/85 font-light leading-relaxed mb-8">
          May this story remain a perpetual reminder that life is fragile and precious, faith in God is mighty,
          and gratitude is always worthwhile.
        </p>

        {/* Triple Proclamation */}
        <div className="py-6 px-8 rounded-2xl bg-[#3B0A18]/60 border border-[#C9A24B]/30 max-w-lg mx-auto mb-10">
          <p className="font-serif text-base sm:text-xl text-[#FAF6EC] leading-loose font-medium">
            Today, we celebrate a man.<br />
            Today, we honour a journey.<br />
            <strong className="text-gold-gradient font-bold text-lg sm:text-2xl">
              Today, we give all glory to God.
            </strong>
          </p>
        </div>

        {/* Title & Honoree */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A24B] uppercase tracking-wide mb-1">
          {EVENT_DETAILS.title}
        </h2>

        <p className="font-serif text-xl sm:text-2xl text-white font-medium mb-3">
          {EVENT_DETAILS.honoree}
        </p>

        <p className="text-xs sm:text-sm text-[#C9A24B] uppercase tracking-[0.25em] font-semibold mb-10">
          TO GOD BE THE GLORY.
        </p>

        {/* Quick Nav Anchor */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#FAF6EC]/80 hover:text-white text-xs tracking-wider uppercase transition-all mb-12 hover:bg-[#FAF6EC]/5"
          aria-label="Back to top"
        >
          <ArrowUp size={14} className="text-[#C9A24B]" />
          <span>Back to Top</span>
        </button>

        {/* Creator Attribution */}
        <div className="w-full pt-8 border-t border-[#C9A24B]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF6EC]/60 gap-3">
          <p>© 2026 The Anwukah Family Thanksgiving Celebration. All rights reserved.</p>
          <p className="text-[#C9A24B] font-medium tracking-wide">
            Website experience created by <strong className="text-white">SUNEXUS</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
};
