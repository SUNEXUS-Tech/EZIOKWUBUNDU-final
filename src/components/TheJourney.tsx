import React, { useState } from 'react';
import { AlertCircle, Flame, HeartPulse, Sparkles } from 'lucide-react';

export const TheJourney: React.FC = () => {
  const [showReflection, setShowReflection] = useState(false);

  return (
    <section id="journey" aria-label="A Difficult Chapter" className="py-24 px-4 sm:px-6 bg-[#3B0A18] text-[#FAF6EC]/90 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A0E1F]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-[#C9A24B] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          <HeartPulse size={14} />
          <span>The Journey</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[#FAF6EC] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
          A moment that changed everything.
        </h2>

        {/* Authentic Hospital ICU Image Card */}
        <div data-image-card="true" className="relative group max-w-2xl mx-auto my-8 rounded-xl overflow-hidden border border-[#C9A24B]/40 shadow-2xl bg-black/40 cursor-pointer">
          <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
            <img
              src="/images/journey.webp"
              alt="Jude Ifeanyi Anwukah intubated in the intensive care unit"
              className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-102 transition-transform duration-700 cursor-pointer"
              loading="lazy"
            />
          </div>
          <div className="p-3 sm:p-4 bg-[#27050E]/90 border-t border-[#C9A24B]/30 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <AlertCircle size={15} className="text-[#C9A24B] shrink-0" />
              <span className="text-xs sm:text-sm font-serif tracking-wide text-[#FAF6EC]/90">
                Hospital Intensive Care Unit · The Valley of the Shadow
              </span>
            </div>
            <span className="text-[10px] text-[#C9A24B] uppercase tracking-widest hidden sm:inline">
              Faith Tested
            </span>
          </div>
        </div>

        {/* Story Narrative */}
        <div className="max-w-2xl mx-auto space-y-6 text-base sm:text-lg text-[#FAF6EC]/85 font-light leading-relaxed text-left sm:text-center mt-10">
          <p>
            There are seasons in life that test the strength of the body, the courage of the heart, and the depth of one&rsquo;s faith.
          </p>

          <p>
            Jude faced a sudden, devastating illness that brought him frighteningly close to the end of life. In the quiet confines
            of the intensive care unit, amidst the hum of monitors and ventilators, every single breath was a hard fought battle.
          </p>

          <p>
            It was a painful and harrowing chapter, one that starkly reminded his family and loved ones how fragile human life can be,
            and how immeasurably precious every single shared moment truly is.
          </p>

          <p>
            Yet, in the thick face of uncertainty, hope never flickered out. Prayers rose ceaselessly like incense across oceans and
            time zones.
          </p>

          <div className="py-6 my-4 border-y border-[#C9A24B]/30">
            <p className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold tracking-wide">
              The Lord had another chapter to write.
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#FAF6EC] mt-2">
              The story did not end where the struggle began.
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#FAF6EC]/70 italic">
            This is a family testimony of a difficult season, the power of prayer, and the divine grace that carried him through it.
          </p>
        </div>

        {/* Interactive Faith Reflection Moment */}
        <div className="mt-12">
          {!showReflection ? (
            <button
              onClick={() => setShowReflection(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C9A24B]/60 text-[#C9A24B] hover:text-[#FAF6EC] hover:border-[#C9A24B] hover:bg-[#C9A24B]/10 text-xs sm:text-sm font-medium tracking-wide transition-all"
            >
              <Flame size={14} />
              <span>Read the Family&rsquo;s Prayer of Intercession</span>
            </button>
          ) : (
            <div className="max-w-xl mx-auto p-6 rounded-xl bg-[#2A0510] border border-[#C9A24B]/40 shadow-xl text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-3 border-b border-[#C9A24B]/20 pb-2">
                <span className="font-serif text-[#C9A24B] font-semibold text-sm flex items-center gap-2">
                  <Sparkles size={14} /> The Hour of Intercession
                </span>
                <button
                  onClick={() => setShowReflection(false)}
                  className="text-xs text-[#FAF6EC]/50 hover:text-[#FAF6EC]"
                >
                  Close
                </button>
              </div>
              <p className="font-quote italic text-sm text-[#FAF6EC]/90 leading-relaxed mb-3">
                &ldquo;Lord, You who formed him in his mother&rsquo;s womb and granted him a heart of integrity, breathe upon Jude now.
                Where medical science meets its threshold, let Your divine sovereignty prevail. Restore his vigor, sustain his loved ones,
                and turn this hospital bed into an altar of praise.&rdquo;
              </p>
              <p className="text-xs text-[#C9A24B] text-right font-medium">
                Psalm 118:17: &ldquo;I shall not die, but live, and declare the works of the Lord.&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
