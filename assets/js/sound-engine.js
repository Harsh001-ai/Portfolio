/**
 * ==============================================================================
 * LIGHTWEIGHT WEB AUDIO INTERACTION ENGINE
 * ==============================================================================
 * Design Direction Four: Subtle, non-intrusive sound effects.
 * 
 * Features:
 * - 100% synthesized via Web Audio API (zero external audio files or network requests)
 * - Default: OFF (strict no-autoplay compliance)
 * - User toggleable via the header button with localStorage memory
 * - Only triggers on meaningful interaction events (chapter transitions, UI clicks)
 * ==============================================================================
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isSoundEnabled = false;

  // Retrieve saved preference or default to false
  try {
    isSoundEnabled = localStorage.getItem('AV_SOUND_ENABLED') === 'true';
  } catch (e) {
    isSoundEnabled = false;
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Soft tactile UI click
  function playClick() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }

  // Ethereal Harmonic Chime for Chapter Transitions
  function playChapterChime(index = 0) {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Pentatonic scale frequencies
      const scale = [440, 523.25, 587.33, 659.25, 783.99];
      const freq = scale[index % scale.length] || 523.25;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  // Energy Portal Resonance Swell
  function playPortalPulse() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  }

  // Initialize UI Sound Toggle
  function initSoundToggle() {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;

    function updateBtnUI() {
      if (isSoundEnabled) {
        btn.classList.add('sound-active');
        btn.innerHTML = `
          <span class="sound-wave-icon active">
            <span></span><span></span><span></span>
          </span>
          <span class="sound-label">SOUND: ON</span>
        `;
      } else {
        btn.classList.remove('sound-active');
        btn.innerHTML = `
          <span class="sound-wave-icon">
            <span></span><span></span><span></span>
          </span>
          <span class="sound-label">SOUND: OFF</span>
        `;
      }
    }

    updateBtnUI();

    btn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      try {
        localStorage.setItem('AV_SOUND_ENABLED', isSoundEnabled ? 'true' : 'false');
      } catch (e) {}

      if (isSoundEnabled) {
        getAudioContext();
        playClick();
      }
      updateBtnUI();
    });
  }

  // Expose global interface
  window.AV_SOUND = {
    isEnabled: () => isSoundEnabled,
    playClick,
    playChapterChime,
    playPortalPulse
  };

  document.addEventListener('DOMContentLoaded', initSoundToggle);
})();
