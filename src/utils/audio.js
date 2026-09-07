/**
 * Synthetic Web Audio API Engine
 * Generates tactile, high-frequency subtle clicks (8-12ms sine/wood ticks)
 * with zero external audio assets.
 */

let audioCtx = null;
let isMuted = false;

// Initialize mute state from localStorage if available
try {
  const savedMute = localStorage.getItem('editorial_portfolio_muted');
  if (savedMute !== null) {
    isMuted = JSON.parse(savedMute);
  }
} catch (e) {
  isMuted = false;
}

const listeners = new Set();

export function getAudioMuted() {
  return isMuted;
}

export function setAudioMuted(muted) {
  isMuted = muted;
  try {
    localStorage.setItem('editorial_portfolio_muted', JSON.stringify(muted));
  } catch (e) {}
  listeners.forEach((fn) => fn(isMuted));
}

export function toggleAudioMuted() {
  setAudioMuted(!isMuted);
  if (!isMuted) {
    playTactileClick('soft');
  }
  return isMuted;
}

export function subscribeAudioState(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a synthetic tactile click
 * @param {'soft' | 'snap' | 'success' | 'forbidden'} type
 */
export function playTactileClick(type = 'soft') {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'soft') {
      // 8ms subtle sine tick (1200Hz -> 400Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.009);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.009);

      osc.start(now);
      osc.stop(now + 0.01);
    } else if (type === 'snap') {
      // 12ms woody tab snap (900Hz -> 200Hz)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.014);

      gain.gain.setValueAtTime(0.055, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

      osc.start(now);
      osc.stop(now + 0.015);
    } else if (type === 'success') {
      // Double harmonic bell chirp
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.035);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === 'forbidden') {
      // Low dual thud for zero-trust 403
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // Gracefully ignore audio errors
  }
}
