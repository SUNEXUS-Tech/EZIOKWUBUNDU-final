import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Menu, X, Sparkles, Music, Loader2 } from 'lucide-react';
import { officialAudio, AudioState } from '../lib/audioPlayer';

export const Navbar: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioState>(() => officialAudio.getState());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Attempt playback on page load while adhering to browser autoplay restrictions
    officialAudio.attemptAutoplay();

    // Subscribe to playback state changes
    const unsubscribe = officialAudio.subscribe((state) => {
      setAudioState(state);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        'hero',
        'man',
        'journey',
        'grace',
        'legacy',
        'together',
        'thanks',
        'celebration',
        'gallery',
      ];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  const handleToggleMusic = async () => {
    try {
      await officialAudio.toggle();
    } catch (err) {
      console.error('Audio toggle error', err);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    officialAudio.setVolume(val);
  };

  const handleToggleMute = () => {
    officialAudio.toggleMute();
  };

  const navLinks = [
    { name: 'The Man', href: '#man', id: 'man', label: 'His Identity & Heritage' },
    { name: 'The Journey', href: '#journey', id: 'journey', label: 'The Difficult Chapter (ICU)' },
    { name: 'The Grace', href: '#grace', id: 'grace', label: 'Miraculous Healing' },
    { name: 'The Legacy', href: '#legacy', id: 'legacy', label: 'Generosity & Mentorship' },
    { name: 'Togetherness', href: '#together', id: 'together', label: 'Family, Love & Community' },
    { name: 'Thanksgiving', href: '#thanks', id: 'thanks', label: 'All Glory Belongs to God' },
    { name: 'The Celebration', href: '#celebration', id: 'celebration', label: 'Event Details & Schedule' },
    { name: 'Photo Gallery', href: '#gallery', id: 'gallery', label: 'Memories & Moments' },
  ];

  const handleNavClick = (href: string) => {
    setIsDrawerOpen(false);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#240611]/98 backdrop-blur-md shadow-lg shadow-black/50 py-2 sm:py-2.5 border-b border-[#C9A24B]/35'
            : 'bg-[#300B18]/95 backdrop-blur-md shadow-md shadow-black/40 py-2.5 sm:py-3 border-b border-[#C9A24B]/25'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* 1. Brand Identity Text */}
          <a
            href="#hero"
            className="flex flex-col text-left group transition-opacity hover:opacity-95 focus:outline-none min-w-0 select-none"
            aria-label="The Triumph of Eziokwubundu I Homepage"
          >
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-gold-gradient truncate leading-tight group-hover:brightness-110 transition-all">
              Eziokwubundu I
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#FAF6EC]/75 tracking-[0.2em] uppercase font-medium truncate leading-none mt-0.5">
              Jude Ifeanyi Anwukah
            </span>
          </a>

          {/* Right Controls: 2. Music Player & 3. Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Animated Equalizer Visualizer (Visible on desktop when playing) */}
            {audioState.isPlaying && (
              <div
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3B0A18] border border-[#C9A24B]/40 text-[#C9A24B] text-[10px] tracking-wider font-medium select-none"
                title="Playing: Official Thanksgiving Song"
              >
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#C9A24B] animate-[pulse_0.8s_ease-in-out_infinite] h-2.5 rounded-full" />
                  <span className="w-0.5 bg-[#C9A24B] animate-[pulse_1.1s_ease-in-out_infinite] h-3 rounded-full" />
                  <span className="w-0.5 bg-[#C9A24B] animate-[pulse_0.7s_ease-in-out_infinite] h-1.5 rounded-full" />
                </div>
                <span className="text-[10px] text-[#FAF6EC]/85 font-serif italic truncate max-w-[120px]">
                  Official Song
                </span>
              </div>
            )}

            {/* 2. Circular Music Play/Pause Control */}
            <div className="relative">
              <button
                onClick={handleToggleMusic}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 ${
                  audioState.isPlaying
                    ? 'border border-[#C9A24B] bg-[#C9A24B]/25 text-[#FAF6EC] shadow-sm shadow-[#C9A24B]/30 ring-2 ring-[#C9A24B]/40'
                    : audioState.autoplayBlocked
                    ? 'border border-[#C9A24B] bg-[#300B18] text-[#C9A24B] hover:bg-[#C9A24B]/20 ring-2 ring-[#C9A24B]/60 animate-pulse'
                    : 'border border-[#C9A24B]/50 hover:border-[#C9A24B] bg-[#300B18] text-[#C9A24B] hover:text-[#FAF6EC] hover:bg-[#C9A24B]/15'
                }`}
                title={
                  audioState.isPlaying
                    ? 'Pause Official Thanksgiving Song'
                    : 'Play Official Thanksgiving Song: The Triumph of Eziokwubundu I'
                }
                aria-label={
                  audioState.isPlaying
                    ? 'Pause Official Thanksgiving Song'
                    : 'Play Official Thanksgiving Song'
                }
              >
                {audioState.isLoading ? (
                  <Loader2 size={15} className="animate-spin text-[#C9A24B]" />
                ) : audioState.isPlaying ? (
                  <Pause size={15} className="fill-[#C9A24B] text-[#C9A24B]" />
                ) : (
                  <Play size={15} className="fill-[#C9A24B] text-[#C9A24B] ml-0.5" />
                )}
              </button>

              {/* Volume Slider Popover on hover (desktop) */}
              {showVolumeSlider && (
                <div
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                  className="absolute right-0 top-full mt-2 p-3 bg-[#240611] border border-[#C9A24B]/40 rounded-xl shadow-2xl flex flex-col gap-2 z-50 min-w-[170px] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#C9A24B] tracking-wider uppercase font-semibold">
                    <span>Thanksgiving Song</span>
                    <span className="font-mono text-[#FAF6EC]/80">
                      {audioState.isMuted ? 'Muted' : `${Math.round(audioState.volume * 100)}%`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleMute}
                      className="text-[#C9A24B] hover:text-[#FAF6EC] transition-colors p-0.5"
                      aria-label={audioState.volume === 0 || audioState.isMuted ? 'Unmute' : 'Mute'}
                      title={audioState.volume === 0 || audioState.isMuted ? 'Unmute' : 'Mute'}
                    >
                      {audioState.volume === 0 || audioState.isMuted ? (
                        <VolumeX size={15} />
                      ) : (
                        <Volume2 size={15} />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={audioState.volume}
                      onChange={handleVolumeChange}
                      className="w-24 accent-[#C9A24B] h-1.5 cursor-pointer bg-[#300B18] rounded"
                      aria-label="Official Thanksgiving Song volume"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Hamburger Menu Icon Button */}
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C9A24B]/50 hover:border-[#C9A24B] bg-[#300B18] hover:bg-[#C9A24B]/15 text-[#C9A24B] hover:text-[#FAF6EC] flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50"
              aria-label={isDrawerOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              title={isDrawerOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isDrawerOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Navigation Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex justify-end"
          onClick={() => setIsDrawerOpen(false)}
        >
          {/* Slide-over Drawer Panel */}
          <div
            className="w-full max-w-sm sm:max-w-md bg-[#240611] border-l border-[#C9A24B]/30 h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#C9A24B]/20">
                <div className="flex flex-col text-left">
                  <span className="font-serif text-[#C9A24B] font-bold text-lg sm:text-xl tracking-wide">
                    Eziokwubundu I
                  </span>
                  <span className="text-[10px] text-[#FAF6EC]/70 tracking-[0.2em] uppercase font-medium">
                    Jude Ifeanyi Anwukah
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#C9A24B] hover:text-[#FAF6EC] flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close Menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Ceremony Motto */}
              <div className="my-4 px-3 py-1.5 rounded-lg bg-[#300B18] border border-[#C9A24B]/25 flex items-center gap-2 text-xs text-[#C9A24B]">
                <Sparkles size={13} className="text-[#E0BE6C] flex-shrink-0" />
                <span className="italic font-serif text-[#FAF6EC]/90 text-[11px] sm:text-xs">
                  &ldquo;A Solemn & Joyous Family Thanksgiving&rdquo;
                </span>
              </div>

              {/* Official Thanksgiving Song Card inside Drawer */}
              <div className="my-3 p-3.5 rounded-xl bg-[#300B18]/90 border border-[#C9A24B]/35 flex flex-col gap-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B]/40 flex items-center justify-center flex-shrink-0 text-[#C9A24B]">
                      <Music size={15} />
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-[10px] text-[#C9A24B] font-semibold tracking-wider uppercase truncate">
                        Official Soundtrack
                      </span>
                      <span className="font-serif text-xs text-[#FAF6EC] font-medium truncate">
                        The Triumph of Eziokwubundu I
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleMusic}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none ${
                      audioState.isPlaying
                        ? 'bg-[#C9A24B] text-[#4A0E1F] shadow-md shadow-[#C9A24B]/30'
                        : 'border border-[#C9A24B] bg-[#240611] text-[#C9A24B] hover:bg-[#C9A24B]/20'
                    }`}
                    aria-label={
                      audioState.isPlaying
                        ? 'Pause Official Thanksgiving Song'
                        : 'Play Official Thanksgiving Song'
                    }
                  >
                    {audioState.isLoading ? (
                      <Loader2 size={15} className="animate-spin text-current" />
                    ) : audioState.isPlaying ? (
                      <Pause size={15} className="fill-current text-current" />
                    ) : (
                      <Play size={15} className="fill-current text-current ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Volume Bar inside Drawer */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#C9A24B]/20">
                  <button
                    onClick={handleToggleMute}
                    className="text-[#C9A24B] hover:text-[#FAF6EC] transition-colors p-1"
                    aria-label={audioState.volume === 0 || audioState.isMuted ? 'Unmute' : 'Mute'}
                  >
                    {audioState.volume === 0 || audioState.isMuted ? (
                      <VolumeX size={14} />
                    ) : (
                      <Volume2 size={14} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={audioState.volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-[#C9A24B] h-1.5 cursor-pointer bg-[#240611] rounded"
                    aria-label="Official Thanksgiving Song volume"
                  />
                  <span className="text-[10px] text-[#FAF6EC]/60 font-mono w-7 text-right">
                    {Math.round(audioState.volume * 100)}%
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5 mt-4" aria-label="Drawer Navigation Links">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#C9A24B]/20 text-[#FAF6EC] border border-[#C9A24B]/40'
                          : 'text-[#FAF6EC]/85 hover:text-[#FAF6EC] hover:bg-[#300B18]/70 border border-transparent'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`font-serif text-sm sm:text-base tracking-wide transition-colors ${
                            isActive
                              ? 'text-[#C9A24B] font-bold'
                              : 'group-hover:text-[#C9A24B]'
                          }`}
                        >
                          {link.name}
                        </span>
                        <span className="text-[10px] text-[#FAF6EC]/60 tracking-wider">
                          {link.label}
                        </span>
                      </div>
                      <span
                        className={`text-xs transition-transform group-hover:translate-x-1 ${
                          isActive ? 'text-[#C9A24B]' : 'text-[#C9A24B]/50'
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Details */}
            <div className="pt-6 mt-6 border-t border-[#C9A24B]/20 flex flex-col gap-2 text-center">
              <p className="font-serif text-[#C9A24B] text-xs font-semibold tracking-wider">
                TO GOD BE THE GLORY
              </p>
              <p className="text-[10px] text-[#FAF6EC]/60 uppercase tracking-widest">
                Saturday, November 14, 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
