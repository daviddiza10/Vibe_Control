import React from 'react';

interface MediaPreviewModalProps {
  item: { title: string; subtitle: string; image: string } | null;
  onClose: () => void;
}

export const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <div className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative bg-slate-900/80">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 border border-white/10 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="relative h-64 md:h-80 w-full bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.6)] cursor-pointer animate-pulse border border-indigo-400/40">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-2">
          <h3 className="font-headline-md text-2xl text-white font-bold">
            {item.title}
          </h3>
          <p className="font-body-md text-slate-300 text-sm">{item.subtitle}</p>
          <p className="font-body-md text-slate-400/80 text-xs pt-2">
            Sanctuary media player active. Atmosphere lighting synced with video scene.
          </p>
        </div>
      </div>
    </div>
  );
};

