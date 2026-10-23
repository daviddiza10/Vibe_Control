import React from 'react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  vibeName: string;
  temperature: number;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  vibeName,
  temperature,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: string) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
      />

      {/* Slide-out Panel */}
      <div className="relative w-80 max-w-[80vw] backdrop-blur-2xl bg-slate-900/90 border-r border-white/10 h-full p-6 flex flex-col justify-between z-10 shadow-2xl animate-slideRight">
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <div className="w-4 h-4 border-2 border-white rotate-45" />
              </div>
              <h2 className="font-headline-md text-xl text-white font-bold tracking-tight uppercase">
                Lumina OS
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div className="backdrop-blur-md bg-white/5 rounded-2xl p-4 border border-white/10 mb-6 shadow-inner">
            <div className="flex justify-between items-center text-xs font-label-caps text-slate-400 mb-1">
              <span>Sanctuary Status</span>
              <span className="text-emerald-400 font-bold font-mono">{temperature}°F</span>
            </div>
            <p className="font-headline-md text-base text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Mode: {vibeName}
            </p>
          </div>

          {/* Nav links */}
          <nav className="space-y-2">
            {[
              { id: 'home', label: 'Home Dashboard', icon: 'home_max' },
              { id: 'media', label: 'Relaxing Media', icon: 'music_note' },
              { id: 'streaming', label: 'Streaming Services', icon: 'live_tv' },
              { id: 'settings', label: 'Sanctuary Settings', icon: 'settings' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body-md text-sm transition-all cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-indigo-400">{link.icon}</span>
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="text-[11px] font-label-caps text-slate-400/80 border-t border-white/10 pt-4 flex justify-between items-center">
          <span>Frosted Glass Protocol</span>
          <span className="text-indigo-400 font-mono text-[10px]">v2.5</span>
        </div>
      </div>
    </div>
  );
};

