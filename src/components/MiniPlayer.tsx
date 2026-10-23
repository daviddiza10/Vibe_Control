import React, { useState, useEffect } from 'react';
import { audioService } from '../lib/audioService';

interface MiniPlayerProps {
  currentTrack: {
    title: string;
    subtitle: string;
    image: string;
    frequency?: number;
  } | null;
  onClose?: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const track = currentTrack || {
    title: 'Lo-Fi Beats: Tokyo Midnight',
    subtitle: 'Focus & Chill Playlist',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpyMOFZoKvrYAy0KtQ6jzdhNvi7OUiullIaeOX7tkl1bL1Kw4w15oczMHsn1qw5UOKTdr6b5y2-bQztbolLmYqxMbzYYLPzafh3HlPrTugGUI3oHHjK8BnG6-gMWHBGrDi30M1k7PJtWPg_9TqAgubtAgfH3Qfh6TUIFth9jSQJwWLRCgHrxOih7VAlXpNvD8Xc1U383ovatmwlSrLxQPSjsknn3FqrCrWTMkjmAcVxdHZmsCqtrP8',
    frequency: 330,
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    const active = audioService.togglePlayPause(track.title, track.frequency || 330);
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-[84px] md:bottom-6 w-full z-40 px-4 md:px-0 md:left-24 md:w-[calc(100%-120px)] max-w-4xl pointer-events-none flex justify-center">
      <div className="w-full glass-card rounded-2xl p-3 flex items-center gap-4 pointer-events-auto shadow-[0_16px_40px_rgba(0,0,0,0.6)] border border-white/15 relative overflow-hidden backdrop-blur-2xl bg-slate-900/80">
        {/* Progress Bar (Top Edge) */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)] rounded-r-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Artwork */}
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-cover bg-center shrink-0 border border-white/10 shadow-inner"
          style={{ backgroundImage: `url(${track.image})` }}
        />

        {/* Metadata */}
        <div className="flex-1 min-w-0">
          <h4 className="font-headline-md text-sm md:text-base font-bold text-white truncate">
            {track.title}
          </h4>
          <p className="font-body-md text-xs text-slate-300 truncate">
            {track.subtitle}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 pr-2">
          <button
            onClick={() => setProgress((p) => Math.max(0, p - 10))}
            className="text-slate-400 hover:text-white transition-colors hidden md:block cursor-pointer"
            aria-label="Previous Track"
          >
            <span className="material-symbols-outlined">skip_previous</span>
          </button>

          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause Ambient Sound" : "Play Ambient Sound"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-pointer active:scale-95 border border-indigo-400/40"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={() => setProgress((p) => (p + 10) % 100)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next Track"
          >
            <span className="material-symbols-outlined">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

