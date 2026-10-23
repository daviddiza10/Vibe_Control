import React, { useState, useEffect } from 'react';
import { TopHeader } from './components/TopHeader';
import { Navigation } from './components/Navigation';
import { MiniPlayer } from './components/MiniPlayer';
import { HomeView } from './components/HomeView';
import { StreamingView } from './components/StreamingView';
import { MediaView } from './components/MediaView';
import { SettingsView } from './components/SettingsView';
import { DrawerMenu } from './components/DrawerMenu';
import { AddScheduleModal } from './components/AddScheduleModal';
import { AddPlatformModal } from './components/AddPlatformModal';
import { MediaPreviewModal } from './components/MediaPreviewModal';
import {
  VibeState,
  StreamingPlatform,
  ContinueWatchingItem,
  RecommendedItem,
  MediaSound,
  MediaTrending,
  VibeSchedule,
  UserProfile,
  ConnectivityState,
  PreferencesState,
} from './types';
import { audioService } from './lib/audioService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modals state
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isAddPlatformOpen, setIsAddPlatformOpen] = useState(false);
  const [previewMediaItem, setPreviewMediaItem] = useState<{
    title: string;
    subtitle: string;
    image: string;
  } | null>(null);

  // Data State from REST API Backend
  const [vibeStatus, setVibeStatus] = useState<VibeState>({
    vibeName: 'Chill',
    statusText: 'Sanctuary active.',
    temperature: 72,
    lightsEnabled: true,
    lightColorHex: '#00f0ff',
    selectedPreset: 'Chill',
    chairAcLevel: 75,
    chairAcMode: 'Cool',
    privacyGlassOpaque: true,
  });

  const [platforms, setPlatforms] = useState<StreamingPlatform[]>([]);
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>([]);
  const [recommended, setRecommended] = useState<RecommendedItem[]>([]);
  const [relaxingSounds, setRelaxingSounds] = useState<MediaSound[]>([]);
  const [trendingMedia, setTrendingMedia] = useState<MediaTrending[]>([]);
  const [schedules, setSchedules] = useState<VibeSchedule[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [connectivity, setConnectivity] = useState<ConnectivityState | null>(null);
  const [preferences, setPreferences] = useState<PreferencesState>({
    hapticFeedback: true,
    dataSync: 'Cloud',
  });

  // Current audio track state
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    subtitle: string;
    image: string;
    frequency?: number;
  } | null>({
    title: 'Lo-Fi Beats: Tokyo Midnight',
    subtitle: 'Focus & Chill Playlist',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpyMOFZoKvrYAy0KtQ6jzdhNvi7OUiullIaeOX7tkl1bL1Kw4w15oczMHsn1qw5UOKTdr6b5y2-bQztbolLmYqxMbzYYLPzafh3HlPrTugGUI3oHHjK8BnG6-gMWHBGrDi30M1k7PJtWPg_9TqAgubtAgfH3Qfh6TUIFth9jSQJwWLRCgHrxOih7VAlXpNvD8Xc1U383ovatmwlSrLxQPSjsknn3FqrCrWTMkjmAcVxdHZmsCqtrP8',
    frequency: 330,
  });

  // Fetch initial data from REST API Backend
  useEffect(() => {
    fetch('/api/vibe/status')
      .then((res) => res.json())
      .then((data) => setVibeStatus(data))
      .catch((err) => console.error('Error fetching vibe status:', err));

    fetch('/api/streaming/platforms')
      .then((res) => res.json())
      .then((data) => setPlatforms(data))
      .catch((err) => console.error('Error fetching platforms:', err));

    fetch('/api/streaming/continue-watching')
      .then((res) => res.json())
      .then((data) => setContinueWatching(data))
      .catch((err) => console.error('Error fetching continue watching:', err));

    fetch('/api/streaming/recommended')
      .then((res) => res.json())
      .then((data) => setRecommended(data))
      .catch((err) => console.error('Error fetching recommended:', err));

    fetch('/api/media/relaxing-sounds')
      .then((res) => res.json())
      .then((data) => setRelaxingSounds(data))
      .catch((err) => console.error('Error fetching relaxing sounds:', err));

    fetch('/api/media/trending')
      .then((res) => res.json())
      .then((data) => setTrendingMedia(data))
      .catch((err) => console.error('Error fetching trending media:', err));

    fetch('/api/settings/schedules')
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .catch((err) => console.error('Error fetching schedules:', err));

    fetch('/api/settings/profile')
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error('Error fetching profile:', err));

    fetch('/api/settings/connectivity')
      .then((res) => res.json())
      .then((data) => setConnectivity(data))
      .catch((err) => console.error('Error fetching connectivity:', err));

    fetch('/api/settings/preferences')
      .then((res) => res.json())
      .then((data) => setPreferences(data))
      .catch((err) => console.error('Error fetching preferences:', err));
  }, []);

  // Update Vibe status via PUT /api/vibe/status
  const handleUpdateVibe = async (updates: Partial<VibeState>) => {
    const updated = { ...vibeStatus, ...updates };
    setVibeStatus(updated);
    try {
      await fetch('/api/vibe/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error('Failed to update vibe status:', err);
    }
  };

  // Generate AI Vibe via POST /api/vibe/ai-generate
  const handleGenerateAiVibe = async (prompt: string) => {
    try {
      const res = await fetch('/api/vibe/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.fallbackVibe) {
        setVibeStatus((prev) => ({ ...prev, ...data.fallbackVibe }));
      } else {
        setVibeStatus((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('AI Vibe generation error:', err);
    }
  };

  // Schedule toggle
  const handleToggleSchedule = async (id: string, active: boolean) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active } : s))
    );
    try {
      await fetch(`/api/settings/schedules/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active }),
      });
    } catch (err) {
      console.error('Failed to toggle schedule:', err);
    }
  };

  // Add new schedule
  const handleSaveSchedule = async (newSchedule: {
    name: string;
    time: string;
    description: string;
  }) => {
    try {
      const res = await fetch('/api/settings/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchedule),
      });
      const data = await res.json();
      setSchedules((prev) => [...prev, data]);
    } catch (err) {
      console.error('Failed to add schedule:', err);
    }
  };

  // Add new streaming platform
  const handleSavePlatform = async (newPlatform: {
    name: string;
    url: string;
    color: string;
  }) => {
    try {
      const res = await fetch('/api/streaming/platforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlatform),
      });
      const data = await res.json();
      setPlatforms((prev) => [...prev, data]);
    } catch (err) {
      console.error('Failed to add platform:', err);
    }
  };

  // Select media track for playing
  const handleSelectTrack = (track: {
    title: string;
    subtitle: string;
    image: string;
    frequency?: number;
  }) => {
    setCurrentTrack(track);
    audioService.playSound(track.title, track.frequency || 300);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 relative font-body-md selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Decorative Mesh Background Lights for Frosted Glass Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-indigo-600/25 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[25%] right-[10%] w-[35vw] h-[35vw] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Header */}
      <TopHeader
        profile={profile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenMenu={() => setIsDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="pt-24 pb-28 md:pt-28 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto md:pl-28 transition-all">
        {activeTab === 'home' && (
          <HomeView
            vibeStatus={vibeStatus}
            onUpdateVibe={handleUpdateVibe}
            onGenerateAiVibe={handleGenerateAiVibe}
          />
        )}

        {activeTab === 'media' && (
          <MediaView
            relaxingSounds={relaxingSounds}
            trendingMedia={trendingMedia}
            currentTrackTitle={currentTrack?.title || ''}
            isPlaying={audioService.isPlaying}
            onSelectTrack={handleSelectTrack}
          />
        )}

        {activeTab === 'streaming' && (
          <StreamingView
            platforms={platforms}
            continueWatching={continueWatching}
            recommended={recommended}
            onAddPlatformClick={() => setIsAddPlatformOpen(true)}
            onPlayMedia={(item) => setPreviewMediaItem(item)}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            profile={profile}
            schedules={schedules}
            connectivity={connectivity}
            preferences={preferences}
            onToggleSchedule={handleToggleSchedule}
            onAddScheduleClick={() => setIsAddScheduleOpen(true)}
            onTogglePreferences={(updates) => {
              setPreferences((prev) => ({ ...prev, ...updates }));
              fetch('/api/settings/preferences', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
              });
            }}
          />
        )}
      </main>

      {/* Persistent Mini Audio Player */}
      <MiniPlayer currentTrack={currentTrack} />

      {/* Responsive Navigation Bar */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Drawer Menu */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        vibeName={vibeStatus.vibeName}
        temperature={vibeStatus.temperature}
      />

      {/* Add Schedule Modal */}
      <AddScheduleModal
        isOpen={isAddScheduleOpen}
        onClose={() => setIsAddScheduleOpen(false)}
        onSave={handleSaveSchedule}
      />

      {/* Add Platform Modal */}
      <AddPlatformModal
        isOpen={isAddPlatformOpen}
        onClose={() => setIsAddPlatformOpen(false)}
        onSave={handleSavePlatform}
      />

      {/* Media Preview Modal */}
      <MediaPreviewModal
        item={previewMediaItem}
        onClose={() => setPreviewMediaItem(null)}
      />
    </div>
  );
}
