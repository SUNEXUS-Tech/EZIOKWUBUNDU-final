/**
 * Official Thanksgiving Song Audio Player Singleton
 * "The Triumph of Eziokwubundu I – Jude Ifeanyi Anwukah"
 *
 * Provides continuous playback across website navigation,
 * handles browser autoplay restrictions gracefully, supports
 * mobile/desktop interactions, and handles error states reliably.
 */

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  volume: number;
  isMuted: boolean;
  autoplayBlocked: boolean;
}

type AudioListener = (state: AudioState) => void;

class OfficialAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private audioSrc = '/audio/EZIOKWUBUNDU_df0b5da6.mp3';
  private listeners: Set<AudioListener> = new Set();
  private userInteracted = false;
  private initialAutoplayAttempted = false;

  private state: AudioState = {
    isPlaying: false,
    isLoading: true,
    isError: false,
    errorMessage: null,
    volume: 0.8,
    isMuted: false,
    autoplayBlocked: false,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;

    try {
      this.audio = new Audio();
      this.audio.src = this.audioSrc;
      this.audio.preload = 'auto';
      this.audio.loop = true;
      this.audio.volume = this.state.volume;

      // Event listeners on HTMLAudioElement
      this.audio.addEventListener('play', () => {
        this.updateState({ isPlaying: true, isLoading: false, isError: false });
      });

      this.audio.addEventListener('pause', () => {
        this.updateState({ isPlaying: false });
      });

      this.audio.addEventListener('waiting', () => {
        this.updateState({ isLoading: true });
      });

      this.audio.addEventListener('playing', () => {
        this.updateState({ isPlaying: true, isLoading: false });
      });

      this.audio.addEventListener('canplay', () => {
        this.updateState({ isLoading: false, isError: false });
      });

      this.audio.addEventListener('error', (e) => {
        const error = this.audio?.error;
        let message = 'Failed to load audio stream';
        if (error) {
          switch (error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              message = 'Audio loading was aborted';
              break;
            case MediaError.MEDIA_ERR_NETWORK:
              message = 'Network error while loading audio';
              break;
            case MediaError.MEDIA_ERR_DECODE:
              message = 'Error decoding audio file';
              break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              message = 'Audio format not supported or file missing';
              break;
          }
        }
        console.warn('Audio playback error:', message, e);
        this.updateState({
          isPlaying: false,
          isLoading: false,
          isError: true,
          errorMessage: message,
        });
      });
    } catch (err) {
      console.error('Audio initialization failure:', err);
      this.updateState({
        isError: true,
        errorMessage: 'Audio system unavailable',
        isLoading: false,
      });
    }
  }

  private updateState(partial: Partial<AudioState>) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  private notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Error notifying audio listener:', err);
      }
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    // Notify immediately with current state
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): AudioState {
    return this.state;
  }

  public getIsPlaying(): boolean {
    return this.state.isPlaying;
  }

  /**
   * Attempt to start autoplay on page load.
   * If browser blocks unmuted autoplay, registers a one-time gesture listener
   * on window/document so playback begins seamlessly on first user interaction.
   */
  public attemptAutoplay(): void {
    if (this.initialAutoplayAttempted) return;
    this.initialAutoplayAttempted = true;

    this.play().then((success) => {
      if (!success) {
        // Autoplay was restricted by the browser policy
        this.updateState({ autoplayBlocked: true });
        this.setupGestureUnlock();
      }
    });
  }

  private setupGestureUnlock() {
    if (this.userInteracted || typeof window === 'undefined') return;

    const unlockPlayback = () => {
      if (this.userInteracted) return;
      this.userInteracted = true;

      // Remove gesture listeners
      window.removeEventListener('pointerdown', unlockPlayback);
      window.removeEventListener('keydown', unlockPlayback);
      window.removeEventListener('touchstart', unlockPlayback);

      // Start playback now that user interacted
      this.play().then(() => {
        this.updateState({ autoplayBlocked: false });
      });
    };

    window.addEventListener('pointerdown', unlockPlayback, { passive: true, once: true });
    window.addEventListener('keydown', unlockPlayback, { passive: true, once: true });
    window.addEventListener('touchstart', unlockPlayback, { passive: true, once: true });
  }

  public async play(): Promise<boolean> {
    if (!this.audio) {
      this.initAudio();
    }
    if (!this.audio) return false;

    try {
      this.updateState({ isLoading: true });
      await this.audio.play();
      this.updateState({ isPlaying: true, isLoading: false, isError: false, autoplayBlocked: false });
      return true;
    } catch (err: unknown) {
      const errorObj = err as Error;
      if (errorObj?.name === 'NotAllowedError') {
        // Autoplay policy prevented playback
        this.updateState({
          isPlaying: false,
          isLoading: false,
          autoplayBlocked: true,
        });
      } else {
        console.warn('Playback error:', err);
        this.updateState({
          isPlaying: false,
          isLoading: false,
          isError: true,
          errorMessage: errorObj?.message || 'Playback could not start',
        });
      }
      return false;
    }
  }

  public pause(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.updateState({ isPlaying: false });
    }
  }

  public async toggle(): Promise<boolean> {
    this.userInteracted = true;
    if (this.state.isPlaying) {
      this.pause();
      return false;
    } else {
      return await this.play();
    }
  }

  public setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = clamped;
    }
    this.updateState({
      volume: clamped,
      isMuted: clamped === 0,
    });
  }

  public toggleMute(): void {
    if (this.state.isMuted || this.state.volume === 0) {
      const restored = 0.8;
      this.setVolume(restored);
    } else {
      this.setVolume(0);
    }
  }
}

export const officialAudio = new OfficialAudioPlayer();
