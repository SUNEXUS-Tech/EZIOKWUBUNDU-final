import React from 'react';
import { Heart, Users2, Sparkles, Smile } from 'lucide-react';

export const Togetherness: React.FC = () => {
  return (
    <section id="together" aria-label="Life, Family and Togetherness" className="py-24 px-4 sm:px-6 bg-[#EFE4C8] text-[#2B2B2B]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-[#A37E31] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Users2 size={15} />
              <span>Life, Family & Togetherness</span>
            </div>

            <h2 className="font-serif text-[#4A0E1F] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              The beauty of being here.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#2B2B2B]/85 font-light leading-relaxed">
              <p>
                Beyond the arduous hospital corridors and anxious waiting rooms are the indelible memories that make life
                sweet and truly beautiful.
              </p>

              <p>
                The laughter around the family dining table, warm handshakes with lifelong friends, weddings and milestone
                celebrations, shared stories, and everyday peaceful mornings, these form the true tapestry of a life worth celebrating.
              </p>

              <p>
                Every gathering is now sweeter. Every phone call carries deeper meaning. The moments preserved in photographs
                are not merely souvenirs of the past; they are living reminders that tomorrow is never guaranteed, and that every
                single dawn is a gift of divine grace.
              </p>

              <p className="font-medium text-[#4A0E1F]">
                Today, we celebrate not only survival, but the profound privilege of continuing to share life, laughter, and wisdom
                with the people we love most.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs font-serif text-[#4A0E1F] uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Heart size={14} className="text-[#C9A24B]" /> Deep Kinship</span>
              <span className="text-[#C9A24B]">·</span>
              <span className="flex items-center gap-1.5"><Smile size={14} className="text-[#C9A24B]" /> Unbroken Fellowship</span>
              <span className="text-[#C9A24B]">·</span>
              <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-[#C9A24B]" /> Sacred Memory</span>
            </div>

            {/* Igbo Kinship Motto Badge */}
            <div className="mt-6 p-4 rounded-xl bg-white/80 border border-[#C9A24B]/35 shadow-xs flex items-center gap-3.5 max-w-lg">
              <div className="w-10 h-10 rounded-full border border-[#C9A24B] bg-[#4A0E1F] flex items-center justify-center text-[#C9A24B] shrink-0">
                <Heart size={18} />
              </div>
              <div>
                <p className="font-serif text-sm sm:text-base font-bold text-[#4A0E1F]">
                  &ldquo;Nwanne bu ike&rdquo; <span className="text-xs text-[#A37E31] font-normal font-sans tracking-normal ml-1">— Kinship is Strength</span>
                </p>
                <p className="text-[11px] text-[#2B2B2B]/75 leading-tight mt-0.5">
                  Together as family and community, we celebrate a life miraculously saved and lovingly preserved.
                </p>
              </div>
            </div>
          </div>

          {/* Photos Mosaic Column (4 tiles: family-06, family-09, legacy-03, family-04) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {/* Tile 1: family-06 */}
              <div data-image-card="true" className="group relative rounded-xl overflow-hidden border border-[#C9A24B]/40 shadow-lg bg-[#4A0E1F] aspect-square cursor-pointer">
                <img
                  src="/images/family-06.webp"
                  alt="Jude Ifeanyi Anwukah, his wife, and daughter together at a family wedding celebration"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                  <span className="text-white text-xs font-serif font-semibold">Generations of Kinship</span>
                </div>
              </div>

              {/* Tile 2: family-09 */}
              <div data-image-card="true" className="group relative rounded-xl overflow-hidden border border-[#C9A24B]/40 shadow-lg bg-[#4A0E1F] aspect-square cursor-pointer">
                <img
                  src="/images/family-09.webp"
                  alt="Jude Ifeanyi Anwukah and his wife in regal sky-blue attire"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                  <span className="text-white text-xs font-serif font-semibold">Radiant Unity &amp; Joy</span>
                </div>
              </div>

              {/* Tile 3: legacy-03 with corrected object-position */}
              <div data-image-card="true" className="group relative rounded-xl overflow-hidden border border-[#C9A24B]/40 shadow-lg bg-[#4A0E1F] aspect-square cursor-pointer">
                <img
                  src="/images/legacy-03.webp"
                  alt="Jude Ifeanyi Anwukah and his wife embracing warmly in matching African attire"
                  style={{ objectPosition: 'center 22%' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                  <span className="text-white text-xs font-serif font-semibold">Love &amp; Companionship</span>
                </div>
              </div>

              {/* Tile 4: family-04 */}
              <div data-image-card="true" className="group relative rounded-xl overflow-hidden border border-[#C9A24B]/40 shadow-lg bg-[#4A0E1F] aspect-square cursor-pointer">
                <img
                  src="/images/family-04.webp"
                  alt="Jude Ifeanyi Anwukah and his wife in ceremonial red lace and burgundy attire on the green carpet"
                  style={{ objectPosition: 'center 18%' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                  <span className="text-white text-xs font-serif font-semibold">Enduring Kinship &amp; Elegance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
