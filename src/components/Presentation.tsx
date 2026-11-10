import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize, Minimize, Pause, Play, Volume2 } from 'lucide-react';
import { EVENT_DETAILS, GALLERY_ITEMS, THANKSGIVING_PILLARS } from '../data/content';

type Slide = {
  kind: 'title' | 'story' | 'quote' | 'photo' | 'gallery-intro' | 'final';
  eyebrow?: string;
  title: string;
  body?: string[];
  quote?: string;
  image?: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
  cards?: { title: string; body: string }[];
  photo?: (typeof GALLERY_ITEMS)[number];
  extraImages?: string[];
  duration: number;
};

const usedStoryImages = new Set([
  '/images/man.webp',
  '/images/journey.webp',
  '/images/journey-01.webp',
  '/images/grace.webp',
  '/images/journey-02.webp',
  '/images/recovery-01.webp',
  '/images/recovery-02.webp',
  '/images/recovery-03.webp',
  '/images/legacy-01.webp',
  '/images/legacy-02.webp',
  '/images/family-06.webp',
  '/images/legacy-03.webp',
  '/images/family-04.webp',
  '/images/family-09.webp',
  '/images/celebration-01.webp',
]);

const galleryPhotos = GALLERY_ITEMS.filter((photo) => !usedStoryImages.has(photo.imageSrc));

const slides: Slide[] = [
  { kind: 'title', eyebrow: 'A Thanksgiving Tribute', title: EVENT_DETAILS.title, body: [EVENT_DETAILS.honoree, 'A life of integrity. A journey of grace. A testimony of gratitude.'], duration: 8 },
  { kind: 'story', eyebrow: 'Beyond the Title', title: 'A man of his word. A heart that gives.', image: '/images/man.webp', imageAlt: 'Jude Ifeanyi Anwukah in regal ceremonial attire', imageSide: 'left', body: ['Jude Ifeanyi Anwukah is fondly called Eziokwubundu by friends, kin, and family—a name that reflects the steadfast honesty, integrity, and conviction that define his life.', 'A man who stands unflinchingly by the truth, he is deeply loved and respected across generations for his generosity, kindness, and instinctive willingness to make an enduring difference.', 'His impact extends beyond his immediate family. Through personal benevolence and investment in young people, he has nurtured hope, opened doors of opportunity, and instilled belonging.'], cards: [{ title: 'Unwavering Integrity', body: 'His word is his bond. He champions fair dealings, truthfulness, and righteous conviction.' }, { title: 'Generous Stewardship', body: 'He believes blessings are meant to be shared, investing in young people and extended family.' }], duration: 10 },
  { kind: 'quote', eyebrow: 'The Meaning of Eziokwubundu', title: 'Truth is Life.', body: ['In the Igbo language, “Eziokwu bu ndu” translates to “Truth is Life.”', 'To those who know him, he is more than a title or a name. He is family, a source of counsel and encouragement, and a leader whose presence uplifts others.'], quote: 'A good name is a legacy. A generous heart is a blessing.', duration: 10 },
  { kind: 'story', eyebrow: 'A Difficult Chapter', title: 'A moment that changed everything.', image: '/images/journey.webp', imageAlt: 'Jude in the hospital intensive care unit', imageSide: 'right', body: ['There are seasons in life that test the strength of the body, the courage of the heart, and the depth of one’s faith.', 'Jude faced a sudden, devastating illness that brought him frighteningly close to the end of life. In the intensive care unit, amidst monitors and ventilators, every breath was a hard-fought battle.', 'It was a painful chapter that reminded his family and loved ones how fragile human life can be—and how precious every shared moment truly is.'], duration: 11 },
  { kind: 'story', eyebrow: 'The Valley and the Prayers', title: 'Hope never flickered out.', image: '/images/journey-01.webp', imageAlt: 'Intensive care vigil during a difficult season', imageSide: 'left', body: ['In the thick face of uncertainty, prayers rose ceaselessly like incense across oceans and time zones.', 'Family and loved ones stood together in fervent intercession, holding fast to hope through long nights and anxious waiting.', 'The season was difficult, but the story did not end where the struggle began.'], duration: 12 },
  { kind: 'quote', eyebrow: 'A Turning Point', title: 'The Lord had another chapter to write.', body: ['This is a family testimony of a difficult season, the power of prayer, and the divine grace that carried him through it.', '“Lord, You who formed him in his mother’s womb and granted him a heart of integrity, breathe upon Jude now. Where medical science meets its threshold, let Your divine sovereignty prevail. Restore his vigor, sustain his loved ones, and turn this hospital bed into an altar of praise.”', 'Psalm 118:17 — “I shall not die, but live, and declare the works of the Lord.”'], duration: 11 },
  { kind: 'story', eyebrow: 'The Grace of God', title: 'When hope found a reason to celebrate.', image: '/images/grace.webp', imageAlt: 'Jude supported by his wife during hospital recovery', imageSide: 'right', body: ['What once seemed like an insurmountable valley blossomed into an enduring altar of thanksgiving and joy.', 'Jude’s courageous turnaround is a living testament to God’s mercy, the potency of collective prayer, and the fragile sacredness of human existence.', 'We gather not simply to remember pain, but to celebrate the magnificent gift of life, faith over fear, and the joy of being together.'], duration: 14 },
  { kind: 'story', eyebrow: 'Milestones of Restoration', title: 'Grace, one milestone at a time.', image: '/images/journey-02.webp', imageAlt: 'Jude awake in the hospital after extubation', imageSide: 'left', cards: [{ title: 'The Turning Point', body: 'Vitals stabilized against all odds, surprising medical teams with supernatural recovery.' }, { title: 'Loving Presence', body: 'An unbroken vigil of loved ones, holding hands in quiet solidarity and unceasing hope.' }, { title: 'Renewed Vigor', body: 'Returning on his feet with vitality, sound mind, and a heart brimming with praise.' }], duration: 14 },
  { kind: 'story', eyebrow: 'Restoration Realized', title: 'What a difference a day can make.', image: '/images/recovery-01.webp', imageAlt: 'Jude resting peacefully and breathing freely', imageSide: 'right', body: ['As healing poured through his body, fear gave way to gratitude.', 'Tubes were removed, eyes opened with clarity, voice returned with warmth, and laughter once again filled the room.', 'A family that prayed through uncertainty now has another chapter to celebrate.'], quote: 'What a difference a day can make. What a testimony grace can write.', extraImages: ['/images/recovery-02.webp', '/images/recovery-03.webp'], duration: 14 },
  { kind: 'story', eyebrow: 'A Legacy of Generosity', title: 'His generosity is part of his story.', image: '/images/legacy-01.webp', imageAlt: 'Jude smiling warmly in traditional attire', imageSide: 'left', body: ['A person’s true impact is not measured only by what they achieve, but by the lives they influence, the burdens they lift, and the smiles they restore.', 'Jude’s generosity and deep personal investment in young people, especially within his extended family and ancestral community, form a foundational pillar of the triumph we celebrate.', 'His willingness to support others speaks of a life that values people, fosters opportunity, and protects the future of the next generation.'], duration: 10 },
  { kind: 'story', eyebrow: 'A Life That Opens Doors', title: 'A pillar to family and community.', image: '/images/legacy-02.webp', imageAlt: 'Jude standing in red ceremonial chieftain attire', imageSide: 'right', cards: [{ title: 'Youth & Education', body: 'Sponsoring schooling, educational requirements, and apprenticeships for young relatives and community members.' }, { title: 'Extended Family Pillar', body: 'A dependable beacon during family meetings, communal deliberations, and times of need.' }, { title: 'Quiet Benevolence', body: 'Touching lives, settling medical bills, and easing hardships with no expectation of praise.' }], duration: 11 },
  { kind: 'quote', eyebrow: 'Enduring Testament', title: 'The good we leave in other lives.', body: ['The sea of love surrounding him today is a mirror of the many lives he has quietly touched.', 'His legacy is carried forward in opportunity shared, burdens eased, and people encouraged.'], quote: 'The greatest legacy is the good we leave in other lives.', duration: 11 },
  { kind: 'story', eyebrow: 'Life, Family & Togetherness', title: 'The beauty of being here.', image: '/images/family-06.webp', imageAlt: 'Jude, his wife and daughter together at a family celebration', imageSide: 'left', body: ['Beyond the arduous hospital corridors and anxious waiting rooms are the indelible memories that make life sweet and truly beautiful.', 'The laughter around the family dining table, warm handshakes with lifelong friends, weddings and milestone celebrations, shared stories, and peaceful mornings form the tapestry of a life worth celebrating.'], duration: 10 },
  { kind: 'story', eyebrow: 'The Moments That Make Life Beautiful', title: 'Every gathering is sweeter.', image: '/images/legacy-03.webp', imageAlt: 'Jude and his wife embracing in matching African prints', imageSide: 'right', body: ['Every phone call carries deeper meaning. The moments preserved in photographs are not merely souvenirs of the past; they remind us that every single dawn is a gift of divine grace.', 'Today, we celebrate the profound privilege of continuing to share life, laughter, and wisdom with the people we love most.'], duration: 11 },
  { kind: 'story', eyebrow: 'Kinship & Belonging', title: 'Nwanne bu ike.', image: '/images/family-04.webp', imageAlt: 'Jude and his wife in ceremonial attire', imageSide: 'left', body: ['Deep Kinship. Unbroken Fellowship. Sacred Memory.', 'Together as family and community, we celebrate a life miraculously saved and lovingly preserved.', 'Kinship is strength. The privilege of being together is a gift worthy of thanksgiving.'], quote: 'Nwanne bu ike — Kinship is Strength', duration: 11 },
  { kind: 'story', eyebrow: 'All Glory Belongs to God', title: 'A heart full of gratitude.', image: '/images/celebration-01.webp', imageAlt: 'Jude and his wife with hands raised in thanksgiving', imageSide: 'right', body: ['There are profound moments when ordinary words pale in comparison to what the human spirit feels.', 'For Jude, his loving family, and everyone whose path has crossed with his, this celebration is such a sacred moment.', 'Surrounded by kinship and the bountiful goodness of the Lord, every breath is lifted in heartfelt praise.'], duration: 10 },
  { kind: 'story', eyebrow: 'What We Give Thanks For', title: 'Every breath. Every strength. Every grace.', body: [THANKSGIVING_PILLARS[0].description, THANKSGIVING_PILLARS[1].description, THANKSGIVING_PILLARS[2].description], duration: 14 },
  { kind: 'story', eyebrow: 'Family, Friends & Another Chapter', title: 'The people who stood firm.', body: [THANKSGIVING_PILLARS[3].description, THANKSGIVING_PILLARS[4].description], duration: 12 },
  { kind: 'quote', eyebrow: 'A Thanksgiving Inscription', title: 'Every good and perfect gift comes from above.', body: ['Today, we celebrate with joyful and humble hearts, acknowledging the goodness of the Lord.', 'For life preserved, strength renewed, family gathered, and another chapter granted—we give thanks.'], quote: 'To God be the glory, now and always.', duration: 8 },
  { kind: 'gallery-intro', eyebrow: 'The Complete Photographic Exhibition', title: 'A life in pictures.', body: ['Twenty-seven photographs. One testimony of heritage, hardship, healing, family, and thanksgiving.', 'Each image appears once in this presentation.'], duration: 5 },
  ...galleryPhotos.map((photo, index) => ({ kind: 'photo' as const, title: photo.title, eyebrow: photo.category, photo, duration: 8, imageSide: index % 2 === 0 ? 'left' as const : 'right' as const })),
  { kind: 'final', eyebrow: 'In Thanksgiving & Praise', title: 'To God be the glory, now and always.', body: [EVENT_DETAILS.honoree, EVENT_DETAILS.titleHonorific, 'A life of integrity. A journey of grace. A testimony of gratitude.'], quote: 'THE TRIUMPH OF EZIOKWUBUNDU I', duration: 20.24 },
];

const starts = slides.map((_, index) => slides.slice(0, index).reduce((sum, slide) => sum + slide.duration, 0));
const totalDuration = slides.reduce((sum, slide) => sum + slide.duration, 0);

export const Presentation: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimerRef = useRef<number | null>(null);
  const slide = slides[slideIndex];
  const trackDuration = audioRef.current?.duration && Number.isFinite(audioRef.current.duration) ? audioRef.current.duration : totalDuration;
  const progress = Math.min(100, (currentTime / trackDuration) * 100);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current !== null) window.clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 3500);
  }, []);

  const handlePresentationPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) revealControls();
    else setControlsVisible((visible) => !visible);
  };

  const goToSlide = useCallback((index: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    setSlideIndex(next);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = starts[next];
      setCurrentTime(starts[next]);
    }
  }, []);

  const closePresentation = useCallback(() => {
    const audio = audioRef.current;
    audio?.pause();
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    if (window.history.state?.presentationRoute) window.history.back();
    else window.location.assign('/');
  }, []);

  const startPresentation = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setStarted(true);
    try {
      const full = document.documentElement.requestFullscreen?.();
      if (full) void full.catch(() => undefined);
      const orientation = screen.orientation as ScreenOrientation & { lock?: (orientation: string) => Promise<void> };
      if (orientation?.lock) void orientation.lock('landscape').catch(() => undefined);
      audio.currentTime = 0;
      await audio.play();
      setPlaying(true);
      setAudioError('');
    } catch (error) {
      setPlaying(false);
      setAudioError(error instanceof Error ? error.message : 'Audio could not start. Press play to try again.');
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try { await audio.play(); setPlaying(true); setAudioError(''); }
      catch { setAudioError('Playback was blocked. Tap play again to continue.'); }
    } else { audio.pause(); setPlaying(false); }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      const time = audio.currentTime;
      setCurrentTime(time);
      const scale = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration / totalDuration : 1;
      const timelineTime = time / scale;
      if (audio.ended || timelineTime >= totalDuration) {
        setSlideIndex(slides.length - 1);
        audio.pause();
        setPlaying(false);
        return;
      }
      let index = starts.findIndex((start, i) => timelineTime >= start && timelineTime < start + slides[i].duration);
      if (index >= 0) setSlideIndex(index);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => { setSlideIndex(slides.length - 1); setCurrentTime(totalDuration); setPlaying(false); };
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreen);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { if (!document.fullscreenElement) closePresentation(); }
      if (event.key === 'ArrowRight') goToSlide(slideIndex + 1);
      if (event.key === 'ArrowLeft') goToSlide(slideIndex - 1);
      if (event.code === 'Space' && started) { event.preventDefault(); void togglePlayback(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('fullscreenchange', onFullscreen); window.removeEventListener('keydown', onKey); };
  }, [closePresentation, goToSlide, slideIndex, started]);

  useEffect(() => () => {
    audioRef.current?.pause();
    if (controlsTimerRef.current !== null) window.clearTimeout(controlsTimerRef.current);
  }, []);

  useEffect(() => {
    if (!started || !controlsVisible) return;
    if (controlsTimerRef.current !== null) window.clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 3500);
    return () => {
      if (controlsTimerRef.current !== null) window.clearTimeout(controlsTimerRef.current);
    };
  }, [started, controlsVisible, slideIndex]);

  const cards = slide.cards ?? [];
  const displayImage = slide.kind === 'photo' ? slide.photo?.imageSrc : slide.image;
  const imageAlt = slide.kind === 'photo' ? slide.photo?.title : slide.imageAlt;
  const body = slide.kind === 'photo' ? [slide.photo?.caption ?? '', slide.photo?.dateOrEra ?? ''].filter(Boolean) : slide.body ?? [];

  return (
    <main onPointerDown={started ? handlePresentationPointerDown : undefined} className="sun-presentation fixed inset-0 z-[100] flex min-h-[100svh] flex-col overflow-hidden bg-[#3B0A18] text-[#FAF6EC]" aria-label="Eziokwubundu I cinematic presentation">
      <audio ref={audioRef} src="/audio/EZIOKWUBUNDU_df0b5da6.mp3" preload="auto" />
      <div className="sun-film-grain" aria-hidden="true" />
      {!started ? (
        <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <button onClick={closePresentation} className="sun-control absolute left-5 top-5 sm:left-8 sm:top-8"><ArrowLeft size={17} /><span>Back to website</span></button>
          <p className="sun-eyebrow mb-6">{EVENT_DETAILS.eventName}</p>
          <p className="sun-title-kicker mb-5">A Thanksgiving Tribute</p>
          <h1 className="sun-main-title max-w-5xl">{EVENT_DETAILS.title}</h1>
          <p className="mt-6 font-serif text-xl text-[#FAF6EC]/90">{EVENT_DETAILS.honoree}</p>
          <p className="mt-3 max-w-xl text-sm tracking-wide text-[#E7D5A9]">{EVENT_DETAILS.subtitle}</p>
          <button onClick={startPresentation} className="sun-start-button mt-12"><Play size={17} fill="currentColor" /> Start Presentation</button>
          <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#FAF6EC]/45">Soundtrack begins when you are ready</p>
        </section>
      ) : (
        <>
          <header className={`sun-chrome relative z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-8 ${controlsVisible ? 'is-visible' : 'is-hidden'}`}>
            <button onClick={closePresentation} className="sun-control" aria-label="Close presentation"><ArrowLeft size={17} /><span className="hidden sm:inline">Back to website</span></button>
            <div className="text-center"><span className="sun-eyebrow">{EVENT_DETAILS.titleHonorific}</span><span className="ml-3 text-[10px] text-[#FAF6EC]/45">{String(slideIndex + 1).padStart(2, '0')} / {slides.length}</span></div>
            <button onClick={() => document.fullscreenElement ? void document.exitFullscreen() : void document.documentElement.requestFullscreen?.()} className="sun-control" aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}</button>
          </header>
          <section key={slideIndex} className="sun-slide relative z-10 flex flex-1 items-center justify-center px-6 pb-8 sm:px-10 lg:px-16">
            {slide.kind === 'title' || slide.kind === 'final' ? (
              <div className="sun-title-layout text-center">
                <p className="sun-eyebrow mb-7">{slide.eyebrow}</p>
                <h1 className="sun-main-title">{slide.title}</h1>
                {body.map((line, i) => <p key={i} className={i === 0 ? 'mt-7 font-serif text-xl sm:text-2xl' : 'mt-3 text-sm tracking-wide text-[#E7D5A9]'}>{line}</p>)}
                {slide.quote && <p className="mt-9 font-serif text-sm tracking-[0.25em] text-[#C9A24B]">{slide.quote}</p>}
              </div>
            ) : slide.kind === 'gallery-intro' ? (
              <div className="max-w-4xl text-center"><p className="sun-eyebrow mb-6">{slide.eyebrow}</p><h2 className="sun-heading">{slide.title}</h2>{body.map((line, i) => <p key={i} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#FAF6EC]/75">{line}</p>)}<span className="mt-10 inline-block border-y border-[#C9A24B]/40 py-3 text-xs uppercase tracking-[0.3em] text-[#C9A24B]">27 unique photographs · one visual archive</span></div>
            ) : (
              <div className={`sun-content-grid ${displayImage ? 'has-image' : 'text-only'} ${slide.imageSide === 'left' ? 'image-left' : 'image-right'}`}>
                <div className="sun-copy">
                  <p className="sun-eyebrow mb-4">{slide.eyebrow}</p>
                  <h2 className="sun-heading">{slide.title}</h2>
                  {body.map((line, i) => <p key={i} className="sun-body" style={{ animationDelay: `${180 + i * 180}ms` }}>{line}</p>)}
                  {cards.length > 0 && <div className="sun-cards">{cards.map((card, i) => <article key={card.title} className="sun-card" style={{ animationDelay: `${250 + i * 130}ms` }}><h3>{card.title}</h3><p>{card.body}</p></article>)}</div>}
                  {slide.quote && <blockquote className="sun-quote">{slide.quote}</blockquote>}
                </div>
                {displayImage && <figure className="sun-photo"><img src={displayImage} alt={imageAlt ?? ''} /><figcaption>{slide.kind === 'photo' ? slide.photo?.title : slide.imageAlt}</figcaption>{slide.extraImages?.length ? <div className="sun-extra-photos">{slide.extraImages.map((src) => <img key={src} src={src} alt="Jude’s continuing recovery" />)}</div> : null}</figure>}
              </div>
            )}
          </section>
          <footer className={`sun-chrome relative z-20 px-5 pb-4 sm:px-8 ${controlsVisible ? 'is-visible' : 'is-hidden'}`}>
            <div className="mb-3 h-[2px] w-full overflow-hidden bg-[#FAF6EC]/15"><div className="h-full bg-[#C9A24B] transition-[width] duration-200" style={{ width: `${progress}%` }} /></div>
            <div className="flex items-center justify-between gap-3">
              <button onClick={() => goToSlide(slideIndex - 1)} className="sun-control" disabled={slideIndex === 0}><ArrowLeft size={17} /><span className="hidden sm:inline">Previous</span></button>
              <div className="flex items-center gap-3"><button onClick={togglePlayback} className="sun-play-control" aria-label={playing ? 'Pause soundtrack' : 'Play soundtrack'}>{playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}</button><span className="text-[10px] tabular-nums tracking-wider text-[#FAF6EC]/60">{formatTime(currentTime)} / {formatTime(trackDuration)}</span><Volume2 size={15} className="text-[#C9A24B]" /></div>
              <button onClick={() => goToSlide(slideIndex + 1)} className="sun-control" disabled={slideIndex === slides.length - 1}><span className="hidden sm:inline">Next</span><ArrowRight size={17} /></button>
            </div>
            {audioError && <p role="status" className="mt-2 text-center text-xs text-[#E7D5A9]">{audioError}</p>}
          </footer>
          <div className="sun-rotate-hint" role="status">For the full-screen experience, rotate your device to landscape.</div>
        </>
      )}
      <style>{`
        .sun-chrome{opacity:1;visibility:visible;transition:opacity .35s ease,visibility .35s ease}.sun-chrome.is-hidden{opacity:0;visibility:hidden;pointer-events:none}.sun-chrome.is-visible{opacity:1;visibility:visible;pointer-events:auto}
        .sun-presentation{font-family:'Plus Jakarta Sans',sans-serif;background:radial-gradient(ellipse at 50% 45%,#5a1b2b 0%,#3B0A18 58%,#26050e 100%);--sun-gold:#C9A24B}
        .sun-film-grain{position:absolute;inset:0;pointer-events:none;opacity:.12;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E")}
        .sun-eyebrow{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#C9A24B;font-weight:600}
        .sun-title-kicker{font-size:11px;letter-spacing:.38em;text-transform:uppercase;color:#E7D5A9}
        .sun-main-title{font-family:'Cinzel','Poppins',serif;font-size:clamp(2.2rem,6vw,5.7rem);line-height:1.08;letter-spacing:.035em;font-weight:600;color:#FAF6EC;text-wrap:balance;text-shadow:0 8px 45px #0005}
        .sun-heading{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,4vw,4.2rem);line-height:1.08;color:#FAF6EC;font-weight:500;text-wrap:balance;margin-bottom:1.2rem}
        .sun-start-button{display:inline-flex;align-items:center;gap:12px;padding:15px 30px;border:1px solid #D9B96B;background:linear-gradient(135deg,#E0BE6C,#B88D3D);color:#3B0A18;border-radius:999px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;box-shadow:0 10px 40px #0003;transition:transform .25s,filter .25s}
        .sun-start-button:hover{transform:translateY(-2px);filter:brightness(1.08)}
        .sun-control,.sun-play-control{display:inline-flex;align-items:center;justify-content:center;gap:8px;color:#FAF6EC;border:1px solid #C9A24B55;border-radius:999px;padding:9px 13px;font-size:11px;letter-spacing:.08em;background:#25050d55;transition:background .2s}
        .sun-control:hover,.sun-play-control:hover{background:#C9A24B25}.sun-control:disabled{opacity:.25;cursor:not-allowed}
        .sun-play-control{width:38px;height:38px;padding:0;border-color:#C9A24B;background:#C9A24B;color:#3B0A18}
        .sun-slide{animation:sunFade .7s ease both;min-height:0}
        .sun-content-grid{width:min(1320px,100%);display:grid;grid-template-columns:minmax(0,1.05fr) minmax(260px,.95fr);align-items:center;gap:clamp(24px,5vw,72px);max-height:100%;margin:auto}
        .sun-content-grid.image-left .sun-copy{order:2}.sun-content-grid.image-left .sun-photo{order:1}
        .sun-content-grid.text-only{display:block;max-width:980px}
        .sun-copy{max-width:760px}.sun-body{font-size:clamp(13px,1.25vw,18px);line-height:1.7;color:#FAF6ECb8;margin-top:13px;animation:sunRise .7s ease both}
        .sun-photo{position:relative;max-height:min(62vh,650px);border:1px solid #C9A24B99;padding:7px;background:#26050e;box-shadow:0 25px 80px #0005;animation:sunRise .8s ease both}
        .sun-photo img{display:block;width:100%;height:min(58vh,620px);object-fit:contain;background:#1e040b}
        .sun-extra-photos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:7px}.sun-extra-photos img{width:100%;height:clamp(70px,13vh,130px);object-fit:cover;background:#1e040b}.sun-photo figcaption{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#C9A24B;padding:10px 6px 3px}
        .sun-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:22px}
        .sun-card{border-top:1px solid #C9A24B99;background:#FAF6EC0d;padding:13px 12px;animation:sunRise .7s ease both}
        .sun-card h3{font-family:'Playfair Display',serif;color:#E7D5A9;font-size:13px;margin-bottom:6px}.sun-card p{font-size:10px;line-height:1.5;color:#FAF6ECb0}
        .sun-quote{border-left:2px solid #C9A24B;padding:8px 0 8px 18px;margin-top:22px;color:#E7D5A9;font-family:'Playfair Display',serif;font-size:clamp(17px,2vw,25px);font-style:italic}
        .sun-title-layout{max-width:1050px}.sun-rotate-hint{display:none}
        @keyframes sunFade{from{opacity:0}to{opacity:1}}@keyframes sunRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:700px){.sun-content-grid{grid-template-columns:1fr;gap:14px;overflow:auto;max-height:100%}.sun-content-grid.image-left .sun-copy,.sun-content-grid.image-left .sun-photo{order:initial}.sun-copy{max-width:none}.sun-heading{font-size:clamp(1.7rem,6vw,2.7rem);margin-bottom:.6rem}.sun-body{font-size:12px;line-height:1.5;margin-top:8px}.sun-photo{max-height:31vh}.sun-photo img{height:26vh}.sun-cards{gap:6px;margin-top:12px}.sun-card{padding:8px 7px}.sun-card h3{font-size:11px}.sun-card p{font-size:9px}.sun-rotate-hint{display:block;position:absolute;bottom:75px;left:0;right:0;text-align:center;font-size:9px;color:#FAF6EC55;letter-spacing:.1em;pointer-events:none}}
        @media(orientation:portrait) and (max-width:700px){.sun-presentation .sun-slide{padding-top:6px;padding-bottom:6px}.sun-rotate-hint{color:#E7D5A9}}
        @media(prefers-reduced-motion:reduce){.sun-slide,.sun-body,.sun-card,.sun-photo{animation:none!important}}
      `}</style>
    </main>
  );
};

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}
