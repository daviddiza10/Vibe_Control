export interface VibeState {
  vibeName: string;
  statusText: string;
  temperature: number; // e.g. 72
  lightsEnabled: boolean;
  lightColorHex: string; // e.g. "#00f0ff"
  selectedPreset: 'Neon' | 'Chill' | 'Study' | string;
  chairAcLevel: number; // 0 to 100
  chairAcMode: string; // e.g. "Cool"
  privacyGlassOpaque: boolean;
}

export interface StreamingPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  url?: string;
}

export interface ContinueWatchingItem {
  id: string;
  title: string;
  subtitle: string;
  progressPercent: number;
  bgImage: string;
  videoUrl?: string;
}

export interface RecommendedItem {
  id: string;
  title: string;
  genre: string;
  image: string;
}

export interface MediaSound {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  audioFrequency?: number; // synth sound pitch
  isPlaying?: boolean;
  category: 'relaxing' | 'trending';
}

export interface MediaTrending {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
  image: string;
  featured?: boolean;
}

export interface VibeSchedule {
  id: string;
  name: string;
  time: string;
  description: string;
  active: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  membership: string;
  avatarUrl: string;
}

export interface ConnectivityState {
  wifiNetwork: string;
  bluetoothCount: number;
}

export interface PreferencesState {
  hapticFeedback: boolean;
  dataSync: 'Cloud' | 'Local';
}
