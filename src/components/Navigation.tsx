import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home_max' },
    { id: 'media', label: 'Media', icon: 'music_note' },
    { id: 'streaming', label: 'Streaming', icon: 'live_tv' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 backdrop-blur-xl bg-slate-900/80 border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-4 pb-safe md:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all active:scale-90 duration-150 cursor-pointer rounded-xl ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className="font-label-caps text-[10px] mt-1">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Side Navigation Bar Overlay */}
      <aside className="hidden md:flex fixed top-[72px] bottom-0 left-0 w-20 flex-col items-center py-8 gap-6 border-r border-white/10 bg-white/5 backdrop-blur-xl z-40">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              title={tab.label}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all active:scale-90 duration-150 cursor-pointer ${
                isActive
                  ? 'text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
            </button>
          );
        })}
      </aside>
    </>
  );
};

