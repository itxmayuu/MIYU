// Sistema de audio y feedback táctil (Web Audio API + Síntesis de voz)
class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.speechEnabled = true;
    this.soundEnabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq, duration = 0.15, type = 'sine', volume = 0.3) {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  // Cuenta atrás: 3, 2, 1
  playCountdown() {
    this.playTone(587.33, 0.12, 'sine', 0.25); // D5
    this.vibrate(50);
  }

  // Cambio de ejercicio (tono agudo doble)
  playNext() {
    this.playTone(880, 0.12, 'triangle', 0.4); // A5
    setTimeout(() => {
      this.playTone(1174.66, 0.25, 'triangle', 0.4); // D6
    }, 120);
    this.vibrate([100, 50, 150]);
  }

  // Rutina finalizada con éxito (fanfarria breve)
  playComplete() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.2, 'triangle', 0.35);
      }, idx * 130);
    });
    this.vibrate([150, 80, 150, 80, 300]);
  }

  vibrate(pattern) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  speak(text) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Detener anteriores
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }
}

export const sounds = new SoundManager();
