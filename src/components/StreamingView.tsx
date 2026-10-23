import React from 'react';
import { StreamingPlatform, ContinueWatchingItem, RecommendedItem } from '../types';

interface StreamingViewProps {
  platforms: StreamingPlatform[];
  continueWatching: ContinueWatchingItem[];
  recommended: RecommendedItem[];
  onAddPlatformClick: () => void;
  onPlayMedia: (item: { title: string; subtitle: string; image: string }) => void;
}

export const StreamingView: React.FC<StreamingViewProps> = ({
  platforms,
  continueWatching,
  recommended,
  onAddPlatformClick,
  onPlayMedia,
}) => {
  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      {/* Favorite Platforms */}
      <section>
        <h2 className="font-headline-lg-mobile md:text-2xl text-white font-bold mb-6 tracking-tight">
          Favorite Platforms
        </h2>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 snap-x">
          {platforms.map((p) => (
            <a
              key={p.id}
              href={p.url || '#'}
              target="_blank"
              rel="noreferrer"
              className="snap-start shrink-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center w-32 h-32 glow-border transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/10"
            >
              <span
                className="material-symbols-outlined text-4xl mb-2"
                style={{ color: p.color || '#818cf8' }}
              >
                {p.icon}
              </span>
              <span className="font-label-caps text-xs text-slate-200 font-semibold">{p.name}</span>
            </a>
          ))}

          {/* Add Platform Card */}
          <button
            onClick={onAddPlatformClick}
            className="snap-start shrink-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center w-32 h-32 hover:bg-white/10 transition-all active:scale-95 border-dashed border-2 border-slate-600 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl text-slate-400 mb-2">add</span>
            <span className="font-label-caps text-xs text-slate-400">Add</span>
          </button>
        </div>
      </section>

      {/* Continue Watching */}
      <section>
        <h2 className="font-headline-lg-mobile md:text-2xl text-white font-bold mb-6 tracking-tight">
          Continue Watching
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {continueWatching.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                onPlayMedia({
                  title: item.title,
                  subtitle: item.subtitle,
                  image: item.bgImage,
                })
              }
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer relative glow-border transition-all border border-white/10 shadow-lg"
            >
              <div
                className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.bgImage}')` }}
              />

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                <div
                  className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>

              {/* Card Footer Overlay */}
              <div className="p-4 flex justify-between items-center bg-slate-900/80 backdrop-blur-md absolute bottom-0 w-full border-t border-white/5">
                <div>
                  <h3 className="font-headline-md text-base text-white font-bold">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-slate-400 text-xs mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <button className="bg-indigo-500/20 border border-indigo-500/30 p-3 rounded-full text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer active:scale-95 shadow-md">
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section>
        <h2 className="font-headline-lg-mobile md:text-2xl text-white font-bold mb-6 flex items-center gap-2 tracking-tight">
          <span className="material-symbols-outlined text-indigo-400">auto_awesome</span>
          Recommended for You
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommended.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                onPlayMedia({
                  title: item.title,
                  subtitle: item.genre,
                  image: item.image,
                })
              }
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all border border-white/10 shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="p-3">
                <h4 className="font-label-caps text-xs text-white font-bold truncate">
                  {item.title}
                </h4>
                <p className="font-body-md text-slate-400 text-[11px] mt-1">
                  {item.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

