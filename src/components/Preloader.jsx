import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Activity, 
  Wifi, 
  RotateCcw, 
  X, 
  Sparkles, 
  Check,
  Disc,
  Split,
  ArrowUp
} from 'lucide-react';
import './Preloader.css';

// J.A.R.V.I.S. Mark-85 Suit and Developer Arsenal
const JARVIS_SUIT_DIAGNOSTICS = [
  { label: 'NEURAL LINK INTERFACE', state: 'ONLINE', icon: '⚡' },
  { label: 'NEXT.JS 15 & NESTJS ARSENAL', state: 'ARMED', icon: '🛡️' },
  { label: '.NET 9 ENTERPRISE BACKEND', state: 'NOMINAL', icon: '🔷' },
  { label: 'REACT NATIVE (EXPO SUIT)', state: 'CALIBRATED', icon: '📱' },
  { label: 'THREE.JS 3D HUD RENDERER', state: 'MOUNTED', icon: '🌐' }
];

const getJarvisDialogue = (prog) => {
  if (prog < 25) return "Good evening, sir. Arc Reactor core online. Initializing diagnostic sweeps.";
  if (prog < 55) return "Scanning developer credentials... Mico Gianan clearance confirmed at Level 9.";
  if (prog < 85) return "Arming full-stack suite: Next.js, NestJS microservices, and .NET Framework.";
  if (prog < 100) return "Calibrating 3D Cosmic scrollytelling telemetry... trajectory locked on target.";
  return "All systems nominal. At your service, sir. Welcome back.";
};

export default function Preloader({
  exitStyle = 'iris', // 'iris' | 'shutter' | 'curtain'
  initialPaused = false,
  onExitStyleChange,
  onComplete,
}) {
  const [progress, setProgress] = useState(initialPaused ? 75 : 0);
  const [isPaused, setIsPaused] = useState(initialPaused);
  const [isExiting, setIsExiting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    initialPaused ? 'PREVIEW MODE // ANIMATION FROZEN FOR INSPECTION' : 'J.A.R.V.I.S.: ARC REACTOR CORE ONLINE (400% CAPACITY)...'
  );
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const isCompletedRef = useRef(false);
  const pausedProgressRef = useRef(progress);

  useEffect(() => {
    pausedProgressRef.current = progress;
  }, [progress]);

  // Phased, silky-smooth exit animation
  const handleExit = useCallback(() => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    setIsExiting(true);

    // Duration synchronized with each closing CSS animation to guarantee zero pop
    let exitDuration = 550;
    if (exitStyle === 'shutter') exitDuration = 580;
    if (exitStyle === 'curtain') exitDuration = 540;

    setTimeout(() => {
      if (onComplete) onComplete();
    }, exitDuration);
  }, [exitStyle, onComplete]);

  // Fast-forward / Skip handler
  const handleSkip = useCallback(() => {
    setProgress(100);
    setStatusMessage('J.A.R.V.I.S.: OVERRIDE ACCEPTED. LAUNCHING VIEWPORT...');
    setTimeout(handleExit, 100);
  }, [handleExit]);

  // Keyboard shortcut listener (Escape to skip, Space to fast-forward, P to pause)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleSkip();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setProgress((prev) => Math.min(100, prev + 25));
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Ensure body scroll is locked while preloader is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Progressive loading loop with pause support
  useEffect(() => {
    if (isPaused) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let targetDuration = 2400; // Comfortable pacing
    startTimeRef.current = performance.now() - (pausedProgressRef.current / 100) * targetDuration;

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setProgress((prev) => Math.max(prev, 35));
      });
    }

    const step = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const linearProgress = Math.min(100, (elapsed / targetDuration) * 100);

      let curved;
      if (linearProgress < 40) {
        curved = linearProgress * 1.25;
      } else if (linearProgress < 85) {
        curved = 50 + (linearProgress - 40) * 0.9;
      } else {
        curved = 90.5 + (linearProgress - 85) * 0.63;
      }

      const nextVal = Math.min(100, Math.round(curved));
      setProgress((prev) => Math.max(prev, nextVal));

      if (nextVal < 25) {
        setStatusMessage('J.A.R.V.I.S.: ARC REACTOR CORE ONLINE (400% CAPACITY)...');
      } else if (nextVal < 55) {
        setStatusMessage('J.A.R.V.I.S.: SCANNING DEVELOPER CLEARANCE [MICO GIANAN]...');
      } else if (nextVal < 85) {
        setStatusMessage('J.A.R.V.I.S.: ARMING FULL-STACK SUITE (NEXT.JS, NESTJS, .NET)...');
      } else if (nextVal < 100) {
        setStatusMessage('J.A.R.V.I.S.: CALIBRATING MARK 85 RUNTIME & THREE.JS HUD...');
      } else {
        setStatusMessage('J.A.R.V.I.S.: ALL SYSTEMS NOMINAL. AT YOUR SERVICE, SIR.');
      }

      if (linearProgress < 100) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setProgress(100);
        setTimeout(handleExit, 250);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleExit, isPaused]);

  const exitClass = isExiting 
    ? (exitStyle === 'shutter' ? 'exiting-shutter' : exitStyle === 'curtain' ? 'exiting-curtain' : 'exiting-iris') 
    : '';

  return (
    <div 
      className={`preloader-overlay exit-style-${exitStyle} ${exitClass}`}
      role="dialog"
      aria-modal="true"
      aria-label="J.A.R.V.I.S. Portfolio Loading Screen"
    >
      {/* Background Subtle Grid Texture */}
      <div className="preloader-bg-grid" aria-hidden="true" />

      {/* Shutter Panels for Exit Style 2 (Dual Horizon Split) */}
      {exitStyle === 'shutter' && (
        <>
          <div className="jarvis-shutter-panel jarvis-shutter-top" aria-hidden="true" />
          <div className="jarvis-shutter-panel jarvis-shutter-bottom" aria-hidden="true" />
          <div className="jarvis-shutter-laser" aria-hidden="true" />
        </>
      )}

      {/* =========================================================================
          TOP BAR: Identification + Closing Animation Switcher
          ========================================================================= */}
      <header className="preloader-topbar">
        <div className="preloader-brand-tag">
          <div className="preloader-live-beacon" title="Arc Core Operational" />
          <div>
            <div className="preloader-brand-title">MICO GIANAN</div>
            <div className="preloader-brand-coords">
              STARK INDUSTRIES // J.A.R.V.I.S. PROTOCOL v4.2
            </div>
          </div>
        </div>

        {/* Closing Animation Switcher Controls */}
        <div className="preloader-controls">
          <div className="preloader-switcher-pill" role="group" aria-label="Choose Closing Animation Style">
            <button
              type="button"
              className={`preloader-mode-btn ${exitStyle === 'iris' ? 'active' : ''}`}
              onClick={() => onExitStyleChange && onExitStyleChange('iris')}
              aria-pressed={exitStyle === 'iris'}
              aria-label="Switch Closing Animation to Arc Iris Aperture"
              title="Style 1: Holographic Arc-Reactor Aperture"
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Arc Iris</span>
            </button>
            <button
              type="button"
              className={`preloader-mode-btn ${exitStyle === 'shutter' ? 'active' : ''}`}
              onClick={() => onExitStyleChange && onExitStyleChange('shutter')}
              aria-pressed={exitStyle === 'shutter'}
              aria-label="Switch Closing Animation to Dual Shutter Split"
              title="Style 2: Dual Horizon Shutter Split"
            >
              <Split className="w-3.5 h-3.5" />
              <span>Shutter Split</span>
            </button>
            <button
              type="button"
              className={`preloader-mode-btn ${exitStyle === 'curtain' ? 'active' : ''}`}
              onClick={() => onExitStyleChange && onExitStyleChange('curtain')}
              aria-pressed={exitStyle === 'curtain'}
              aria-label="Switch Closing Animation to Editorial Curtain Lift"
              title="Style 3: Editorial Parallax Curtain Lift"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Curtain Lift</span>
            </button>
          </div>

          {/* Pause / Resume Button for detailed inspection */}
          <button
            type="button"
            className="preloader-skip-btn"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume Animation' : 'Pause Animation to Inspect'}
            title={isPaused ? 'Resume Animation' : 'Pause Animation'}
          >
            <span>{isPaused ? '▶ Resume' : '⏸ Pause'}</span>
            <kbd className="preloader-skip-kbd">P</kbd>
          </button>

          {/* Quick Skip Button */}
          <button
            type="button"
            className="preloader-skip-btn"
            onClick={handleSkip}
            aria-label="Trigger Closing Animation and Enter Portfolio (or press Escape)"
            title="Trigger Closing Animation"
          >
            <span>Test Close</span>
            <kbd className="preloader-skip-kbd">Esc</kbd>
          </button>
        </div>
      </header>

      {/* =========================================================================
          J.A.R.V.I.S. HUD CONTENT STAGE (HIGH TECHNICAL DENSITY)
          ========================================================================= */}
      <div className="preloader-content-wrap">
        <main className="jarvis-hud-stage">
          {/* Corner HUD Brackets for Stark Optical Targeting */}
          <div className="jarvis-corner-bracket jarvis-bracket-tl" aria-hidden="true" />
          <div className="jarvis-corner-bracket jarvis-bracket-tr" aria-hidden="true" />
          <div className="jarvis-corner-bracket jarvis-bracket-bl" aria-hidden="true" />
          <div className="jarvis-corner-bracket jarvis-bracket-br" aria-hidden="true" />

          {/* Left Column: Stack of Dual Holographic Stark Cards */}
          <div className="jarvis-side-col">
            {/* Card 1: Arc Reactor Energy Metrics */}
            <div className="jarvis-holo-card">
              <div className="jarvis-card-header">
                <div className="jarvis-card-title">
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>ARC CORE MK-85</span>
                </div>
                <span className="jarvis-card-badge gold">400% CAP</span>
              </div>
              <div className="jarvis-metric-row">
                <span>OUTPUT:</span>
                <span className="jarvis-metric-val highlight">3.2 GIGA-JOULES</span>
              </div>
              <div className="jarvis-metric-row">
                <span>CORE TEMP:</span>
                <span className="jarvis-metric-val">31.4° C [NOMINAL]</span>
              </div>
              <div className="jarvis-metric-row">
                <span>MAGNETIC FLUX:</span>
                <span className="jarvis-metric-val highlight">99.98%</span>
              </div>
              <div className="jarvis-metric-row">
                <span>VOLTAGE BUS:</span>
                <span className="jarvis-metric-val emerald">142.6 kV [STABLE]</span>
              </div>
              <div className="jarvis-metric-row">
                <span>CLEARANCE:</span>
                <span className="jarvis-metric-val gold">MICO GIANAN // LVL 9</span>
              </div>
            </div>

            {/* Card 2: Neural Bus & Computing Matrix */}
            <div className="jarvis-holo-card">
              <div className="jarvis-card-header">
                <div className="jarvis-card-title">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>NEURAL BUS & COMPUTE</span>
                </div>
                <span className="jarvis-card-badge emerald">16 THREADS</span>
              </div>
              <div className="jarvis-metric-row">
                <span>BUS ARCHITECTURE:</span>
                <span className="jarvis-metric-val">128-BIT FIBER LINK</span>
              </div>
              <div className="jarvis-metric-row">
                <span>BUFFER LATENCY:</span>
                <span className="jarvis-metric-val highlight">0.14ms [SYNC]</span>
              </div>
              <div className="jarvis-metric-row">
                <span>GPU RUNTIME:</span>
                <span className="jarvis-metric-val">THREE.JS WEBGL 2.0</span>
              </div>
              <div className="jarvis-metric-row">
                <span>ACTIVE MEMORY:</span>
                <span className="jarvis-metric-val emerald">64 GB ALLOCATED</span>
              </div>
            </div>
          </div>

          {/* Center Column: Rotating Arc Reactor Hologram & Acoustic Speech Waveform */}
          <div className="jarvis-center-col">
            <div className="jarvis-reactor-stage" aria-hidden="true">
              {/* Center Core Glowing Pulse */}
              <div className="jarvis-core-pulse" />

              <svg className="jarvis-reactor-svg" viewBox="0 0 220 220">
                {/* Outer Azimuth Degree Ring with Radial Calibration Ticks */}
                <circle cx="110" cy="110" r="104" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                
                {/* Real-time Radial Energy Progress Arc */}
                <circle 
                  cx="110" cy="110" r="100" 
                  fill="none" 
                  stroke="#38bdf8" 
                  strokeWidth="2.5" 
                  strokeDasharray={2 * Math.PI * 100}
                  strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
                />

                {/* Compass Degree Coordinates */}
                <text x="110" y="8" fill="rgba(56, 189, 248, 0.6)" fontSize="7" fontFamily="monospace" textAnchor="middle">000°</text>
                <text x="214" y="113" fill="rgba(56, 189, 248, 0.6)" fontSize="7" fontFamily="monospace" textAnchor="middle">090°</text>
                <text x="110" y="218" fill="rgba(56, 189, 248, 0.6)" fontSize="7" fontFamily="monospace" textAnchor="middle">180°</text>
                <text x="6" y="113" fill="rgba(56, 189, 248, 0.6)" fontSize="7" fontFamily="monospace" textAnchor="middle">270°</text>

                {/* Outer Segmented Calibration Ring (Clockwise) */}
                <g className="jarvis-spin-cw">
                  <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.2" strokeDasharray="8 6" />
                  <circle cx="110" cy="110" r="82" fill="none" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.5" strokeDasharray="24 10 6 10" />
                  <line x1="110" y1="18" x2="110" y2="28" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="110" y1="192" x2="110" y2="202" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="18" y1="110" x2="28" y2="110" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="192" y1="110" x2="202" y2="110" stroke="#38bdf8" strokeWidth="2" />
                </g>

                {/* Middle Ring with 10 Electromagnet Coils (Counter-Clockwise) */}
                <g className="jarvis-spin-ccw">
                  <circle cx="110" cy="110" r="68" fill="none" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="2" />
                  {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
                    <g key={deg} transform={`rotate(${deg} 110 110)`}>
                      <rect x="106" y="28" width="8" height="14" rx="2" fill="rgba(245, 158, 11, 0.85)" stroke="#fbbf24" strokeWidth="1" />
                      <line x1="110" y1="42" x2="110" y2="52" stroke="#38bdf8" strokeWidth="1" />
                    </g>
                  ))}
                </g>

                {/* Inner Triangle / Hex Core (Fast Spin) */}
                <g className="jarvis-spin-fast">
                  <polygon points="110,72 142,128 78,128" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="110" cy="110" r="26" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 3" />
                </g>

                {/* Center Energy Singularity */}
                <circle cx="110" cy="110" r="12" fill="#38bdf8" />
                <circle cx="110" cy="110" r="6" fill="#ffffff" />
              </svg>

              {/* Dynamic Arc Reactor Center Label */}
              <div className="jarvis-reactor-center-tag">
                ARC FLUX: {progress}% // 400% CAP
              </div>
            </div>

            {/* J.A.R.V.I.S. Audio Speech Waveform Indicator with Frequency Spectrum */}
            <div className="jarvis-waveform-box" aria-hidden="true" title="J.A.R.V.I.S. Audio Spectrum">
              <div className="jarvis-waveform-container">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="jarvis-wave-bar" 
                    style={{ 
                      animationDelay: `${(i % 6) * 0.14}s`,
                      height: `${8 + ((i * 11) % 22)}px`
                    }} 
                  />
                ))}
              </div>
              <div className="jarvis-freq-labels">
                <span>32Hz</span>
                <span>125Hz</span>
                <span>500Hz</span>
                <span>2kHz</span>
                <span>8kHz</span>
                <span>16kHz</span>
              </div>
            </div>

            {/* Dynamic J.A.R.V.I.S. Spoken Dialogue Box */}
            <div className="jarvis-dialogue-box">
              <div className="jarvis-dialogue-header">
                <div className="jarvis-dialogue-tag">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  <span>J.A.R.V.I.S. AUDIO TRANSMISSION // ACTIVE</span>
                </div>
                <span className="jarvis-dialogue-codec">24-BIT / 96kHz LOSSLESS</span>
              </div>
              <div className="jarvis-dialogue-quote">
                "{getJarvisDialogue(progress)}"
              </div>
            </div>
          </div>

          {/* Right Column: Stack of Dual Holographic Stark Cards */}
          <div className="jarvis-side-col">
            {/* Card 3: Mark-85 Full-Stack Suit Arsenal */}
            <div className="jarvis-holo-card">
              <div className="jarvis-card-header">
                <div className="jarvis-card-title">
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  <span>DEVELOPER SUIT ARSENAL</span>
                </div>
                <span className="jarvis-card-badge">MK-85</span>
              </div>
              <div className="jarvis-suit-list">
                {JARVIS_SUIT_DIAGNOSTICS.map((item) => (
                  <div key={item.label} className="jarvis-suit-item">
                    <div className="jarvis-suit-label">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="jarvis-suit-state armed">
                      {progress >= 85 ? item.state : 'CALIBRATING'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Flight Attitude & Vector Sensors */}
            <div className="jarvis-holo-card">
              <div className="jarvis-card-header">
                <div className="jarvis-card-title">
                  <Wifi className="w-3.5 h-3.5 text-sky-400" />
                  <span>FLIGHT SENSORS & VECTORS</span>
                </div>
                <span className="jarvis-card-badge emerald">STABLE</span>
              </div>
              <div className="jarvis-metric-row">
                <span>REPULSOR POWER:</span>
                <span className="jarvis-metric-val highlight">100% [CHARGED]</span>
              </div>
              <div className="jarvis-metric-row">
                <span>PITCH / YAW / ROLL:</span>
                <span className="jarvis-metric-val">+0.02° / -0.05° / 0.00°</span>
              </div>
              <div className="jarvis-metric-row">
                <span>THREAT DETECTED:</span>
                <span className="jarvis-metric-val emerald">0.00% [SECURE]</span>
              </div>
              <div className="jarvis-metric-row">
                <span>TARGET VECTOR:</span>
                <span className="jarvis-metric-val highlight">PORTFOLIO // READY</span>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* =========================================================================
          BOTTOM BAR: Segmented Progress Fill & Status Hints
          ========================================================================= */}
      <footer className="preloader-footer">
        <div className="preloader-progress-track">
          <div 
            className="preloader-progress-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <div className="preloader-footer-meta">
          <div className="preloader-footer-status">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>{statusMessage}</span>
          </div>
          <div className="preloader-footer-hints">
            <span>PRESS <kbd className="text-white bg-white/10 px-1 py-0.5 rounded font-mono text-[10px]">SPACE</kbd> TO FAST-FORWARD • <kbd className="text-white bg-white/10 px-1 py-0.5 rounded font-mono text-[10px]">P</kbd> TO PAUSE • <kbd className="text-white bg-white/10 px-1 py-0.5 rounded font-mono text-[10px]">ESC</kbd> TO TEST CLOSE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================================================
// PRELOADER TEST DOCK (Floating Control on the Live Website)
// Allows user to test and compare the 3 closing animations whenever they want!
// ==========================================================================
export function PreloaderTestDock({ 
  currentExitStyle, 
  onSelectExitStyle, 
  onReplayPreloader 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="J.A.R.V.I.S. Closing Animation Test Panel" className="preloader-test-dock">
      {isOpen ? (
        <div className="preloader-dock-card">
          <div className="preloader-dock-header">
            <div className="preloader-dock-title">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>TEST CLOSING ANIMATIONS</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="preloader-dock-close"
              aria-label="Close Test Dock"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="preloader-dock-modes">
            <button
              type="button"
              className={`preloader-dock-mode-btn ${currentExitStyle === 'iris' ? 'active' : ''}`}
              onClick={() => onSelectExitStyle('iris')}
            >
              <span>🔘 Style 1: Arc Iris Aperture</span>
              {currentExitStyle === 'iris' && <Check className="w-3 h-3 text-sky-400" />}
            </button>
            <button
              type="button"
              className={`preloader-dock-mode-btn ${currentExitStyle === 'shutter' ? 'active' : ''}`}
              onClick={() => onSelectExitStyle('shutter')}
            >
              <span>↔️ Style 2: Dual Shutter Split</span>
              {currentExitStyle === 'shutter' && <Check className="w-3 h-3 text-sky-400" />}
            </button>
            <button
              type="button"
              className={`preloader-dock-mode-btn ${currentExitStyle === 'curtain' ? 'active' : ''}`}
              onClick={() => onSelectExitStyle('curtain')}
            >
              <span>⬆️ Style 3: Editorial Curtain Lift</span>
              {currentExitStyle === 'curtain' && <Check className="w-3 h-3 text-sky-400" />}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onReplayPreloader(false);
              }}
              className="preloader-dock-replay-btn"
              aria-label="Replay J.A.R.V.I.S. with Selected Closing Animation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay & Test Closing</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onReplayPreloader(true);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                borderRadius: '0.55rem',
                padding: '0.45rem',
                fontFamily: 'ui-monospace, JetBrains Mono, monospace',
                fontSize: '0.72rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              aria-label="Freeze & Inspect J.A.R.V.I.S. Screen"
              title="Loads the preloader paused so you can inspect everything closely"
            >
              <span>⏸️ Freeze & Inspect Screen</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="preloader-dock-toggle-btn"
          aria-label="Open Closing Animation Switcher"
          title="Test J.A.R.V.I.S. Closing Animations"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Closing FX: {currentExitStyle === 'iris' ? 'Arc Iris' : currentExitStyle === 'shutter' ? 'Shutter Split' : 'Curtain Lift'}</span>
        </button>
      )}
    </aside>
  );
}
