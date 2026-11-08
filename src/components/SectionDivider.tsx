import React from 'react';

interface SectionDividerProps {
  variant?: 'burgundy' | 'on-dark';
  bg?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'burgundy',
  bg = 'bg-transparent',
  className = '',
}) => {
  const isDark = variant === 'on-dark';

  return (
    <div
      className={`w-full flex items-center justify-center py-2 sm:py-3 overflow-hidden select-none ${bg} ${className}`}
      aria-hidden="true"
    >
      <div className="max-w-4xl mx-auto w-full px-6 sm:px-12 flex items-center justify-center">
        {/* Left Tapered Line */}
        <div
          className={`flex-1 h-[1px] bg-gradient-to-r from-transparent ${
            isDark
              ? 'via-[#C9A24B]/35 to-[#C9A24B]/80'
              : 'via-[#4A0E1F]/25 to-[#4A0E1F]/80'
          }`}
        />

        {/* Central Heraldic Diamond Motif */}
        <div className="mx-3 sm:mx-4 flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Outer Side Bead */}
          <span
            className={`w-1 h-1 rounded-full ${
              isDark ? 'bg-[#C9A24B]/50' : 'bg-[#4A0E1F]/50'
            }`}
          />

          {/* Central Diamond with Inner Accent Pip */}
          <div
            className={`relative flex items-center justify-center w-3 sm:w-3.5 h-3 sm:h-3.5 rotate-45 border shadow-xs transition-transform duration-300 ${
              isDark
                ? 'border-[#C9A24B] bg-[#3B0A18]'
                : 'border-[#4A0E1F] bg-[#FAF6EC]'
            }`}
          >
            <span
              className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rotate-45 ${
                isDark ? 'bg-[#E0BE6C]' : 'bg-[#C9A24B]'
              }`}
            />
          </div>

          {/* Outer Side Bead */}
          <span
            className={`w-1 h-1 rounded-full ${
              isDark ? 'bg-[#C9A24B]/50' : 'bg-[#4A0E1F]/50'
            }`}
          />
        </div>

        {/* Right Tapered Line */}
        <div
          className={`flex-1 h-[1px] bg-gradient-to-l from-transparent ${
            isDark
              ? 'via-[#C9A24B]/35 to-[#C9A24B]/80'
              : 'via-[#4A0E1F]/25 to-[#4A0E1F]/80'
          }`}
        />
      </div>
    </div>
  );
};
