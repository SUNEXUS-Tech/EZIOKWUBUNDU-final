import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Share2, Sparkles, Check, Images } from 'lucide-react';
import { EVENT_DETAILS } from '../data/content';

export const Celebration: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'The Triumph of Eziokwubundu I',
      text: 'Join us in celebrating a life of integrity, faith, and miraculous restoration for Jude Ifeanyi Anwukah on Saturday, November 14, 2026.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section id="celebration" aria-label="The Celebration" className="py-24 px-4 sm:px-6 bg-[#4A0E1F] text-[#FAF6EC] relative overflow-hidden">
      {/* Decorative Warm Golden Ring */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-[#C9A24B]/20 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-[#C9A24B] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              <Sparkles size={14} />
              <span>The Celebration</span>
            </div>

            <h2 className="font-serif text-[#FAF6EC] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              Celebrating life. <br />
              <span className="text-gold-gradient">Giving thanks. Sharing joy.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAF6EC]/90 font-light leading-relaxed mb-6">
              A special thanksgiving celebration and fellowship in honour of{' '}
              <strong className="text-[#C9A24B] font-semibold">{EVENT_DETAILS.honoree}</strong>,{' '}
              <span className="font-serif italic">{EVENT_DETAILS.titleHonorific}</span>.
            </p>

            {/* Event Details Card */}
            <div className="p-6 rounded-2xl bg-[#3B0A18]/80 border border-[#C9A24B]/40 shadow-xl mb-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#4A0E1F] border border-[#C9A24B] flex items-center justify-center text-[#C9A24B] shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider block font-medium">Date</span>
                  <span className="font-serif font-bold text-sm sm:text-base text-[#FAF6EC]">
                    {EVENT_DETAILS.dateFormatted}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#4A0E1F] border border-[#C9A24B] flex items-center justify-center text-[#C9A24B] shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider block font-medium">Time</span>
                  <span className="text-xs sm:text-sm text-[#FAF6EC]/90 font-medium">
                    {EVENT_DETAILS.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#4A0E1F] border border-[#C9A24B] flex items-center justify-center text-[#C9A24B] shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider block font-medium">Location</span>
                  <span className="text-xs sm:text-sm text-[#FAF6EC]/90 font-medium">
                    {EVENT_DETAILS.venue}
                  </span>
                  <span className="text-[11px] text-[#FAF6EC]/60 block">{EVENT_DETAILS.address}</span>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#FAF6EC]/80 font-light leading-relaxed mb-6">
              An evening dedicated to boundless gratitude, quiet reflection, sacred fellowship, and the supreme glory of God.
            </p>

            {/* Inscription Quote */}
            <div className="border-t border-[#C9A24B]/40 pt-4 mb-8">
              <p className="font-serif text-lg sm:text-xl font-bold text-[#C9A24B]">
                The Triumph of Eziokwubundu I
              </p>
              <p className="text-xs sm:text-sm text-[#FAF6EC]/80 mt-1">
                A journey remembered. A life celebrated. A testimony preserved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleShare}
                className="px-6 py-2.5 rounded-full bg-[#C9A24B] text-[#4A0E1F] font-semibold text-xs sm:text-sm tracking-wide hover:bg-[#E0BE6C] transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {copiedLink ? <Check size={15} className="text-emerald-900" /> : <Share2 size={15} />}
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Celebration'}</span>
              </button>

              <a
                href="#gallery"
                className="px-5 py-2.5 rounded-full border border-[#C9A24B]/60 hover:border-[#C9A24B] text-[#FAF6EC] hover:bg-[#C9A24B]/10 text-xs sm:text-sm font-medium tracking-wide transition-all flex items-center gap-2"
              >
                <Images size={15} className="text-[#C9A24B]" />
                <span>Explore Photo Gallery</span>
              </a>
            </div>
          </div>

          {/* Photo Column: Authentic Celebration Moments */}
          <div className="lg:col-span-5 flex flex-col items-center gap-5">
            <div data-image-card="true" className="relative group w-full max-w-md cursor-pointer">
              <div className="absolute -inset-2 rounded-2xl border border-[#C9A24B]/40 pointer-events-none" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#C9A24B] bg-[#3B0A18]">
                <img
                  src="/images/celebration-02.webp"
                  alt="Jude Ifeanyi Anwukah and his wife in ceremonial attire on the red carpet at the celebration"
                  className="w-full h-auto object-cover max-h-[480px] group-hover:scale-102 transition-transform duration-700 cursor-pointer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-center pointer-events-none">
                  <p className="text-[#C9A24B] text-[10px] uppercase tracking-[0.25em] font-semibold mb-0.5">
                    Red Carpet &amp; Fellowship
                  </p>
                  <p className="font-serif text-white font-bold text-base sm:text-lg">
                    A Triumphant Celebration
                  </p>
                </div>
              </div>
            </div>

            {/* Praise & Joy Highlight */}
            <div data-image-card="true" className="w-full max-w-md p-3.5 rounded-xl bg-[#3B0A18]/90 border border-[#C9A24B]/35 shadow-md flex items-center gap-3.5 cursor-pointer">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#C9A24B] shrink-0 bg-[#27050E]">
                <img
                  src="/images/celebration-01.webp"
                  alt="Jude Ifeanyi Anwukah and his wife with hands raised in praise and thanksgiving"
                  className="w-full h-full object-cover cursor-pointer"
                  loading="lazy"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider font-bold block">
                  Altar of Praise
                </span>
                <p className="font-serif font-semibold text-[#FAF6EC] text-xs sm:text-sm">
                  Hands Raised in Gratitude
                </p>
                <p className="text-[11px] text-[#FAF6EC]/70 leading-tight mt-0.5">
                  Celebrating God&rsquo;s faithfulness with pure joy and thanksgiving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
