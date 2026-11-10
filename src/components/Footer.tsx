import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  isGalleryRoute?: boolean;
}

// Official WhatsApp Vector Icon
const WhatsAppIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-4 h-4', size = 18 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Website Footer"
      className="bg-[#350D19] text-[#F5EEDF] pt-14 pb-12 px-4 sm:px-6 md:px-8 border-t border-[#B18A43]/30 relative"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* 1. Main Commemorative Identity & Signature */}
        <div className="mb-6 max-w-2xl px-2">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#B18A43] uppercase tracking-wide leading-snug">
            THE TRIUMPH OF EZIOKWUBUNDU I
          </h2>
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#F5EEDF] font-medium mt-1 mb-2">
            Jude Ifeanyi Anwukah
          </p>
          <p className="text-xs sm:text-sm text-[#E7D5A9] uppercase tracking-[0.25em] font-semibold">
            TO GOD BE THE GLORY
          </p>
        </div>

        {/* Subtle Gold Divider */}
        <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#B18A43]/50 to-transparent mb-7" />

        {/* 2. Creative Credits */}
        <div className="flex flex-col items-center gap-2 mb-5 text-xs text-[#F5EEDF]/80">
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <span>Website designed by <strong className="text-[#F5EEDF] font-medium">Uthman Adesola</strong></span>
            <span className="text-[#B18A43]" aria-hidden="true">·</span>
            <span>Music created by <strong className="text-[#F5EEDF] font-medium">Muhammad Adesola</strong></span>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[#F5EEDF]/70 text-xs">Website experience created by</span>
            <span className="font-serif font-bold tracking-widest text-[#B18A43] text-xs sm:text-sm">
              SUNEXUS
            </span>
          </div>
        </div>

        {/* 3. WhatsApp Contact Link (positioned under 'Website experience created by SUNEXUS') */}
        <div className="mb-8">
          <a
            href="https://wa.me/2349036066187"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via WhatsApp: +234 903 606 6187"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#571D2B]/85 hover:bg-[#571D2B] text-[#E7D5A9] hover:text-[#F5EEDF] border border-[#B18A43]/40 hover:border-[#B18A43] text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#B18A43]" />
            <span>Contact via WhatsApp</span>
            <span className="text-[11px] text-[#F5EEDF]/60 font-mono hidden sm:inline">
              (+234 903 606 6187)
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#B18A43]/20 mb-6" />

        {/* 4. Copyright & Back to Top */}
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between text-[11px] text-[#F5EEDF]/60 gap-4">
          <p>© 2026 Eziokwubundu I Thanksgiving Celebration. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B18A43]/40 hover:border-[#B18A43] text-[#E7D5A9] hover:text-[#F5EEDF] hover:bg-[#571D2B]/50 transition-all cursor-pointer min-h-[38px] text-xs active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp size={13} className="text-[#B18A43]" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
