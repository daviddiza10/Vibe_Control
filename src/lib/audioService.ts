// Web Audio Synth for ambient sound playback in VibeControl
class AudioService {
  private audioCtx: AudioContext | null = null;
  private currentOscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  public isPlaying = false;
  public currentTrackTitle = "";

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public playSound(title: string, frequency = 220) {
    this.stopSound();
    this.initContext();
    if (!this.audioCtx) return;

    this.isPlaying = true;
    this.currentTrackTitle = title;

    if (title.toLowerCase().includes("rain") || title.toLowerCase().includes("noise")) {
      // Generate pink noise for rain/white noise
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.15, this.audioCtx.currentTime);

      this.noiseNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.noiseNode.start();
    } else {
      // Soft warm synth tone for lo-fi / synthwave
      this.currentOscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.currentOscillator.type = "sine";
      this.currentOscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      // Low pass filter for warm lo-fi tone
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);

      this.gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);

      this.currentOscillator.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.currentOscillator.start();
    }
  }

  public stopSound() {
    if (this.currentOscillator) {
      try { this.currentOscillator.stop(); } catch (e) {}
      this.currentOscillator.disconnect();
      this.currentOscillator = null;
    }
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch (e) {}
      this.noiseNode.disconnect();
      this.noiseNode = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    this.isPlaying = false;
  }

  public togglePlayPause(title: string, frequency?: number) {
    if (this.isPlaying && this.currentTrackTitle === title) {
      this.stopSound();
      return false;
    } else {
      this.playSound(title, frequency);
      return true;
    }
  }
}

export const audioService = new AudioService();
