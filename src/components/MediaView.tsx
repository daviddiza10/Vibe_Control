import React, { useState } from 'react';
import { MediaSound, MediaTrending } from '../types';

interface MediaViewProps {
  relaxingSounds: MediaSound[];
  trendingMedia: MediaTrending[];
  currentTrackTitle: string;
  isPlaying: boolean;
  onSelectTrack: (track: {
    title: string;
    subtitle: string;
    image: string;
    frequency?: number;
  }) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({
  relaxingSounds,
  trendingMedia,
  currentTrackTitle,
  isPlaying,
  onSelectTrack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSounds = relaxingSounds.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrending = trendingMedia.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fadeIn pb-24">
      {/* Search Input Section */}
      <section className="mt-4">
        <div className="relative w-full max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-400">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sounds, artists, or vibes..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 text-slate-100 placeholder-slate-400 transition-all duration-300 font-body-lg text-sm md:text-base backdrop-blur-xl shadow-lg"
          />
        </div>
      </section>

      {/* Relaxing Sounds Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-md text-xl md:text-2xl font-bold text-white tracking-tight">
            Relaxing Sounds
          </h2>
          <button className="font-label-caps text-xs text-indigo-400 hover:text-indigo-300 transition-colors uppercase font-bold cursor-pointer">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSounds.map((s) => {
            const isThisPlaying = isPlaying && currentTrackTitle.includes(s.title);
            return (
              <div
                key={s.id}
                onClick={() =>
                  onSelectTrack({
                    title: s.title,
                    subtitle: s.subtitle,
                    image: s.image,
                    frequency: s.audioFrequency,
                  })
                }
                className={`glass-card rounded-2xl p-4 flex items-center gap-4 transition-all group cursor-pointer border ${
                  isThisPlaying
                    ? 'border-indigo-400 bg-indigo-500/15 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                    : 'border-white/10 hover:border-indigo-400/50 hover:bg-white/10'
                }`}
              >
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-white/10 group-hover:shadow-md transition-all"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-headline-md text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {s.title}
                  </h3>
                  <p className="font-body-md text-slate-400 text-xs mt-1">
                    {s.subtitle}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0 shadow-sm">
                  {isThisPlaying ? (
                    <div className="flex gap-1 items-end h-4">
                      <div className="w-1 bg-current rounded-full h-full animate-pulse" />
                      <div className="w-1 bg-current rounded-full h-1/2 animate-pulse delay-100" />
                      <div className="w-1 bg-current rounded-full h-3/4 animate-pulse delay-200" />
                    </div>
                  ) : (
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Now Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">trending_up</span>
            <h2 className="font-headline-md text-xl md:text-2xl font-bold text-white tracking-tight">
              Trending Now
            </h2>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x">
          {filteredTrending.map((t) => (
            <div
              key={t.id}
              onClick={() =>
                onSelectTrack({
                  title: t.title,
                  subtitle: t.subtitle,
                  image: t.image,
                  frequency: 280,
                })
              }
              className={`snap-start shrink-0 glass-card rounded-2xl overflow-hidden group cursor-pointer relative border border-white/10 ${
                t.featured ? 'w-[280px] md:w-[340px]' : 'w-[240px] md:w-[280px]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent z-10 pointer-events-none" />
              <div
                className="w-full h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${t.image}')` }}
              />

              <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                {t.tag && (
                  <span className="inline-block px-2.5 py-0.5 bg-indigo-500 text-white font-mono text-[10px] rounded-md uppercase tracking-wider mb-1.5 font-bold shadow-md">
                    {t.tag}
                  </span>
                )}
                <h3 className="font-headline-md text-lg font-bold text-white truncate">
                  {t.title}
                </h3>
                <p className="font-body-md text-xs text-slate-300 mt-0.5">{t.subtitle}</p>
              </div>

              <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-indigo-300 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

