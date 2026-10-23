import React, { useState } from 'react';

interface AddPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (platform: { name: string; url: string; color: string }) => void;
}

export const AddPlatformModal: React.FC<AddPlatformModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('#6366f1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name,
      url: url || 'https://example.com',
      color,
    });
    setName('');
    setUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-white/15 shadow-2xl relative bg-slate-900/80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline-md text-xl text-white font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">add_circle</span>
            Add Streaming Platform
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Platform Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Disney+, Hulu, Spotify"
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Platform URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Accent Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 bg-slate-950/60 border border-white/10 rounded-xl p-1 cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-mono bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400/40"
            >
              Add Platform
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

