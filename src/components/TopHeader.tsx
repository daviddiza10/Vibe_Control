import React from 'react';
import { UserProfile } from '../types';

interface TopHeaderProps {
  profile: UserProfile | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  profile,
  activeTab,
  onTabChange,
  onOpenMenu,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-none flex justify-between items-center px-4 md:px-6 py-4 h-[72px]">
      {/* Menu Button */}
      <button
        onClick={onOpenMenu}
        aria-label="Open Navigation Drawer"
        className="text-slate-200 active:scale-95 duration-200 hover:bg-white/10 transition-colors p-2 rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer border border-white/10"
      >
        <span className="material-symbols-outlined text-indigo-400">menu</span>
      </button>

      {/* Center Brand */}
      <div 
        onClick={() => onTabChange('home')}
        className="flex items-center gap-3 cursor-pointer select-none"
      >
        <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
          <div className="w-4 h-4 border-2 border-white rotate-45" />
        </div>
        <div className="flex flex-col">
          <span className="font-headline-md text-lg md:text-xl text-white font-bold tracking-tight">
            VibeControl
          </span>
          <span className="font-label-caps text-[9px] text-indigo-300 uppercase tracking-widest hidden sm:inline">
            Sanctuary OS
          </span>
        </div>
      </div>

      {/* Status Badge & Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-3 py-1 items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest">Active</span>
        </div>

        <button
          onClick={() => onTabChange('settings')}
          aria-label="User Settings"
          className="active:scale-95 duration-200 hover:bg-white/10 transition-colors rounded-xl overflow-hidden w-10 h-10 border border-white/20 cursor-pointer flex items-center justify-center bg-indigo-500/10 shadow-md"
        >
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="material-symbols-outlined text-indigo-300">account_circle</span>
          )}
        </button>
      </div>
    </header>
  );
};

