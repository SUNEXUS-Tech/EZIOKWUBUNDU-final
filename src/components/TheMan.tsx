import React from 'react';
import { Award, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';

export const TheMan: React.FC = () => {
  return (
    <section
      id="man"
      aria-label="The Man Behind The Name"
      className="relative py-24 px-4 sm:px-6 bg-[#FAF6EC] bg-pattern-man text-[#2B2B2B] overflow-hidden"
    >
      {/* Subtle corner geometric watermark accents */}
      <div className="absolute -top-16 -right-16 w-64 h-64 border border-[#C9A24B]/15 rounded-3xl transform rotate-12 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 border border-[#4A0E1F]/10 rounded-3xl transform -rotate-6 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-md">
              {/* Outer Decorative Gold Frame */}
              <div className="absolute -inset-2.5 rounded-2xl border-2 border-[#C9A24B]/40 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
              <div data-image-card="true" className="relative rounded-xl overflow-hidden shadow-2xl border border-[#C9A24B] bg-[#4A0E1F] cursor-pointer">
                <img
                  src="/images/man.webp"
                  alt="Jude Ifeanyi Anwukah, Eziokwubundu I, standing in regal ceremonial attire with traditional walking cane"
                  className="w-full h-auto object-cover object-top max-h-[620px] transition-transform duration-700 group-hover:scale-102 cursor-pointer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-[#C9A24B] text-[11px] uppercase tracking-[0.2em] font-medium">
                    The Man · In His Dignity
                  </p>
                  <p className="text-white font-serif text-lg font-semibold tracking-wide">
                    Jude Ifeanyi Anwukah
                  </p>
                </div>
              </div>
            </div>

            {/* Igbo Meaning Explainer Box */}
            <div className="mt-8 w-full max-w-md p-4 rounded-xl border border-[#C9A24B]/30 bg-[#EFE4C8]/60 text-xs text-[#2B2B2B]/90 leading-relaxed shadow-sm">
              <div className="flex items-center gap-2 text-[#4A0E1F] font-serif font-bold text-sm mb-1">
                <Compass size={16} className="text-[#C9A24B]" />
                <span>The Meaning of &ldquo;Eziokwubundu&rdquo;</span>
              </div>
              <p>
                In the Igbo language, <em>&ldquo;Eziokwu bu ndu&rdquo;</em> translates to{' '}
                <strong className="text-[#4A0E1F] font-semibold">&ldquo;Truth is Life.&rdquo;</strong>{' '}
                It honors a man of uncompromising moral integrity, someone whose convictions and truthfulness breathe hope and life into others.
              </p>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-[#C9A24B] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <ShieldCheck size={14} />
              <span>Beyond the Title</span>
            </div>

            <h2 className="font-serif text-[#4A0E1F] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              A man of his word. <br className="hidden sm:inline" />
              <span className="text-[#A37E31]">A heart that gives.</span>
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#2B2B2B]/85 font-light leading-relaxed">
              <p>
                Jude Ifeanyi Anwukah is fondly called <strong className="font-semibold text-[#4A0E1F]">Eziokwubundu</strong> by
                friends, kin, and family, a name that reflects the steadfast honesty, integrity, and conviction that define his life.
              </p>

              <p>
                A man who stands unflinchingly by the truth, he is deeply loved and respected across generations for his generosity,
                kindness, and instinctive willingness to make an enduring difference in the lives of those around him.
              </p>

              <p>
                His impact extends far beyond his immediate family. Through his personal benevolence and heartfelt commitment to
                investing in young people, particularly within his extended lineage and wider community, he has helped nurture hope,
                opened doors of educational and professional opportunity, and instilled an enduring sense of belonging.
              </p>

              <p>
                To those who know him, he is far more than a title or a name on a program. He is family, an unshakeable source of
                counsel and encouragement, and a leader whose presence uplifts every room he enters.
              </p>
            </div>

            {/* Core Values / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-lg bg-white border-t-2 border-[#C9A24B] shadow-sm">
                <div className="flex items-center gap-2 text-[#4A0E1F] font-serif font-semibold text-sm mb-1">
                  <Award size={16} className="text-[#C9A24B]" />
                  <span>Unwavering Integrity</span>
                </div>
                <p className="text-xs text-[#2B2B2B]/80 leading-normal">
                  His word is his bond. He champions fair dealings, truthfulness, and standing firm in righteous convictions.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border-t-2 border-[#C9A24B] shadow-sm">
                <div className="flex items-center gap-2 text-[#4A0E1F] font-serif font-semibold text-sm mb-1">
                  <HeartHandshake size={16} className="text-[#C9A24B]" />
                  <span>Generous Stewardship</span>
                </div>
                <p className="text-xs text-[#2B2B2B]/80 leading-normal">
                  Believing that blessings are meant to be shared, he invests continuously in empowering the youth and extended family.
                </p>
              </div>
            </div>

            {/* Section Quote */}
            <div className="border-t border-[#C9A24B]/40 pt-5 mt-2">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#4A0E1F] font-medium leading-relaxed">
                &ldquo;A good name is a legacy. A generous heart is a blessing.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
