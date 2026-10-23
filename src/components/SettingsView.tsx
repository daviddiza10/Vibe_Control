import React from 'react';
import {
  UserProfile,
  VibeSchedule,
  ConnectivityState,
  PreferencesState,
} from '../types';

interface SettingsViewProps {
  profile: UserProfile | null;
  schedules: VibeSchedule[];
  connectivity: ConnectivityState | null;
  preferences: PreferencesState;
  onToggleSchedule: (id: string, active: boolean) => void;
  onAddScheduleClick: () => void;
  onTogglePreferences: (updates: Partial<PreferencesState>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  schedules,
  connectivity,
  preferences,
  onToggleSchedule,
  onAddScheduleClick,
  onTogglePreferences,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-24">
      {/* Profile Card */}
      <section className="glass-card rounded-3xl p-6 flex items-center gap-6 border border-white/10 shadow-xl">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-indigo-400 glow-primary shrink-0 shadow-lg">
          <img
            src={
              profile?.avatarUrl ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuD1HVDIeb51MZua63IcwqwvYMtJMlhydqjOSuIuYdynifI5PXRAZk8ShWwsdU3hhlNuHneba5aowzYcMRsHXqI6u4tGm8VvnFiPMGAEi8AWcLtA_bOPhAGQpufzXIarfcOa9WDoaezLgIjjR6JpII-h6FPP1J1Wf4dyemi5TWVvJmV_CiozZsHWrBfrlcyvT0KfVNUIuSElhE3U60-N8knaG8hFmjFC5O5d4ITY5yk1_Fcy457hvhTb'
            }
            alt={profile?.name || 'User Profile'}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h2 className="font-headline-lg-mobile md:text-2xl text-white font-bold mb-1 tracking-tight">
            {profile?.name || 'Alex Chen'}
          </h2>
          <p className="font-body-md text-slate-300 text-sm mb-3">
            {profile?.email || 'alex.chen@vibecontrol.net'}
          </p>
          <span className="inline-block bg-indigo-500/20 text-indigo-300 font-mono text-xs px-3 py-1 rounded-full border border-indigo-500/30 font-bold">
            {profile?.membership || 'Pro Member'}
          </span>
        </div>
      </section>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vibe Schedules */}
        <section className="glass-card rounded-3xl p-6 flex flex-col h-full border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="material-symbols-outlined text-indigo-400 text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              schedule
            </span>
            <h3 className="font-headline-md text-lg text-white font-bold">
              Vibe Schedules
            </h3>
          </div>

          <div className="space-y-3 flex-1">
            {schedules.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5"
              >
                <div>
                  <p className="font-body-lg text-slate-100 font-semibold text-sm md:text-base">
                    {s.name}
                  </p>
                  <p className="font-body-md text-slate-400 text-xs mt-0.5">
                    {s.time} • {s.description}
                  </p>
                </div>

                <button
                  onClick={() => onToggleSchedule(s.id, !s.active)}
                  className={`w-12 h-6 rounded-full transition-all relative cursor-pointer border ${
                    s.active
                      ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]'
                      : 'bg-slate-800 border-white/10'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      s.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onAddScheduleClick}
            className="mt-6 w-full py-3 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all rounded-xl font-label-caps text-xs border border-indigo-500/30 flex items-center justify-center gap-2 font-bold cursor-pointer active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> Add Schedule
          </button>
        </section>

        {/* Connectivity & Preferences */}
        <div className="space-y-6 flex flex-col">
          {/* Connectivity */}
          <section className="glass-card rounded-3xl p-6 flex-1 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="material-symbols-outlined text-emerald-400 text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                router
              </span>
              <h3 className="font-headline-md text-lg text-white font-bold">
                Connectivity
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-400">wifi</span>
                  <span className="font-body-md text-slate-200 text-sm font-medium">
                    Wi-Fi Network
                  </span>
                </div>
                <span className="font-mono text-slate-300 text-xs">
                  {connectivity?.wifiNetwork || 'Vibe_Net_5G'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-400">bluetooth</span>
                  <span className="font-body-md text-slate-200 text-sm font-medium">
                    Bluetooth Links
                  </span>
                </div>
                <span className="font-mono text-slate-300 text-xs">
                  {connectivity?.bluetoothCount || 3} Devices
                </span>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="glass-card rounded-3xl p-6 flex-1 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="material-symbols-outlined text-purple-400 text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                tune
              </span>
              <h3 className="font-headline-md text-lg text-white font-bold">
                Preferences
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-slate-200 text-sm font-medium">
                  Haptic Feedback
                </span>
                <button
                  onClick={() =>
                    onTogglePreferences({ hapticFeedback: !preferences.hapticFeedback })
                  }
                  className={`w-12 h-6 rounded-full transition-all relative cursor-pointer border ${
                    preferences.hapticFeedback
                      ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]'
                      : 'bg-slate-800 border-white/10'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      preferences.hapticFeedback ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-body-md text-slate-200 text-sm font-medium">
                  Data Sync
                </span>
                <button
                  onClick={() =>
                    onTogglePreferences({
                      dataSync: preferences.dataSync === 'Cloud' ? 'Local' : 'Cloud',
                    })
                  }
                  className="font-mono text-slate-300 text-xs flex items-center gap-1 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {preferences.dataSync}{' '}
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

