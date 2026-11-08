import React from 'react';
import { Sparkles } from 'lucide-react';
import { THANKSGIVING_PILLARS } from '../data/content';

export const Thanksgiving: React.FC = () => {
  return (
    <section id="thanks" aria-label="The Thanksgiving" className="py-24 px-4 sm:px-6 bg-[#FAF6EC] text-[#2B2B2B]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header with celebration-01.webp visual element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 text-[#C9A24B] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              <Sparkles size={14} />
              <span>The Thanksgiving · All Glory Belongs to God</span>
            </div>

            <h2 className="font-serif text-[#4A0E1F] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
              A heart full of gratitude.
            </h2>

            <p className="text-base sm:text-lg text-[#2B2B2B]/85 font-light leading-relaxed text-justify mb-4">
              There are profound moments when ordinary words simply pale in comparison to what the human spirit feels.
              For Jude, his loving family, and everyone whose path has crossed with his, this celebration is such a sacred moment.
              Surrounded by kinship and the bountiful goodness of the Lord, every breath is lifted in heartfelt praise.
            </p>

            <p className="font-serif font-semibold text-[#4A0E1F] text-lg sm:text-xl">
              We give thanks for:
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative group w-full max-w-sm lg:max-w-full">
              <div className="absolute -inset-2 rounded-2xl border-2 border-[#C9A24B]/40 transform rotate-1 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
              <div data-image-card="true" className="relative rounded-xl overflow-hidden shadow-xl border-2 border-[#C9A24B] bg-[#3B0A18] cursor-pointer">
                <img
                  src="/images/celebration-01.webp"
                  alt="Jude Ifeanyi Anwukah and his wife with hands raised in joyous worship and thanksgiving at the altar"
                  className="w-full h-auto aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-700 cursor-pointer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-center">
                  <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider font-bold block">
                    Altar of Thanksgiving
                  </span>
                  <p className="font-serif text-[#FAF6EC] text-xs sm:text-sm font-semibold">
                    Hands Raised in Praise to God
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thanksgiving Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
          {THANKSGIVING_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl p-5 border border-[#C9A24B]/30 shadow-sm hover:shadow-md transition-all ${
                idx === THANKSGIVING_PILLARS.length - 1 ? 'sm:col-span-2 sm:max-w-xl sm:mx-auto w-full' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className="font-serif text-[#C9A24B] font-bold text-lg leading-none mt-0.5">
                  {pillar.number}.
                </span>
                <div>
                  <h3 className="font-serif font-bold text-[#4A0E1F] text-base mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B2B2B]/75 leading-relaxed text-justify">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Inscription (Left Aligned & Justified) */}
        <div className="text-left pt-6 border-t border-[#C9A24B]/30">
          <p className="text-sm sm:text-base text-[#2B2B2B]/80 mb-2 text-justify">
            Today, we celebrate with joyful and humble hearts, acknowledging that every good and perfect gift comes from above.
          </p>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#4A0E1F] tracking-wide mt-2">
            &ldquo;To God be the glory, now and always.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
