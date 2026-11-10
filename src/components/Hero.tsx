import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Play, Pause } from 'lucide-react';
import { EVENT_DETAILS } from '../data/content';
import { officialAudio, AudioState } from '../lib/audioPlayer';
import { calculateCountdown, getTargetEpochMs, CountdownState } from '../utils/countdown';

export const Hero: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioState>(() => officialAudio.getState());
  const [timeLeft, setTimeLeft] = useState<CountdownState>(() => calculateCountdown(getTargetEpochMs()));

  useEffect(() => {
    const unsubscribe = officialAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleToggleMusic = async () => {
    try {
      await officialAudio.toggle();
    } catch (err) {
      console.error('Hero audio toggle error', err);
    }
  };

  useEffect(() => {
    // Calculates exact event target in "America/Chicago" timezone (Garland, TX - 7:00 PM CST)
    const targetEpoch = getTargetEpochMs();

    const updateCountdown = () => {
      const state = calculateCountdown(targetEpoch);
      setTimeLeft(state);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Celebration Welcome and Introduction"
      className="relative min-h-[100svh] lg:min-h-0 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 sm:pt-20 lg:pt-24 lg:pb-12 xl:pt-28 xl:pb-14 overflow-hidden bg-[#4A0E1F]"
    >
      {/* Atmospheric Background & Subtle Radial Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#350A16] via-[#4A0E1F] to-[#2B0711] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C9A24B]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto w-full">
        {/* Grid: 2 columns on lg (desktop), stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Story, Title, Honoree, Countdown & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            {/* Primary Headline */}
            <h1 className="font-serif text-[#FAF6EC] font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.15rem] tracking-wide uppercase leading-[1.14] mb-3.5 sm:mb-4 lg:mb-5 drop-shadow-md">
              THE TRIUMPH OF
              <br />
              <span className="text-gold-gradient font-serif">EZIOKWUBUNDU I</span>
            </h1>

            {/* Core Subtitle */}
            <p className="font-sans text-[#FAF6EC]/90 text-xs sm:text-sm md:text-base font-light tracking-wide mb-5 sm:mb-6 leading-relaxed max-w-xl lg:max-w-2xl">
              {EVENT_DETAILS.subtitle}
            </p>

            {/* Honoree Box */}
            <div className="w-full max-w-lg lg:max-w-none py-3.5 sm:py-4.5 px-5 sm:px-6 rounded-xl border border-[#C9A24B]/35 bg-[#3B0A18]/85 backdrop-blur-md shadow-xl mb-5 sm:mb-6 text-center">
              <p className="text-[10px] sm:text-[11px] text-[#FAF6EC]/70 uppercase tracking-[0.22em] font-medium text-center mb-1">
                In honour of
              </p>
              <h2 className="font-serif text-[#FAF6EC] text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-gold-gradient leading-tight text-center my-0.5">
                {EVENT_DETAILS.honoree}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#C9A24B] font-serif tracking-[0.2em] uppercase font-semibold text-center mt-1">
                {EVENT_DETAILS.titleHonorific}
              </p>
            </div>

            {/* Date Plaque & Countdown Row */}
            <div className="w-full max-w-lg lg:max-w-none mb-6 sm:mb-7">
              <div className="flex flex-col items-center lg:items-start gap-1.5 sm:gap-2 mb-3">
                <span className="text-[10px] sm:text-xs text-[#C9A24B] uppercase tracking-[0.2em] font-semibold">
                  Countdown to the Celebration
                </span>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#C9A24B]/50 bg-[#3B0A18]/70 text-[#FAF6EC] text-[10px] sm:text-xs tracking-wider font-medium shadow-sm">
                  <Calendar size={12} className="text-[#C9A24B]" />
                  <span>{EVENT_DETAILS.dateFormattedCaps}</span>
                </div>
              </div>

              {timeLeft.isEventStarted ? (
                <div className="bg-[#3B0A18]/95 border border-[#C9A24B]/50 rounded-xl py-3.5 px-5 text-center backdrop-blur-sm shadow-lg">
                  <span className="text-[#C9A24B] font-serif font-bold text-base sm:text-lg tracking-wider block">
                    The Celebration Has Begun!
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#FAF6EC]/85 block mt-0.5">
                    Welcome to {EVENT_DETAILS.eventName} · Garland, TX
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds },
                  ].map((unit, idx) => (
                    <div
                      key={idx}
                      className="bg-[#3B0A18]/90 border border-[#C9A24B]/35 rounded-lg py-2.5 sm:py-3 px-1.5 sm:px-2 text-center backdrop-blur-sm shadow-inner"
                    >
                      <span className="block font-serif text-lg sm:text-2xl lg:text-2xl xl:text-3xl font-bold text-[#FAF6EC] leading-tight">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C9A24B] font-semibold mt-1">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full">
              <a
                href="/presentation"
                className="px-6 py-3 rounded-full border border-[#C9A24B]/70 text-[#FAF6EC] font-semibold text-xs sm:text-sm tracking-wide hover:bg-[#C9A24B]/15 transition-all shadow-lg whitespace-nowrap"
              >
                View Presentation
              </a>

              <a
                href="#man"
                className="px-6 py-3 rounded-full bg-[#C9A24B] text-[#4A0E1F] font-semibold text-xs sm:text-sm tracking-wide hover:bg-[#E0BE6C] transition-all shadow-lg hover:shadow-[#C9A24B]/20 whitespace-nowrap"
              >
                Explore the Testimony
              </a>

              <button
                type="button"
                onClick={handleToggleMusic}
                className={`px-5 py-3 rounded-full border border-[#C9A24B] text-[#FAF6EC] font-medium text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-md whitespace-nowrap active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 cursor-pointer ${
                  audioState.isPlaying
                    ? 'bg-[#C9A24B]/25 hover:bg-[#C9A24B]/35 shadow-[#C9A24B]/25'
                    : 'hover:bg-[#C9A24B]/20 bg-transparent'
                }`}
                aria-label={audioState.isPlaying ? 'Pause Music' : 'Play Music'}
                title={audioState.isPlaying ? 'Pause Music' : 'Play Music'}
              >
                {audioState.isPlaying ? (
                  <Pause size={14} className="fill-[#C9A24B] text-[#C9A24B]" />
                ) : (
                  <Play size={14} className="fill-[#C9A24B] text-[#C9A24B] ml-0.5" />
                )}
                <span>{audioState.isPlaying ? 'Pause Music' : 'Play Music'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Prominent Hero Subject Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center order-first lg:order-last w-full">
            <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Outer Decorative Gold Frame */}
              <div className="absolute -inset-2 sm:-inset-2.5 lg:-inset-3 rounded-2xl border-2 border-[#C9A24B]/40 transform rotate-1 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
              
              <div data-image-card="true" className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-[#C9A24B] bg-[#3B0A18] cursor-pointer">
                <div className="aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[4/5] max-h-[380px] sm:max-h-[420px] lg:max-h-[520px] xl:max-h-[560px] overflow-hidden">
                  <img
                    src="/images/hero.webp"
                    alt="Jude Ifeanyi Anwukah (Eziokwubundu I) in regal ceremonial attire and hat"
                    className="w-full h-full object-cover object-center lg:object-[center_20%] filter brightness-105 contrast-102 group-hover:scale-102 transition-transform duration-700 cursor-pointer"
                    loading="eager"
                  />
                </div>
                {/* Gentle bottom gradient for caption legibility without darkening face */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 pointer-events-none" />
                
                <div className="absolute bottom-3.5 left-4 right-4 text-center pointer-events-none">
                  <p className="font-serif text-[#FAF6EC] text-base sm:text-lg font-bold tracking-wide">
                    Jude Ifeanyi Anwukah
                  </p>
                  <p className="text-xs text-[#C9A24B] font-serif tracking-wider">
                    Eziokwubundu I
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="relative z-10 mt-6 sm:mt-8 lg:mt-10 text-center">
        <a
          href="#man"
          className="inline-flex flex-col items-center gap-1.5 text-[#C9A24B] hover:text-[#E0BE6C] transition-colors focus:outline-none"
          aria-label="Scroll down to explore story"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll to explore</span>
          <ChevronDown size={16} className="animate-bounce text-[#C9A24B]" />
        </a>
      </div>
    </section>
  );
};
