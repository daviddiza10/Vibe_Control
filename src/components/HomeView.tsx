import React, { useState } from 'react';
import { VibeState } from '../types';

interface HomeViewProps {
  vibeStatus: VibeState;
  onUpdateVibe: (updates: Partial<VibeState>) => void;
  onGenerateAiVibe?: (prompt: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  vibeStatus,
  onUpdateVibe,
  onGenerateAiVibe,
}) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const colorsList = [
    '#6366f1', // Indigo Accent
    '#10b981', // Emerald Active
    '#a855f7', // Purple Glow
    '#00f0ff', // Cyan Neon
    '#f43f5e', // Rose Accent
    '#f59e0b', // Amber Warm
  ];

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || !onGenerateAiVibe) return;
    setIsGenerating(true);
    await onGenerateAiVibe(aiPrompt);
    setIsGenerating(false);
    setAiPrompt('');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      {/* Hero Visual */}
      <section className="w-full rounded-3xl overflow-hidden relative h-52 md:h-64 glass-panel border border-white/10 group shadow-2xl">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXjnxOlPwdlwpuSjsSAby4A5hFsGOIKX0z0txaKd8dnSP7-IG7boodPFe3idfHC38fE17aFeWwVcSUBfEm0kE9GkhfaliNu5DnoU1VKn7SwGuY12NtJyAWUvY3G2R2ObAS6SN52LzoTXCapNKLvzPu0TAlN1jipf4GdoSP3_Fcd5szxAux8Z1X6_ywmic9jThzKWKod1j9cXhwvzzS-iKPfVNkwnWu-aFN6HgRQi-zaX5A-uWr_j5')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4 z-10">
          <div>
            <div className="text-[10px] font-mono text-indigo-300 uppercase tracking-[0.2em] mb-1">
              Sanctuary Gateway • Node Operational
            </div>
            <h2 className="font-headline-lg-mobile md:text-3xl text-white font-bold tracking-tight">
              Vibe: <span className="text-indigo-300">{vibeStatus.vibeName}</span>
            </h2>
            <p className="font-body-md text-slate-300 text-sm mt-1">{vibeStatus.statusText}</p>
          </div>

          {/* Temperature Control Badge */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-lg">
            <span className="material-symbols-outlined text-emerald-400 text-xl">
              thermostat
            </span>
            <button
              onClick={() => onUpdateVibe({ temperature: Math.max(60, vibeStatus.temperature - 1) })}
              className="text-slate-300 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer active:scale-90 transition-colors font-bold"
              title="Decrease temp"
            >
              -
            </button>
            <span className="font-mono text-base text-emerald-400 font-bold">
              {vibeStatus.temperature}°F
            </span>
            <button
              onClick={() => onUpdateVibe({ temperature: Math.min(85, vibeStatus.temperature + 1) })}
              className="text-slate-300 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer active:scale-90 transition-colors font-bold"
              title="Increase temp"
            >
              +
            </button>
          </div>
        </div>
      </section>

      {/* AI Atmosphere Generator Bar */}
      <form
        onSubmit={handleAiSubmit}
        className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 border border-white/10 shadow-lg"
      >
        <div className="flex items-center gap-2 text-indigo-400 shrink-0">
          <span className="material-symbols-outlined text-lg">auto_awesome</span>
          <span className="font-label-caps text-xs uppercase font-bold text-slate-200">
            AI Vibe Generator
          </span>
        </div>
        <input
          type="text"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="e.g. Cyberpunk rain, cozy studio session, deep focus neon..."
          className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
        />
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full sm:w-auto shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-label-caps text-xs px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Apply Vibe'}
        </button>
      </form>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Ambient Lighting Card */}
        <section className="md:col-span-8 glass-panel rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Toggle */}
          <div className="flex justify-between items-center z-10">
            <h3 className="font-label-caps text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-indigo-400">lightbulb</span> Ambient Lighting
            </h3>
            <button
              onClick={() => onUpdateVibe({ lightsEnabled: !vibeStatus.lightsEnabled })}
              className={`w-12 h-6 rounded-full transition-all relative cursor-pointer border ${
                vibeStatus.lightsEnabled
                  ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)]'
                  : 'bg-slate-800 border-white/10'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  vibeStatus.lightsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center z-10 mt-2">
            {/* Color Wheel / Picker */}
            <div
              className={`w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-slate-700/50 relative flex items-center justify-center transition-all ${
                vibeStatus.lightsEnabled ? 'glow-primary' : 'opacity-40'
              }`}
              style={{
                background:
                  'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
              }}
            >
              <div className="w-28 h-28 md:w-34 md:h-34 rounded-full bg-slate-900/90 flex items-center justify-center border-2 border-white/10 shadow-inner">
                <div
                  className="w-16 h-16 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: vibeStatus.lightsEnabled ? vibeStatus.lightColorHex : '#334155',
                    boxShadow: vibeStatus.lightsEnabled
                      ? `0 0 25px ${vibeStatus.lightColorHex}`
                      : 'none',
                  }}
                />
              </div>
            </div>

            {/* Quick Color Swatches & Mood Presets */}
            <div className="flex-1 w-full space-y-4">
              {/* Color Swatches */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                {colorsList.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      onUpdateVibe({ lightColorHex: color, lightsEnabled: true })
                    }
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer active:scale-90 ${
                      vibeStatus.lightColorHex === color
                        ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>

              {/* Mood Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() =>
                    onUpdateVibe({
                      lightColorHex: '#6366f1',
                      selectedPreset: 'Neon',
                      vibeName: 'Neon Energy',
                      statusText: 'High energy active.',
                      lightsEnabled: true,
                    })
                  }
                  className={`border rounded-xl p-3 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    vibeStatus.selectedPreset === 'Neon'
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-indigo-400">bolt</span>
                  <span className="font-body-md text-sm font-semibold">Neon</span>
                </button>

                <button
                  onClick={() =>
                    onUpdateVibe({
                      lightColorHex: '#a855f7',
                      selectedPreset: 'Chill',
                      vibeName: 'Chill',
                      statusText: 'Sanctuary active.',
                      lightsEnabled: true,
                    })
                  }
                  className={`border rounded-xl p-3 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    vibeStatus.selectedPreset === 'Chill'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-purple-400">nightlight</span>
                  <span className="font-body-md text-sm font-semibold">Chill</span>
                </button>

                <button
                  onClick={() =>
                    onUpdateVibe({
                      lightColorHex: '#10b981',
                      selectedPreset: 'Study',
                      vibeName: 'Focus Mode',
                      statusText: 'Optimal concentration.',
                      lightsEnabled: true,
                    })
                  }
                  className={`border rounded-xl p-3 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    vibeStatus.selectedPreset === 'Study'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-emerald-400">menu_book</span>
                  <span className="font-body-md text-sm font-semibold">Study</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column Controls */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Chair AC Card */}
          <section className="glass-panel rounded-3xl p-6 flex flex-col gap-4 border border-white/10">
            <h3 className="font-label-caps text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-indigo-400">chair</span> Chair AC
            </h3>

            <div className="flex flex-col items-center py-2">
              <span className="font-headline-md text-2xl text-white mb-2 font-bold font-mono">
                {vibeStatus.chairAcMode} ({vibeStatus.chairAcLevel}%)
              </span>

              {/* Slider */}
              <div className="w-full relative py-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vibeStatus.chairAcLevel}
                  onChange={(e) =>
                    onUpdateVibe({ chairAcLevel: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>

              <div className="w-full flex justify-between text-slate-400 text-xs font-mono">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </section>

          {/* Privacy Glass Card */}
          <section className="glass-panel rounded-3xl p-6 flex flex-col gap-4 justify-between flex-1 border border-white/10">
            <div className="flex justify-between items-start">
              <h3 className="font-label-caps text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-indigo-400">blinds</span> Privacy Glass
              </h3>
              <button
                onClick={() =>
                  onUpdateVibe({ privacyGlassOpaque: !vibeStatus.privacyGlassOpaque })
                }
                className={`w-12 h-6 rounded-full transition-all relative cursor-pointer border ${
                  vibeStatus.privacyGlassOpaque
                    ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)]'
                    : 'bg-slate-800 border-white/10'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    vibeStatus.privacyGlassOpaque ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="w-16 h-16 rounded-2xl border border-white/15 bg-slate-900/60 flex items-center justify-center relative overflow-hidden shrink-0 shadow-inner">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
                <span className="material-symbols-outlined text-indigo-400 z-10 text-[32px]">
                  {vibeStatus.privacyGlassOpaque ? 'visibility_off' : 'visibility'}
                </span>
              </div>
              <div>
                <p className="font-headline-md text-xl text-white font-bold">
                  {vibeStatus.privacyGlassOpaque ? 'Opaque' : 'Transparent'}
                </p>
                <p className="font-body-md text-slate-400 text-xs">
                  {vibeStatus.privacyGlassOpaque ? 'Maximum privacy' : 'Open view'}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
