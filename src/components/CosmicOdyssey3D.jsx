import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Compass } from 'lucide-react';
import RocketProgressIcon from './RocketProgressIcon';

// ============================================================================
// 1. SCROLLYTELLING SPACE MAP WAYPOINTS (Aligned with Page Sections)
// Horizontal Metro / Transit Route Stations with custom identity tokens
// ============================================================================
export const COSMIC_SECTORS = [
  {
    id: 'hero',
    code: '01',
    label: '01 // LHS 1140 b',
    name: 'LHS 1140 b',
    title: 'LHS 1140 b Ocean Super-Earth',
    sub: 'Super-Earth',
    distance: '48 LY',
    color: '#f472b6', // Pastel pink accent
    border: '#f9a8d4',
    bg: 'rgba(244, 114, 182, 0.25)',
    mission: 'JWST Habitable Zone Milestone',
    coord: 'Cetus Constellation • Orbiting in Habitable Zone',
  },
  {
    id: 'projects',
    code: '02',
    label: '02 // 6,000 EXOPLANETS',
    name: '6,000 Exoplanets',
    title: 'Beta Pictoris d & GJ 523b',
    sub: 'Beta Pic d',
    distance: '63 LY',
    color: '#f472b6', // Pastel pink accent
    border: '#f9a8d4',
    bg: 'rgba(244, 114, 182, 0.25)',
    mission: 'Exoplanet Archive 6,000+ Milestone',
    coord: 'Debris Disk • 23.5 M⊕ Mega-Earth',
  },
  {
    id: 'services',
    code: '03',
    label: '03 // EP260321a FLASH',
    name: 'EP260321a Flash',
    title: 'EP260321a Pre-Supernova Flash',
    sub: 'Pre-Supernova',
    distance: '500M LY',
    color: '#f472b6', // Pastel pink accent
    border: '#f9a8d4',
    bg: 'rgba(244, 114, 182, 0.25)',
    mission: 'NOIRLab Real-Time Explosion Alert',
    coord: '500M LY • Pre-Supernova Cosmic Flash',
  },
  {
    id: 'contact',
    code: '04',
    label: '04 // SAGITTARIUS A*',
    name: 'Sagittarius A*',
    title: 'Sagittarius A* & Star S301',
    sub: 'Black Hole & S301',
    distance: '26,000 LY',
    color: '#f472b6', // Pastel pink accent
    border: '#f9a8d4',
    bg: 'rgba(244, 114, 182, 0.25)',
    mission: 'EHT & JWST Black Hole Star',
    coord: 'Galactic Center • Relativistic Horizon',
  },
];

// ============================================================================
// 2. COMPREHENSIVE ASTRONOMICAL DISCOVERY DOSSIER (User Reference Dataset)
// Includes all mind-boggling star & record-breaking planet discoveries
// ============================================================================
export const DISCOVERY_DOSSIER = [
  // 🌟 Mind-Boggling Star Discoveries
  {
    id: 'black-hole-star',
    type: 'STAR',
    badge: 'JWST AUG 2026',
    badgeColor: 'red',
    title: 'The "Solar System-Sized" Black Hole Star',
    location: 'Cetus Constellation • Billions of Light-Years Away',
    stat: '100 Billion × Solar Energy • Solar-System Sized',
    description: 'In August 2026, international astronomers analyzing images from the James Webb Space Telescope (JWST) announced the discovery of a bizarre new cosmic object. Lurking in the Cetus constellation billions of light-years away, this "black hole star" is the size of our entire solar system. It glows with a brilliant red light and releases an astonishing 100 billion times more energy than any normal star can produce.',
    source: 'The Guardian (Aug 2026)',
    sourceUrl: 'https://www.theguardian.com/science/2026/aug/12/astronomy-discovery-new-cosmic-object-black-hole-star',
    targetSector: 'contact',
  },
  {
    id: 's301',
    type: 'STAR',
    badge: 'MILKY WAY SPEED RECORD',
    badgeColor: 'red',
    title: 'The Impossible-Speed Star (S301)',
    location: 'Galactic Center • Skimming Sagittarius A*',
    stat: '25,000 km/s (~8.5% of the Speed of Light)',
    description: 'Scientists discovered the fastest known star in the Milky Way, named S301. Skimming dangerously close to Sagittarius A* (the supermassive black hole at our galaxy\'s center), this star hurtles through space at a mind-bending 25,000 kilometers per second—roughly 8.5% of the speed of light.',
    source: 'Sky at Night Magazine',
    sourceUrl: 'https://www.skyatnightmagazine.com/news/star-s301',
    targetSector: 'contact',
  },
  {
    id: 'ep260321a',
    type: 'STAR',
    badge: 'CAUGHT IN THE ACT OF DEATH',
    badgeColor: 'amber',
    title: 'Pre-Supernova Cosmic Flash (EP260321a)',
    location: 'Distant Galaxy • 500 Million Light-Years Away',
    stat: '500M LY • Rare Pre-Explosion Optical Burst',
    description: 'In 2026, space telescopes caught a rare cosmic flash from a galaxy 500 million light-years away. The event, dubbed EP260321a, gave scientists an unprecedented, real-time look at a massive star in its final moments right before it exploded.',
    source: 'NOIRLab News (2026)',
    sourceUrl: 'https://noirlab.edu/public/news/noirlab2619/',
    targetSector: 'services',
  },
  // 🪐 Extreme and Record-Breaking Planet Discoveries
  {
    id: 'lhs1140b',
    type: 'PLANET',
    badge: 'HABITABLE OCEAN CANDIDATE',
    badgeColor: 'cyan',
    title: 'Atmosphere Confirmed on Rocky Planet LHS 1140 b',
    location: 'Cetus Constellation • 48 Light-Years Away',
    stat: '48 LY • Helium Leaking & Self-Replenishing Atmosphere',
    description: 'In a massive milestone for astronomy, scientists successfully confirmed a stable atmosphere on LHS 1140 b, a rocky "super-Earth" located 48 light-years away. It orbits inside its star\'s habitable zone and is leaking helium, proving it has a thick atmosphere that is actively replenishing itself—making it a prime candidate for holding a liquid water ocean.',
    source: 'Space.com / JWST Analysis',
    sourceUrl: 'https://www.space.com/astronomy/exoplanets/the-most-exciting-exoplanet-discoveries-of-2025',
    targetSector: 'hero',
  },
  {
    id: 'beta-pictoris-d',
    type: 'PLANET',
    badge: 'JWST HIDDEN GIANT',
    badgeColor: 'amber',
    title: 'The Hidden Giant (Beta Pictoris d)',
    location: 'Beta Pictoris Debris Disk • 63 Light-Years Away',
    stat: '63 LY • ≥ 2× Mass of Jupiter',
    description: 'The JWST uncovered a hidden gas giant planet hiding 63 light-years away inside the debris disk of the famous Beta Pictoris star system. This newly found planet is estimated to be at least twice the mass of Jupiter.',
    source: 'NASA Webb Missions',
    sourceUrl: 'https://science.nasa.gov/missions/webb/nasas-webb-discovers-hidden-planet-in-famous-star-system/',
    targetSector: 'projects',
  },
  {
    id: 'gj-523b',
    type: 'PLANET',
    badge: 'PHYSICS RULE BREAKER',
    badgeColor: 'cyan',
    title: 'The Planet-Building Rule Breaker (GJ 523b)',
    location: 'Exoplanet Catalog • Defying Physics',
    stat: '23.5 Earth Masses of Solid Rock & Metal',
    description: 'Astronomers found an ultra-dense "mega-Earth" exoplanet named GJ 523b. Weighing as much as 23.5 Earths but remaining a ball of solid rock and metal, it completely defies traditional physics, which state that a planet that massive should have turned into a gas giant like Jupiter.',
    source: 'Sky at Night Magazine',
    sourceUrl: 'https://www.skyatnightmagazine.com/news/gj-523b-exoplanet',
    targetSector: 'projects',
  },
  {
    id: '6000-exoplanets',
    type: 'PLANET',
    badge: '6,000 WORLDS MILESTONE',
    badgeColor: 'cyan',
    title: '6,000 Exoplanets Milestone',
    location: 'Milky Way Galaxy • Ubiquitous Planetary Worlds',
    stat: '6,000+ Confirmed Worlds Discovered',
    description: 'Humanity\'s official count of confirmed planets outside our solar system officially surpassed 6,000 confirmed worlds, proving that planets are practically everywhere in the universe.',
    source: 'NASA Exoplanet Archive',
    sourceUrl: 'https://science.nasa.gov/missions/webb/nasas-webb-discovers-hidden-planet-in-famous-star-system/',
    targetSector: 'projects',
  },
];

export default function CosmicOdyssey3D() {
  const mountRef = useRef(null);
  const [isCinematicMode, setIsCinematicMode] = useState(false);
  const [activeSectorIdx, setActiveSectorIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef(null);
  const cosmicProgressRef = useRef(0);

  // Sync cinematic mode with document body so HTML page contents fade out
  useEffect(() => {
    if (isCinematicMode) {
      document.body.classList.add('cinematic-active');
    } else {
      document.body.classList.remove('cinematic-active');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCinematicMode) {
        setIsCinematicMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('cinematic-active');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCinematicMode]);

  // Dynamic calculation of document positions for the 4 cosmic waypoints
  const getSectionScrollTops = useCallback(() => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const getElementDocTop = (id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return rect.top + (window.pageYOffset || window.scrollY || 0);
    };

    const headerOffset = 70;
    const projectsElTop = getElementDocTop('projects');
    const servicesElTop = getElementDocTop('services');
    const contactElTop = getElementDocTop('contact');

    const pos0 = 0;
    const pos1 = projectsElTop !== null ? Math.min(maxScroll, Math.max(0, projectsElTop - headerOffset)) : maxScroll * 0.333;
    const pos2 = servicesElTop !== null ? Math.min(maxScroll, Math.max(0, servicesElTop - headerOffset)) : maxScroll * 0.667;
    const pos3 = contactElTop !== null ? Math.min(maxScroll, Math.max(0, contactElTop - headerOffset)) : maxScroll;

    return [pos0, pos1, pos2, pos3];
  }, []);

  // Real-time responsive scroll tracking with piecewise waypoint mapping
  useEffect(() => {
    let ticking = false;
    let lastIdx = -1;

    const handleScrollTracking = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isNavigatingRef.current) {
            const currentY = window.scrollY || window.pageYOffset || 0;
            const positions = getSectionScrollTops();
            const [pos0, pos1, pos2, pos3] = positions;

            let progress = 0;
            let idx = 0;

            if (currentY <= pos0 + 10) {
              progress = 0;
              idx = 0;
            } else if (currentY >= pos3 - 40) {
              progress = 1;
              idx = 3;
            } else if (currentY < pos1) {
              const span = Math.max(1, pos1 - pos0);
              const t = Math.min(1, Math.max(0, (currentY - pos0) / span));
              progress = (t * 1) / 3;
              idx = t >= 0.85 ? 1 : 0;
            } else if (currentY < pos2) {
              const span = Math.max(1, pos2 - pos1);
              const t = Math.min(1, Math.max(0, (currentY - pos1) / span));
              progress = (1 + t) / 3;
              idx = t >= 0.85 ? 2 : 1;
            } else {
              const span = Math.max(1, pos3 - pos2);
              const t = Math.min(1, Math.max(0, (currentY - pos2) / span));
              progress = (2 + t) / 3;
              idx = t >= 0.85 ? 3 : 2;
            }

            const clampedProgress = Math.min(1, Math.max(0, progress));
            setScrollProgress(clampedProgress);
            cosmicProgressRef.current = clampedProgress;

            if (idx !== lastIdx) {
              lastIdx = idx;
              setActiveSectorIdx(idx);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    handleScrollTracking();

    return () => {
      window.removeEventListener('scroll', handleScrollTracking);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, [getSectionScrollTops]);

  const handleStationClick = (targetId) => {
    const idx = COSMIC_SECTORS.findIndex((s) => s.id === targetId);
    if (idx === -1) return;

    // Immediately snap active sector and exact destination progress for 100% precision
    setActiveSectorIdx(idx);
    const targetProgress = idx / 3;
    setScrollProgress(targetProgress);
    cosmicProgressRef.current = targetProgress;

    // Suppress scroll listener jitter while smooth scrolling
    isNavigatingRef.current = true;
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);

    const positions = getSectionScrollTops();
    const targetY = positions[idx];

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };


  // ============================================================================
  // PROCEDURAL HIGH-DEFINITION TEXTURE GENERATORS
  // Generates sharp, natural textures in memory (zero network latency, 60fps)
  // ============================================================================
  
  // 1. Star / Point Texture
  const createParticleTexture = useCallback((innerColor = 'rgba(255, 255, 255, 1)', outerColor = 'rgba(56, 189, 248, 0)') => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(0.25, 'rgba(186, 230, 253, 0.85)');
    grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.35)');
    grad.addColorStop(1, outerColor);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // 1b. Meteor Fireball & Incandescent Plasma Texture
  const createFireTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.15, 'rgba(254, 240, 138, 0.98)');
    grad.addColorStop(0.35, 'rgba(249, 115, 22, 0.85)');
    grad.addColorStop(0.65, 'rgba(225, 29, 72, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // 1c. Shooting Star Hypersonic Ion Streak (Oxygen 557.7nm line + Magnesium Core)
  const createStreakTexture = useCallback(() => {
    const width = 64;
    const height = 256;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Hyper-velocity shooting star streak (smooth Gaussian cross-section)
    // y = 0 is head (forward), y = 255 is tail (backward)
    for (let y = 0; y < height; y++) {
      const v = y / (height - 1); // 0 at head, 1 at tail
      const longFade = Math.pow(1.0 - v, 1.25);
      const sigmaCore = 1.3 + v * 1.8;
      const sigmaHalo = 3.6 + v * 7.5;

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const dx = x - 31.5;

        const dCore = (dx * dx) / (2 * sigmaCore * sigmaCore);
        const dHalo = (dx * dx) / (2 * sigmaHalo * sigmaHalo);

        const coreVal = Math.exp(-dCore) * longFade;
        const haloVal = Math.exp(-dHalo) * longFade;

        if (haloVal > 0.003 || coreVal > 0.003) {
          // Atmospheric forbidden oxygen 557.7nm line (teal/green) + cyan + violet fringe
          const r = Math.min(255, Math.round(coreVal * 255 + haloVal * 45));
          const g = Math.min(255, Math.round(coreVal * 255 + haloVal * 212));
          const b = Math.min(255, Math.round(coreVal * 255 + haloVal * 191));
          const a = Math.min(255, Math.round(Math.max(coreVal * 0.98, haloVal * 0.85) * 255));

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = a;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // 1d. Persistent Ion Train Texture (Lingering Mesospheric Plasma Glow)
  const createPersistentIonTexture = useCallback(() => {
    const width = 64;
    const height = 256;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Persistent ion train: excited mesospheric plasma glow
    for (let y = 0; y < height; y++) {
      const v = y / (height - 1);
      const longShape = Math.sin(v * Math.PI);
      const sigmaPlasma = 3.6 + Math.sin(v * Math.PI) * 4.5;
      const sigmaCore = 1.4;

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const dx = x - 31.5;

        const dPlasma = (dx * dx) / (2 * sigmaPlasma * sigmaPlasma);
        const dCore = (dx * dx) / (2 * sigmaCore * sigmaCore);

        const plasmaVal = Math.exp(-dPlasma) * longShape;
        const coreVal = Math.exp(-dCore) * longShape;

        if (plasmaVal > 0.003) {
          const r = Math.min(255, Math.round(coreVal * 240 + plasmaVal * 80));
          const g = Math.min(255, Math.round(coreVal * 255 + plasmaVal * 215));
          const b = Math.min(255, Math.round(coreVal * 255 + plasmaVal * 240));
          const a = Math.min(255, Math.round(plasmaVal * 230));

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = a;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // 1e. Hypersonic Bow Shock Crescent Texture (Aerodynamic Parabolic Sheath)
  const createBowShockTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;

    // Aerodynamic hypersonic bow shock profile: apex at (64, 28)
    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        const idx = (y * 128 + x) * 4;
        const dx = (x - 64) / 48; // [-1.33, 1.33]
        const targetY = 28 + 42 * (dx * dx);
        const dy = y - targetY;

        if (dy >= -6 && dy <= 32) {
          const shockNorm = dy < 0 ? (dy + 6) / 6 : 1.0 - (dy / 32);
          const wingFade = Math.max(0, 1.0 - Math.abs(dx) * 0.7);
          const alpha = Math.max(0, Math.min(1, Math.pow(shockNorm, 1.4) * wingFade));

          if (alpha > 0.005) {
            const warmth = Math.min(1, Math.abs(dx) * 0.85 + (dy > 0 ? (dy / 32) * 0.5 : 0));
            data[idx] = 255;
            data[idx + 1] = Math.round(255 - warmth * 110);
            data[idx + 2] = Math.round(240 - warmth * 210);
            data[idx + 3] = Math.round(alpha * 255);
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // 1f. Mesospheric Smoke Puff Texture (Gaussian Radial Mineral Dust Cloud)
  const createSmokePuffTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 62);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(240, 240, 245, 0.85)');
    grad.addColorStop(0.55, 'rgba(200, 210, 225, 0.45)');
    grad.addColorStop(0.80, 'rgba(160, 175, 195, 0.18)');
    grad.addColorStop(1.0, 'rgba(100, 116, 139, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // 1g. Meteor Bolide Plasma Streak Texture (Thermal Ablation Wake)
  const createMeteorPlasmaTexture = useCallback(() => {
    const width = 64;
    const height = 256;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Bolide plasma wake: incandescent molten white core, burning orange/crimson wake
    for (let y = 0; y < height; y++) {
      const v = y / (height - 1); // 0 at head, 1 at tail
      const longFade = Math.pow(1.0 - v, 1.4);
      const sigmaCore = 1.6 + v * 2.5;
      const sigmaWake = 4.2 + v * 12.0;

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const dx = x - 31.5;

        const dCore = (dx * dx) / (2 * sigmaCore * sigmaCore);
        const dWake = (dx * dx) / (2 * sigmaWake * sigmaWake);

        const coreVal = Math.exp(-dCore) * longFade;
        const wakeVal = Math.exp(-dWake) * longFade;

        if (wakeVal > 0.003 || coreVal > 0.003) {
          const r = 255;
          const g = Math.min(255, Math.round(coreVal * 255 + wakeVal * 125));
          const b = Math.min(255, Math.round(coreVal * 230 + wakeVal * 20));
          const a = Math.min(255, Math.round(Math.max(coreVal * 0.98, wakeVal * 0.88) * 255));

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = a;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // 2. High-Definition Ocean Super-Earth Texture (LHS 1140 b)
  const createOceanPlanetTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Deep oceanic gradient base (48 LY water world)
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 256);
    oceanGrad.addColorStop(0, '#0c4a6e'); // polar dark ocean
    oceanGrad.addColorStop(0.5, '#0284c7'); // tropical azure ocean
    oceanGrad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Natural archipelagos, continental shelves & landmasses
    const continents = [
      { x: 90, y: 110, rx: 55, ry: 35, angle: 0.2 },
      { x: 190, y: 140, rx: 70, ry: 45, angle: -0.3 },
      { x: 330, y: 95, rx: 65, ry: 40, angle: 0.1 },
      { x: 420, y: 155, rx: 50, ry: 30, angle: -0.15 },
      { x: 260, y: 180, rx: 40, ry: 25, angle: 0.4 },
    ];

    continents.forEach((c) => {
      // Shallow shelf water outline
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.rx + 12, c.ry + 8, c.angle, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.fill();

      // Fertile green/olive landmass
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.rx, c.ry, c.angle, 0, Math.PI * 2);
      ctx.fillStyle = '#0f766e';
      ctx.fill();

      // Highland core
      ctx.beginPath();
      ctx.ellipse(c.x - 5, c.y - 4, c.rx * 0.6, c.ry * 0.6, c.angle, 0, Math.PI * 2);
      ctx.fillStyle = '#15803d';
      ctx.fill();
    });

    // Polar ice caps
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(256, 8, 256, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(256, 248, 256, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Natural atmospheric cloud swirl bands
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    for (let i = 0; i < 7; i++) {
      const cy = 40 + i * 28;
      ctx.beginPath();
      ctx.ellipse(120 + (i % 3) * 120, cy, 95 + i * 8, 9, (i % 2 === 0 ? 0.08 : -0.08), 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }, []);

  // 3. Beta Pictoris d Gas Giant Banded Atmosphere Texture (≥ 2× Jupiter Mass)
  const createGasGiantTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Jovian banded atmosphere latitudes
    const bands = [
      { y: 0, h: 25, col: '#78350f' },
      { y: 25, h: 35, col: '#b45309' },
      { y: 60, h: 40, col: '#fef3c7' },
      { y: 100, h: 55, col: '#f59e0b' },
      { y: 155, h: 45, col: '#d97706' },
      { y: 200, h: 30, col: '#fbbf24' },
      { y: 230, h: 26, col: '#92400e' },
    ];

    bands.forEach(b => {
      ctx.fillStyle = b.col;
      ctx.fillRect(0, b.y, 512, b.h);
    });

    // Storm vortices and eddy currents
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.ellipse(210, 130, 36, 20, -0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(210, 130, 22, 11, -0.1, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // 4. GJ 523b Rule-Breaker Mega-Earth Metallic Rock Texture (23.5 M⊕ Solid)
  const createMegaEarthTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Basaltic heavy-element core base
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 256, 128);

    // Dense metallic and nickel-iron ore fault lines
    ctx.fillStyle = '#94a3b8';
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 16 + 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // High-pressure fracture ridges
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, 60);
    ctx.bezierCurveTo(80, 20, 140, 110, 230, 50);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // 5. Beta Pictoris Circumstellar Debris Disk Radial Texture
  const createDebrisDiskTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Inner cleared gap, dense dust ring, and outer diffuse dust
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.18, 'rgba(180, 83, 9, 0.15)');
    grad.addColorStop(0.38, 'rgba(245, 158, 11, 0.75)'); // cleared ring resonance peak
    grad.addColorStop(0.58, 'rgba(217, 119, 6, 0.6)');
    grad.addColorStop(0.85, 'rgba(120, 53, 15, 0.25)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, []);

  // 6. Relativistic Accretion Ring Texture (Doppler Blueshift to Crimson Redshift)
  const createAccretionRingTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Doppler-boosted asymmetric profile: brilliant blueshifted peak to redshifted crimson
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.10, 'rgba(239, 68, 68, 0.7)'); // redshifted deep crimson (Black Hole Star)
    grad.addColorStop(0.24, 'rgba(254, 240, 138, 0.98)'); // intense relativistic approaching peak
    grad.addColorStop(0.42, 'rgba(245, 158, 11, 0.85)'); // golden accretion plasma
    grad.addColorStop(0.68, 'rgba(168, 85, 247, 0.55)'); // photon sphere ultraviolet
    grad.addColorStop(0.88, 'rgba(56, 189, 248, 0.35)'); // doppler blueshift tail
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, []);

  // ============================================================================
  // THREE.JS SCENE INITIALIZATION & SHARP, NATURAL EVENT MODELS
  // ============================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060d, 0.0016);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1400);
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Textures
    const starTexture = createParticleTexture('rgba(255, 255, 255, 1)', 'rgba(56, 189, 248, 0)');
    const fireTexture = createFireTexture();
    const streakTexture = createStreakTexture();
    const persistentIonTexture = createPersistentIonTexture();
    const bowShockTexture = createBowShockTexture();
    const smokePuffTexture = createSmokePuffTexture();
    const meteorPlasmaTexture = createMeteorPlasmaTexture();
    const oceanPlanetTexture = createOceanPlanetTexture();
    const gasGiantTexture = createGasGiantTexture();
    const megaEarthTexture = createMegaEarthTexture();
    const debrisDiskTexture = createDebrisDiskTexture();
    const accretionTexture = createAccretionRingTexture();

    // Natural Balanced Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.0);
    sunLight.position.set(40, 50, 30);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-50, -20, -50);
    scene.add(rimLight);

    // ----------------------------------------------------------------------------
    // A. DEEP-SPACE STELLAR FIELD (1,800 Star Coordinates)
    // ----------------------------------------------------------------------------
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xbae6fd),
      new THREE.Color(0xfde047),
      new THREE.Color(0xfca5a5),
      new THREE.Color(0xa5f3fc),
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 90 + Math.random() * 520;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = -Math.random() * 460 + 60;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      starScales[i] = Math.random() * 2.0 + 0.6;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('scale', new THREE.BufferAttribute(starScales, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMaterial);
    scene.add(starField);

    // ----------------------------------------------------------------------------
    // B. SECTOR 01: LHS 1140 b (Atmosphere-Confirmed Ocean Super-Earth - Hero)
    // Realistic habitable water world with geographic continents, polar ice caps,
    // Rayleigh scattering atmospheric glow, and cometary helium evaporation plume!
    // Located at (-32, 14, -75) to frame portrait and leave hero typography clean
    // ----------------------------------------------------------------------------
    const lhsGroup = new THREE.Group();
    lhsGroup.position.set(-32, 14, -75);

    // 1. Photorealistic Ocean Planet Body with Continents & Polar Ice
    const lhsGeo = new THREE.SphereGeometry(11.2, 48, 48);
    const lhsMat = new THREE.MeshStandardMaterial({
      map: oceanPlanetTexture,
      roughness: 0.38,
      metalness: 0.12,
    });
    const lhsPlanet = new THREE.Mesh(lhsGeo, lhsMat);
    lhsGroup.add(lhsPlanet);

    // 2. Natural Soft Rayleigh Atmospheric Limb Glow (Additive Glow Shell - No Harsh Wireframes!)
    const lhsAtmoGeo = new THREE.SphereGeometry(12.3, 36, 36);
    const lhsAtmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const lhsAtmo = new THREE.Mesh(lhsAtmoGeo, lhsAtmoMat);
    lhsGroup.add(lhsAtmo);

    const lhsOuterGlowGeo = new THREE.SphereGeometry(13.4, 32, 32);
    const lhsOuterGlowMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const lhsOuterGlow = new THREE.Mesh(lhsOuterGlowGeo, lhsOuterGlowMat);
    lhsGroup.add(lhsOuterGlow);

    // 3. Dynamic Water-Vapor Cloud Swirl Shell
    const cloudGeo = new THREE.SphereGeometry(11.45, 36, 36);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.8,
      blending: THREE.NormalBlending,
    });
    const cloudShell = new THREE.Mesh(cloudGeo, cloudMat);
    lhsGroup.add(cloudShell);

    // 4. Natural Cometary Helium Evaporation Stream (Photoevaporation from M-Dwarf)
    const plumeCount = 150;
    const plumeGeo = new THREE.BufferGeometry();
    const plumePos = new Float32Array(plumeCount * 3);
    const plumeCols = new Float32Array(plumeCount * 3);
    for (let p = 0; p < plumeCount; p++) {
      const dist = (p / plumeCount) * 55;
      const spread = (Math.pow(dist / 55, 0.7) * 4.5) + 0.8;
      plumePos[p * 3] = (Math.random() - 0.5) * spread;
      plumePos[p * 3 + 1] = 4 + (Math.random() - 0.5) * spread;
      plumePos[p * 3 + 2] = -dist;

      const alpha = 1 - (p / plumeCount);
      plumeCols[p * 3] = 0.22 * alpha;
      plumeCols[p * 3 + 1] = 0.74 * alpha;
      plumeCols[p * 3 + 2] = 0.97 * alpha;
    }
    plumeGeo.setAttribute('position', new THREE.BufferAttribute(plumePos, 3));
    plumeGeo.setAttribute('color', new THREE.BufferAttribute(plumeCols, 3));
    const plumeMat = new THREE.PointsMaterial({
      size: 3.2,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const plumePoints = new THREE.Points(plumeGeo, plumeMat);
    lhsGroup.add(plumePoints);

    scene.add(lhsGroup);

    // ----------------------------------------------------------------------------
    // C. SECTOR 02: 6,000 EXOPLANETS FRONTIER: BETA PICTORIS d & GJ 523b (Works)
    // Host Star, Realistic Circumstellar Debris Disk with Cleared Gap,
    // Banded Gas Giant Beta Pictoris d, and Dense Metallic Mega-Earth GJ 523b!
    // Located at (48, 8, -140)
    // ----------------------------------------------------------------------------
    const exoplanetGroup = new THREE.Group();
    exoplanetGroup.position.set(48, 8, -140);

    // 1. Beta Pictoris Host Star with Convective Corona
    const betaStarGeo = new THREE.SphereGeometry(8.5, 36, 36);
    const betaStarMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.5,
      roughness: 0.25,
    });
    const betaStar = new THREE.Mesh(betaStarGeo, betaStarMat);
    exoplanetGroup.add(betaStar);

    // 2. Realistic Circumstellar Debris Disk (Mapped with Density Gradient Texture)
    const diskGeo = new THREE.RingGeometry(16, 44, 96);
    const diskMat = new THREE.MeshBasicMaterial({
      map: debrisDiskTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const debrisDisk = new THREE.Mesh(diskGeo, diskMat);
    debrisDisk.rotation.x = Math.PI / 2 + 0.28;
    exoplanetGroup.add(debrisDisk);

    // 3. Beta Pictoris d: The Hidden Gas Giant (≥ 2× Jupiter Mass with Banded Texture)
    const giantGeo = new THREE.SphereGeometry(3.6, 36, 36);
    const giantMat = new THREE.MeshStandardMaterial({
      map: gasGiantTexture,
      roughness: 0.45,
      metalness: 0.08,
    });
    const giantPlanet = new THREE.Mesh(giantGeo, giantMat);
    exoplanetGroup.add(giantPlanet);

    // Giant's Micro Ring System
    const giantRingGeo = new THREE.RingGeometry(4.4, 6.2, 48);
    const giantRingMat = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const giantRing = new THREE.Mesh(giantRingGeo, giantRingMat);
    giantRing.rotation.x = Math.PI * 0.4;
    giantPlanet.add(giantRing);

    // 4. GJ 523b: The Planet-Building Rule Breaker (Ultra-Dense 23.5 M⊕ Solid Rock & Metal)
    const megaEarthGeo = new THREE.SphereGeometry(2.3, 32, 32);
    const megaEarthMat = new THREE.MeshStandardMaterial({
      map: megaEarthTexture,
      roughness: 0.28,
      metalness: 0.82,
    });
    const megaEarth = new THREE.Mesh(megaEarthGeo, megaEarthMat);
    exoplanetGroup.add(megaEarth);

    // 5. 6,000 Exoplanets Milestone Constellation (Fine Keplerian Resonance Orbits)
    const fleetCount = 54;
    const fleetGeo = new THREE.BufferGeometry();
    const fleetPos = new Float32Array(fleetCount * 3);
    for (let f = 0; f < fleetCount; f++) {
      const rad = 21 + Math.random() * 28;
      const ang = (f / fleetCount) * Math.PI * 2 + Math.random() * 0.15;
      fleetPos[f * 3] = Math.cos(ang) * rad;
      fleetPos[f * 3 + 1] = Math.sin(ang) * rad * 0.26 + (Math.random() - 0.5) * 3;
      fleetPos[f * 3 + 2] = Math.sin(ang) * rad * Math.cos(0.28);
    }
    fleetGeo.setAttribute('position', new THREE.BufferAttribute(fleetPos, 3));
    const fleetMat = new THREE.PointsMaterial({
      size: 2.2,
      color: 0x38bdf8,
      map: starTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fleetPoints = new THREE.Points(fleetGeo, fleetMat);
    exoplanetGroup.add(fleetPoints);

    scene.add(exoplanetGroup);

    // ----------------------------------------------------------------------------
    // D. SECTOR 03: EP260321a (CAUGHT IN THE ACT OF DEATH - Services)
    // Pre-supernova cosmic flash caught in real-time from a galaxy 500M LY away!
    // Realistic dying stellar core, asymmetric shockwave fronts, and relativistic jet!
    // Located at (-38, -6, -260)
    // ----------------------------------------------------------------------------
    const deathFlashGroup = new THREE.Group();
    deathFlashGroup.position.set(-38, -6, -260);

    // 1. Dying Massive Star Core in Extreme Thermonuclear Convulsion
    const coreGeo = new THREE.SphereGeometry(6.8, 36, 36);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xa855f7,
      emissiveIntensity: 2.4,
      roughness: 0.2,
    });
    const explodingCore = new THREE.Mesh(coreGeo, coreMat);
    deathFlashGroup.add(explodingCore);

    // 2. Asymmetric Pre-Supernova Blast Wave Shells (Filamentary Shock Fronts)
    const shockwaveRings = [];
    const ringRadii = [13, 22, 33];
    ringRadii.forEach((r, idx) => {
      const swGeo = new THREE.RingGeometry(r - 0.5, r + 0.5, 64);
      const swMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0xf43f5e : (idx === 1 ? 0xa855f7 : 0x38bdf8),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5 - idx * 0.12,
        blending: THREE.AdditiveBlending,
      });
      const swMesh = new THREE.Mesh(swGeo, swMat);
      swMesh.rotation.x = Math.PI * (0.32 + idx * 0.12);
      deathFlashGroup.add(swMesh);
      shockwaveRings.push(swMesh);
    });


    // 4. Relativistic Synchrotron Ionization Particles
    const flashCount = 160;
    const flashGeo = new THREE.BufferGeometry();
    const flashPos = new Float32Array(flashCount * 3);
    const flashCols = new Float32Array(flashCount * 3);
    for (let p = 0; p < flashCount; p++) {
      const dist = 7 + Math.pow(Math.random(), 0.6) * 44;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      flashPos[p * 3] = dist * Math.sin(phi) * Math.cos(theta);
      flashPos[p * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      flashPos[p * 3 + 2] = dist * Math.cos(phi);

      const col = new THREE.Color().lerpColors(
        new THREE.Color(0xf43f5e),
        new THREE.Color(0x38bdf8),
        Math.random()
      );
      flashCols[p * 3] = col.r;
      flashCols[p * 3 + 1] = col.g;
      flashCols[p * 3 + 2] = col.b;
    }
    flashGeo.setAttribute('position', new THREE.BufferAttribute(flashPos, 3));
    flashGeo.setAttribute('color', new THREE.BufferAttribute(flashCols, 3));
    const flashMat = new THREE.PointsMaterial({
      size: 3.8,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flashPoints = new THREE.Points(flashGeo, flashMat);
    deathFlashGroup.add(flashPoints);

    scene.add(deathFlashGroup);

    // ----------------------------------------------------------------------------
    // E. SECTOR 04: BLACK HOLE DESTINATION: SAGITTARIUS A* & STAR S301 (Contact)
    // Absolute pitch-black event horizon, Einstein gravitational lensing arc,
    // Relativistic Doppler-boosted accretion disk (100B× solar energy release),
    // and Star S301 hurtling at 25,000 km/s (~8.5% light speed) with speed ribbon!
    // Located at (0, 0, -420)
    // ----------------------------------------------------------------------------
    const blackHoleGroup = new THREE.Group();
    blackHoleGroup.position.set(0, 0, -420);

    // 1. Schwarzschild Shadow (Singularity Sphere absorbing all light)
    const shadowGeo = new THREE.SphereGeometry(18, 48, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
    const shadowSphere = new THREE.Mesh(shadowGeo, shadowMat);
    blackHoleGroup.add(shadowSphere);

    // 2. Einstein Gravitational Lensing Light Arc (Back of Accretion Disk bent over Event Horizon)
    const lensArcCurve = new THREE.EllipseCurve(0, 0, 20.8, 12.2, 0, Math.PI, false, 0);
    const lensArcPts = lensArcCurve.getPoints(50);
    const lensArcGeo = new THREE.BufferGeometry().setFromPoints(lensArcPts.map(p => new THREE.Vector3(p.x, p.y + 7.5, -2)));
    const lensArcMat = new THREE.LineBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const topLensArc = new THREE.Line(lensArcGeo, lensArcMat);
    blackHoleGroup.add(topLensArc);

    // 3. Solar-System Sized Black Hole Star Radiant Crimson Aura (100B × Energy Release)
    const redCoronaGeo = new THREE.SphereGeometry(42, 32, 32);
    const redCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const redCorona = new THREE.Mesh(redCoronaGeo, redCoronaMat);
    blackHoleGroup.add(redCorona);

    // 4. Relativistic Doppler Accretion Ring (EHT Signature Golden to Brilliant Red)
    const ringGeo = new THREE.RingGeometry(18.2, 34.0, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      map: accretionTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    });
    const accretionRing = new THREE.Mesh(ringGeo, ringMat);
    accretionRing.rotation.x = Math.PI * 0.38;
    accretionRing.rotation.y = Math.PI * 0.12;
    blackHoleGroup.add(accretionRing);

    // 5. Photon Sphere Orbit Ring
    const photonSphereGeo = new THREE.RingGeometry(18.2, 19.6, 64);
    const photonSphereMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const photonRing = new THREE.Mesh(photonSphereGeo, photonSphereMat);
    photonRing.rotation.x = Math.PI * 0.38;
    photonRing.rotation.y = Math.PI * 0.12;
    blackHoleGroup.add(photonRing);

    // 6. Star S301: The Impossible-Speed Star (Fastest known star in Milky Way!)
    // Skimming dangerously close to Sgr A* at 25,000 km/s (~8.5% light speed)
    const s301Geo = new THREE.SphereGeometry(1.8, 20, 20);
    const s301Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x93c5fd,
      emissiveIntensity: 3.2,
      roughness: 0.2,
    });
    const starS301 = new THREE.Mesh(s301Geo, s301Mat);
    blackHoleGroup.add(starS301);

    // S301 Relativistic Motion-Blur Speed Tail (Velocity Ribbon)
    const s301OrbitCurve = new THREE.EllipseCurve(0, 0, 28, 20, 0, Math.PI * 2, false, 0);
    const s301OrbitPts = s301OrbitCurve.getPoints(80);
    const s301OrbitGeo = new THREE.BufferGeometry().setFromPoints(s301OrbitPts.map(p => new THREE.Vector3(p.x, p.y * 0.32, p.y)));
    const s301OrbitMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const s301OrbitLine = new THREE.Line(s301OrbitGeo, s301OrbitMat);
    s301OrbitLine.rotation.x = Math.PI * 0.35;
    s301OrbitLine.rotation.y = Math.PI * 0.18;
    blackHoleGroup.add(s301OrbitLine);

    // 7. 1,000 Infalling Relativistic Accretion Vortex Particles
    const vortexCount = 1000;
    const vortexGeo = new THREE.BufferGeometry();
    const vortexPos = new Float32Array(vortexCount * 3);
    const vortexCols = new Float32Array(vortexCount * 3);
    for (let i = 0; i < vortexCount; i++) {
      const radius = 22 + Math.pow(Math.random(), 0.5) * 85;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * (radius * 0.15);

      vortexPos[i * 3] = Math.cos(angle) * radius;
      vortexPos[i * 3 + 1] = y;
      vortexPos[i * 3 + 2] = Math.sin(angle) * radius;

      const col = new THREE.Color().lerpColors(
        new THREE.Color(0xfb923c),
        new THREE.Color(0xa855f7),
        Math.random()
      );
      vortexCols[i * 3] = col.r;
      vortexCols[i * 3 + 1] = col.g;
      vortexCols[i * 3 + 2] = col.b;
    }
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPos, 3));
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(vortexCols, 3));
    const vortexMat = new THREE.PointsMaterial({
      size: 4.2,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const vortexPoints = new THREE.Points(vortexGeo, vortexMat);
    vortexPoints.rotation.x = Math.PI * 0.38;
    vortexPoints.rotation.y = Math.PI * 0.12;
    blackHoleGroup.add(vortexPoints);

    scene.add(blackHoleGroup);

    // ----------------------------------------------------------------------------
    // E. PERIODIC BACKGROUND CELESTIAL PHENOMENA (Shooting Star & Meteor Every 30s)
    // Composited relative to camera space so they streak across the cosmic void
    // at any scroll waypoint without visual obstruction
    // ----------------------------------------------------------------------------
    const celestialGroup = new THREE.Group();
    scene.add(camera);
    camera.add(celestialGroup);

    // 1. Hyper-Velocity Shooting Star (Needle-sharp ion trail + persistent afterglow)
    const shootingStarGroup = new THREE.Group();
    shootingStarGroup.visible = false;
    celestialGroup.add(shootingStarGroup);

    // Active ionization streak
    const ssStreakMat = new THREE.SpriteMaterial({
      map: streakTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const ssStreak = new THREE.Sprite(ssStreakMat);
    shootingStarGroup.add(ssStreak);

    // Intense incandescent head
    const ssHeadMat = new THREE.SpriteMaterial({
      map: starTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const ssHead = new THREE.Sprite(ssHeadMat);
    shootingStarGroup.add(ssHead);

    // Persistent Ion Train (lingering astrophotography trail in mesosphere)
    const ssTrainMat = new THREE.SpriteMaterial({
      map: persistentIonTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const ssTrain = new THREE.Sprite(ssTrainMat);
    shootingStarGroup.add(ssTrain);

    let ssLaunchCount = 0;
    const ssState = {
      active: false,
      startTime: 0,
      duration: 0.52, // realistic ~0.5s hypersonic entry
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      z: -82,
      length: 28,
      // Persistent train afterglow
      trainActive: false,
      trainStartTime: 0,
      trainDuration: 1.8,
      trainCenterX: 0,
      trainCenterY: 0,
      trainAngle: 0,
      trainLen: 0,
    };

    const launchShootingStar = (time) => {
      ssLaunchCount++;
      const fromLeft = ssLaunchCount % 2 === 1;
      ssState.active = true;
      ssState.startTime = time;
      ssState.duration = 0.48 + Math.random() * 0.12; // 0.48s - 0.60s realistic speed
      ssState.z = -78 - Math.random() * 8;
      ssState.length = 26 + Math.random() * 8;

      if (fromLeft) {
        ssState.startX = -68 - Math.random() * 8;
        ssState.startY = 35 + Math.random() * 6;
        ssState.endX = 58 + Math.random() * 12;
        ssState.endY = -14 - Math.random() * 8;
      } else {
        ssState.startX = 68 + Math.random() * 8;
        ssState.startY = 35 + Math.random() * 6;
        ssState.endX = -58 - Math.random() * 12;
        ssState.endY = -14 - Math.random() * 8;
      }

      // Compute persistent train geometry
      const tdx = ssState.endX - ssState.startX;
      const tdy = ssState.endY - ssState.startY;
      ssState.trainLen = Math.hypot(tdx, tdy);
      ssState.trainCenterX = (ssState.startX + ssState.endX) * 0.5;
      ssState.trainCenterY = (ssState.startY + ssState.endY) * 0.5;
      ssState.trainAngle = -Math.atan2(tdx, tdy);

      ssState.trainActive = false;
      ssTrainMat.opacity = 0;
      shootingStarGroup.visible = true;
    };

    // 2. Cosmic Meteor / Bolide (Nucleus, Bow Shock, Fragment Spallation & Smoke Train)
    const meteorGroup = new THREE.Group();
    meteorGroup.visible = false;
    celestialGroup.add(meteorGroup);

    // Wide incandescent plasma wake
    const meteorStreakMat = new THREE.SpriteMaterial({
      map: meteorPlasmaTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const meteorStreak = new THREE.Sprite(meteorStreakMat);
    meteorGroup.add(meteorStreak);

    // Hypersonic Forward Bow Shock Cap
    const meteorBowShockMat = new THREE.SpriteMaterial({
      map: bowShockTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const meteorBowShock = new THREE.Sprite(meteorBowShockMat);
    meteorGroup.add(meteorBowShock);

    // Incandescent fireball halo
    const meteorHaloMat = new THREE.SpriteMaterial({
      map: fireTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const meteorHalo = new THREE.Sprite(meteorHaloMat);
    meteorGroup.add(meteorHalo);

    // 3D Molten Rock Nucleus
    const meteorRockGeo = new THREE.DodecahedronGeometry(1.3, 1);
    const meteorRockMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xf97316,
      emissiveIntensity: 5.0,
      roughness: 0.35,
      fog: false,
    });
    const meteorRock = new THREE.Mesh(meteorRockGeo, meteorRockMat);
    meteorGroup.add(meteorRock);

    // Dynamic Flash Light (illuminates celestial surroundings during terminal airburst)
    const meteorFlashLight = new THREE.PointLight(0xfed7aa, 0, 160, 1.8);
    meteorGroup.add(meteorFlashLight);

    // Secondary Spallation Fragments (aerodynamic breakup under high dynamic pressure)
    const frag1Rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.55, 0),
      new THREE.MeshStandardMaterial({ color: 0xffedd5, emissive: 0xf97316, emissiveIntensity: 4.0, fog: false })
    );
    const frag1HaloMat = new THREE.SpriteMaterial({ map: fireTexture, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    const frag1Halo = new THREE.Sprite(frag1HaloMat);
    frag1Halo.scale.set(7, 7, 1);
    const frag1Group = new THREE.Group();
    frag1Group.add(frag1Rock);
    frag1Group.add(frag1Halo);
    frag1Group.visible = false;
    meteorGroup.add(frag1Group);

    const frag2Rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.42, 0),
      new THREE.MeshStandardMaterial({ color: 0xffedd5, emissive: 0xfbbf24, emissiveIntensity: 3.8, fog: false })
    );
    const frag2HaloMat = new THREE.SpriteMaterial({ map: fireTexture, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    const frag2Halo = new THREE.Sprite(frag2HaloMat);
    frag2Halo.scale.set(5.5, 5.5, 1);
    const frag2Group = new THREE.Group();
    frag2Group.add(frag2Rock);
    frag2Group.add(frag2Halo);
    frag2Group.visible = false;
    meteorGroup.add(frag2Group);

    // Mesospheric Billowing Smoke Puffs (Chelyabinsk-style Bolide Dust Wake)
    const smokePuffCount = 30;
    const smokePuffs = [];
    const smokePuffMats = [];

    for (let i = 0; i < smokePuffCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: smokePuffTexture,
        transparent: true,
        opacity: 0,
        blending: THREE.NormalBlending,
        depthWrite: false,
        fog: false,
      });
      smokePuffMats.push(mat);
      const sprite = new THREE.Sprite(mat);
      sprite.visible = false;
      meteorGroup.add(sprite);

      smokePuffs.push({
        sprite,
        mat,
        active: false,
        birthTime: 0,
        x: 0,
        y: 0,
        z: 0,
        baseScale: 3.5,
        maxScale: 17.0,
        driftX: 0,
        driftY: 0,
        duration: 3.2,
      });
    }

    // Dynamic Spark Embers (48 particles trailing backwards)
    const sparkCount = 48;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);
    const sparkVelocities = [];

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = 0;
      sparkPositions[i * 3 + 1] = 0;
      sparkPositions[i * 3 + 2] = 0;

      sparkColors[i * 3] = 1.0;
      sparkColors[i * 3 + 1] = 0.8;
      sparkColors[i * 3 + 2] = 0.3;

      sparkVelocities.push({
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
      });
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 4.5,
      sizeAttenuation: false,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    meteorGroup.add(sparkPoints);

    let meteorLaunchCount = 0;
    const meteorState = {
      active: false,
      startTime: 0,
      duration: 2.2,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      z: -76,
      lastPuffProgress: 0,
      nextPuffIdx: 0,
    };

    const launchMeteor = (time) => {
      meteorLaunchCount++;
      const fromRight = meteorLaunchCount % 2 === 1;
      meteorState.active = true;
      meteorState.startTime = time;
      meteorState.duration = 2.2 + Math.random() * 0.25;
      meteorState.z = -74 - Math.random() * 8;
      meteorState.lastPuffProgress = 0;

      if (fromRight) {
        meteorState.startX = 64 + Math.random() * 8;
        meteorState.startY = 35 + Math.random() * 5;
        meteorState.endX = -58 - Math.random() * 12;
        meteorState.endY = -24 - Math.random() * 8;
      } else {
        meteorState.startX = -64 - Math.random() * 8;
        meteorState.startY = 35 + Math.random() * 5;
        meteorState.endX = 58 + Math.random() * 12;
        meteorState.endY = -24 - Math.random() * 8;
      }

      for (let i = 0; i < smokePuffCount; i++) {
        smokePuffs[i].active = false;
        smokePuffs[i].sprite.visible = false;
        smokePuffMats[i].opacity = 0;
      }

      for (let s = 0; s < sparkCount; s++) {
        sparkVelocities[s].life = 0;
      }
      frag1Group.visible = false;
      frag2Group.visible = false;
      meteorGroup.visible = true;
    };

    let lastSSCycle = -1;
    let lastMeteorCycle = -1;

    const handleCelestialKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      const key = (e.key || '').toLowerCase();
      const code = e.code || '';
      if (key === 's' || code === 'KeyS') {
        launchShootingStar(clock.getElapsedTime());
      } else if (key === 'm' || code === 'KeyM') {
        launchMeteor(clock.getElapsedTime());
      }
    };
    window.addEventListener('keydown', handleCelestialKey);

    window.__triggerShootingStar = () => launchShootingStar(clock.getElapsedTime());
    window.__triggerMeteor = () => launchMeteor(clock.getElapsedTime());

    // ============================================================================
    // CAMERA 3D SPLINE FLIGHT PATH
    // ============================================================================
    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, 55),       // 0% - Hero: Facing LHS 1140 b Ocean Super-Earth
      new THREE.Vector3(26, 6, -95),     // 33% - Works: Orbiting 6,000 Exoplanets Fleet & Beta Pic
      new THREE.Vector3(-22, -4, -220),  // 66% - Services: Witnessing EP260321a Pre-Supernova Flash
      new THREE.Vector3(0, 2, -370),     // 100% - Contact: Approaching Sagittarius A* Black Hole
    ]);

    const targetLookPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 3, -40),     // Looking toward portrait and LHS 1140 b in upper sky
      new THREE.Vector3(48, 8, -140),    // Looking at Beta Pictoris & GJ 523b
      new THREE.Vector3(-38, -6, -260),  // Looking at EP260321a Flash
      new THREE.Vector3(0, 0, -420),     // Looking into Sagittarius A* & Star S301
    ]);

    // ============================================================================
    // MOUSE & SCROLL STATE TRACKING
    // ============================================================================
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const scroll = {
      current: 0,
      target: 0,
      velocity: 0,
    };

    let lastScrollY = window.scrollY || 0;
    let lastTime = performance.now();

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 2;
      mouse.targetY = (e.clientY / height - 0.5) * 2;
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      scroll.target = cosmicProgressRef.current;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const deltaY = scrollY - lastScrollY;
      scroll.velocity = (deltaY / dt) * 16.6;

      lastScrollY = scrollY;
      lastTime = now;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    onScroll();

    // ============================================================================
    // MAIN ANIMATION RENDER LOOP (60fps)
    // ============================================================================
    let animId;
    let clock = new THREE.Clock();

    const currentCamPos = new THREE.Vector3();
    const currentLookPos = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Lerp mouse parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth scroll interpolation synced with cosmic waypoint progress
      scroll.target = cosmicProgressRef.current;
      scroll.current += (scroll.target - scroll.current) * 0.07;
      scroll.velocity *= 0.88;

      // 1. Position camera along 3D Catmull-Rom spline
      const splineT = Math.min(1, Math.max(0, scroll.current));
      const targetPos = cameraPath.getPointAt(splineT);
      const targetLook = targetLookPath.getPointAt(splineT);

      // Add gentle mouse parallax to camera
      targetPos.x += mouse.x * 3.5;
      targetPos.y -= mouse.y * 2.5;

      currentCamPos.lerp(targetPos, 0.12);
      currentLookPos.lerp(targetLook, 0.12);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookPos);

      // Scoped Visibility per Discovery Stage (prevents distant sectors bleeding into hero view)
      lhsGroup.visible = splineT < 0.28;
      exoplanetGroup.visible = splineT > 0.12 && splineT < 0.58;
      deathFlashGroup.visible = splineT > 0.42 && splineT < 0.86;
      blackHoleGroup.visible = splineT > 0.68;

      // 2. Animate Celestial Bodies ONLY when in active visible range
      if (lhsGroup.visible) {
        lhsPlanet.rotation.y = elapsed * 0.12;
        cloudShell.rotation.y = elapsed * 0.18;
        lhsAtmo.rotation.z = Math.sin(elapsed * 0.2) * 0.05;
      }

      if (exoplanetGroup.visible) {
        betaStar.rotation.y = elapsed * 0.08;
        debrisDisk.rotation.z = elapsed * 0.035;
        giantPlanet.position.set(
          Math.cos(elapsed * 0.45) * 26,
          Math.sin(elapsed * 0.45) * 26 * 0.28,
          Math.sin(elapsed * 0.45) * 26 * 0.85
        );
        giantPlanet.rotation.y = elapsed * 0.6;
        megaEarth.position.set(
          Math.cos(elapsed * 0.8 + 1.5) * 34,
          Math.sin(elapsed * 0.8 + 1.5) * 34 * 0.28,
          Math.sin(elapsed * 0.8 + 1.5) * 34 * 0.85
        );
        megaEarth.rotation.y = elapsed * 0.7;
        fleetPoints.rotation.y = elapsed * 0.05;
      }

      if (deathFlashGroup.visible) {
        deathFlashGroup.rotation.y = elapsed * 0.06;
        explodingCore.scale.setScalar(1 + Math.sin(elapsed * 4.8) * 0.06);
        shockwaveRings.forEach((r, idx) => {
          r.rotation.z = elapsed * (0.18 + idx * 0.08);
        });
        flashPoints.rotation.z = elapsed * 0.12;
      }

      if (blackHoleGroup.visible) {
        vortexPoints.rotation.z = elapsed * 0.28;
        photonRing.rotation.z = -elapsed * 0.15;
        accretionRing.rotation.z = elapsed * 0.05;
        redCorona.rotation.y = elapsed * 0.04;

        const s301Angle = elapsed * 3.4;
        starS301.position.set(
          Math.cos(s301Angle) * 28,
          Math.sin(s301Angle) * 20 * 0.32,
          Math.sin(s301Angle) * 20
        );
      }

      // High-speed warp stretch on fast scroll
      if (Math.abs(scroll.velocity) > 1.2) {
        starField.position.z += scroll.velocity * 0.15;
        if (starField.position.z > 80) starField.position.z = -80;
        if (starField.position.z < -80) starField.position.z = 80;
      } else {
        starField.position.z *= 0.95;
      }

      // 3. Periodic Background Shooting Star & Meteor Scheduler (Every 30 seconds)
      const ssCycle = Math.floor((elapsed - 5.0) / 30.0);
      if (ssCycle >= 0 && ssCycle > lastSSCycle) {
        lastSSCycle = ssCycle;
        launchShootingStar(elapsed);
      }

      const meteorCycle = Math.floor((elapsed - 18.0) / 30.0);
      if (meteorCycle >= 0 && meteorCycle > lastMeteorCycle) {
        lastMeteorCycle = meteorCycle;
        launchMeteor(elapsed);
      }

      // Animate Hyper-Velocity Shooting Star (0.46s hypersonic entry + 1.6s persistent ion train)
      if (ssState.active || ssState.trainActive) {
        const headProgress = (elapsed - ssState.startTime) / ssState.duration;

        if (headProgress < 1.0 && ssState.active) {
          // 1. Head is actively streaking at hypersonic speed
          const headX = ssState.startX + (ssState.endX - ssState.startX) * headProgress;
          const headY = ssState.startY + (ssState.endY - ssState.startY) * headProgress;
          const headZ = ssState.z;

          const dx = ssState.endX - ssState.startX;
          const dy = ssState.endY - ssState.startY;
          const len = Math.hypot(dx, dy) || 1;
          const ndx = dx / len;
          const ndy = dy / len;

          // Atmospheric heating & vaporization curve
          let opacity = 1.0;
          let microBurst = 1.0;
          if (headProgress < 0.18) {
            opacity = Math.pow(headProgress / 0.18, 1.8);
          } else if (headProgress > 0.65) {
            opacity = Math.max(0, 1.0 - (headProgress - 0.65) / 0.35);
          }

          // Grain fragmentation micro-flash around peak ablation (progress 0.50 - 0.62)
          if (headProgress > 0.50 && headProgress < 0.62) {
            microBurst = 1.0 + Math.sin((headProgress - 0.50) / 0.12 * Math.PI) * 0.75;
          }

          ssHeadMat.opacity = opacity * microBurst;
          ssStreakMat.opacity = opacity * 0.95 * microBurst;

          const streakLen = ssState.length * Math.min(1.0, headProgress * 4.0) * microBurst;
          ssStreak.scale.set(7.5 * microBurst, streakLen, 1.0);
          ssStreak.material.rotation = -Math.atan2(dx, dy);
          ssStreak.position.set(
            headX - ndx * (streakLen * 0.5),
            headY - ndy * (streakLen * 0.5),
            headZ
          );

          ssHead.position.set(headX, headY, headZ);
          ssHead.scale.set(11.0 * microBurst, 11.0 * microBurst, 1.0);
          ssHead.visible = true;
          ssStreak.visible = true;

          // Start lingering persistent train behind the head (progressively grows behind head)
          ssState.trainActive = true;
          ssState.trainStartTime = elapsed;
          const curLen = Math.hypot(headX - ssState.startX, headY - ssState.startY);
          ssTrain.position.set(
            (ssState.startX + headX) * 0.5,
            (ssState.startY + headY) * 0.5,
            headZ - 0.5
          );
          ssTrain.scale.set(3.8, Math.max(0.1, curLen), 1.0);
          ssTrain.material.rotation = ssState.trainAngle;
          ssTrainMat.opacity = Math.min(0.88, headProgress * 1.3);
          ssTrain.visible = true;
        } else {
          // Head has burned out!
          ssState.active = false;
          ssHead.visible = false;
          ssStreak.visible = false;

          // Fade persistent ion train lingering in the mesosphere for 1.6 seconds!
          const trainAge = elapsed - ssState.trainStartTime;
          const trainT = trainAge / ssState.trainDuration;
          if (trainT >= 1.0) {
            ssState.trainActive = false;
            ssTrain.visible = false;
            shootingStarGroup.visible = false;
            ssHead.visible = true;
            ssStreak.visible = true;
          } else {
            // Smooth natural decay with slight high-altitude wind drift
            const trainFade = (1.0 - trainT);
            ssTrainMat.opacity = Math.pow(trainFade, 1.1) * 0.85;
            ssTrain.position.x = ssState.trainCenterX + trainT * 1.6;
            ssTrain.scale.set(3.8 + trainT * 4.2, ssState.trainLen, 1.0);
          }
        }
      }

      // Animate Cosmic Meteor / Bolide (Bow Shock, Spallation Fragments, Smoke Puffs & Airburst)
      if (meteorState.active || smokePuffs.some((p) => p.active)) {
        const progress = (elapsed - meteorState.startTime) / meteorState.duration;

        if (progress < 1.0 && meteorState.active) {
          const headX = meteorState.startX + (meteorState.endX - meteorState.startX) * progress;
          const arcY = Math.sin(progress * Math.PI) * 4.8;
          const headY = meteorState.startY + (meteorState.endY - meteorState.startY) * progress - arcY;
          const headZ = meteorState.z;

          // Local tangent direction including parabolic curvature
          const dx = meteorState.endX - meteorState.startX;
          const dy = (meteorState.endY - meteorState.startY) - Math.cos(progress * Math.PI) * (4.8 * Math.PI);
          const len = Math.hypot(dx, dy) || 1;
          const ndx = dx / len;
          const ndy = dy / len;
          const angle = -Math.atan2(dx, dy);

          let opacity = 1.0;
          let flare = 1.0;
          if (progress < 0.12) {
            opacity = progress / 0.12;
          } else if (progress > 0.88) {
            opacity = (1.0 - progress) / 0.12;
          }

          // Terminal Catastrophic Airburst Flare (at progress 0.76 to 0.90)
          let flashLightIntensity = 0;
          if (progress > 0.76 && progress < 0.90) {
            const burstT = (progress - 0.76) / 0.14;
            flare = 1.0 + Math.sin(burstT * Math.PI) * 2.8; // intense 3.8x flash
            flashLightIntensity = Math.sin(burstT * Math.PI) * 2.6;
          }

          meteorFlashLight.position.set(headX, headY, headZ);
          meteorFlashLight.intensity = flashLightIntensity;

          // Molten Rock Nucleus
          meteorRock.position.set(headX, headY, headZ);
          meteorRock.rotation.x = elapsed * 6.5;
          meteorRock.rotation.y = elapsed * 4.5;
          meteorRockMat.emissiveIntensity = 5.0 * flare;

          // Hypersonic Bow Shock
          meteorBowShock.position.set(headX + ndx * 1.4, headY + ndy * 1.4, headZ + 0.2);
          meteorBowShock.scale.set(13.0 * flare, 13.0 * flare, 1.0);
          meteorBowShock.material.rotation = angle;
          meteorBowShockMat.opacity = opacity * 0.96 * flare;

          // Flaming Corona Halo
          meteorHalo.position.set(headX, headY, headZ);
          meteorHaloMat.opacity = opacity * 0.92;
          meteorHalo.scale.set(18.0 * flare, 18.0 * flare, 1.0);

          // Fiery Plasma Wake
          const streakLen = 50.0 * Math.min(1.0, progress * 3.2);
          meteorStreak.scale.set(9.0 * flare, streakLen, 1.0);
          meteorStreak.material.rotation = angle;
          meteorStreak.position.set(
            headX - ndx * (streakLen * 0.5),
            headY - ndy * (streakLen * 0.5),
            headZ
          );
          meteorStreakMat.opacity = opacity * 0.90;

          // Secondary Fragment Spallation 1 (detaches at progress 0.38 - 0.65)
          if (progress > 0.38 && progress < 0.65) {
            const frag1T = (progress - 0.38) / 0.27;
            const lagDist = 3.5 + frag1T * 6.0;
            const offDist = Math.sin(frag1T * Math.PI) * 2.5;
            frag1Group.position.set(
              headX - ndx * lagDist - ndy * offDist,
              headY - ndy * lagDist + ndx * offDist,
              headZ
            );
            frag1HaloMat.opacity = (1.0 - frag1T) * opacity * 0.85;
            frag1Group.visible = true;
          } else {
            frag1Group.visible = false;
          }

          // Secondary Fragment Spallation 2 (detaches at progress 0.60 - 0.84)
          if (progress > 0.60 && progress < 0.84) {
            const frag2T = (progress - 0.60) / 0.24;
            const lagDist = 4.0 + frag2T * 7.5;
            const offDist = -Math.sin(frag2T * Math.PI) * 3.2;
            frag2Group.position.set(
              headX - ndx * lagDist - ndy * offDist,
              headY - ndy * lagDist + ndx * offDist,
              headZ
            );
            frag2HaloMat.opacity = (1.0 - frag2T) * opacity * 0.8;
            frag2Group.visible = true;
          } else {
            frag2Group.visible = false;
          }

          // Emit billowing mesospheric smoke puffs along the true parabolic arc
          if (progress - meteorState.lastPuffProgress >= 0.032) {
            meteorState.lastPuffProgress = progress;
            const puff = smokePuffs[meteorState.nextPuffIdx % smokePuffCount];
            meteorState.nextPuffIdx++;
            puff.active = true;
            puff.birthTime = elapsed;
            puff.x = headX + (Math.random() - 0.5) * 1.5;
            puff.y = headY + (Math.random() - 0.5) * 1.5;
            puff.z = headZ + (Math.random() - 0.5) * 1.0;
            puff.driftX = (Math.random() - 0.5) * 1.2 - ndx * 1.2;
            puff.driftY = (Math.random() - 0.5) * 1.2 - ndy * 1.2;
            puff.baseScale = 3.8;
            puff.maxScale = flare > 1.2 ? 22.0 : 16.0;
            puff.duration = 3.2;
            puff.sprite.position.set(puff.x, puff.y, puff.z);
            puff.sprite.scale.set(puff.baseScale, puff.baseScale, 1);
            puff.sprite.visible = true;
          }

          // Update sparks
          const spkPositions = sparkGeo.attributes.position.array;
          const spkCols = sparkGeo.attributes.color.array;
          for (let s = 0; s < sparkCount; s++) {
            const spk = sparkVelocities[s];
            if (spk.life <= 0 && Math.random() < 0.45) {
              spkPositions[s * 3] = headX + (Math.random() - 0.5) * 2.0;
              spkPositions[s * 3 + 1] = headY + (Math.random() - 0.5) * 2.0;
              spkPositions[s * 3 + 2] = headZ + (Math.random() - 0.5) * 2.0;
              spk.vx = -ndx * 9.5 + (Math.random() - 0.5) * 5.0;
              spk.vy = -ndy * 9.5 + (Math.random() - 0.5) * 5.0;
              spk.vz = (Math.random() - 0.5) * 3.0;
              spk.life = 1.0;
            } else if (spk.life > 0) {
              spk.life -= 0.04;
              spkPositions[s * 3] += spk.vx * 0.14;
              spkPositions[s * 3 + 1] += spk.vy * 0.14;
              spkPositions[s * 3 + 2] += spk.vz * 0.14;

              spkCols[s * 3] = spk.life * opacity * flare;
              spkCols[s * 3 + 1] = spk.life * 0.75 * opacity * flare;
              spkCols[s * 3 + 2] = spk.life * 0.28 * opacity;
            }
          }
          sparkGeo.attributes.position.needsUpdate = true;
          sparkGeo.attributes.color.needsUpdate = true;
        } else {
          // Bolide burned out!
          meteorState.active = false;
          meteorRock.visible = false;
          meteorHalo.visible = false;
          meteorStreak.visible = false;
          meteorBowShock.visible = false;
          frag1Group.visible = false;
          frag2Group.visible = false;
          meteorFlashLight.intensity = 0;
        }

        // Animate all billowing mesospheric smoke puffs
        let anyPuffActive = false;
        for (let i = 0; i < smokePuffCount; i++) {
          const puff = smokePuffs[i];
          if (!puff.active) continue;

          const puffAge = elapsed - puff.birthTime;
          const puffT = puffAge / puff.duration;
          if (puffT >= 1.0) {
            puff.active = false;
            puff.sprite.visible = false;
          } else {
            anyPuffActive = true;
            const curScale = puff.baseScale + (puff.maxScale - puff.baseScale) * Math.pow(puffT, 0.55);
            puff.sprite.scale.set(curScale, curScale, 1);
            puff.sprite.position.set(
              puff.x + puff.driftX * (puffAge * 0.75),
              puff.y + puff.driftY * (puffAge * 0.75),
              puff.z
            );
            const fade = Math.pow(1.0 - puffT, 1.2) * (puffT < 0.1 ? (puffT / 0.1) * 0.65 : 0.65);
            puff.mat.opacity = fade;

            if (puffT < 0.22) {
              // Incandescent glowing mineral vapor
              puff.mat.color.setRGB(1.0, 0.72, 0.42);
            } else {
              // Cooling silicate/iron slate grey mesospheric smoke
              const coolT = (puffT - 0.22) / 0.78;
              puff.mat.color.setRGB(1.0 - coolT * 0.42, 0.72 - coolT * 0.08, 0.42 + coolT * 0.32);
            }
            puff.sprite.visible = true;
          }
        }

        if (!meteorState.active && !anyPuffActive) {
          meteorGroup.visible = false;
          meteorRock.visible = true;
          meteorHalo.visible = true;
          meteorStreak.visible = true;
          meteorBowShock.visible = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', handleCelestialKey);

      delete window.__triggerShootingStar;
      delete window.__triggerMeteor;

      try {
        starGeo.dispose();
        starMaterial.dispose();
        ssHeadMat.dispose();
        ssStreakMat.dispose();
        ssTrainMat.dispose();
        meteorStreakMat.dispose();
        meteorBowShockMat.dispose();
        meteorHaloMat.dispose();
        smokePuffMats.forEach((m) => m.dispose());
        meteorRockGeo.dispose();
        meteorRockMat.dispose();
        frag1Rock.geometry.dispose();
        frag1Rock.material.dispose();
        frag1HaloMat.dispose();
        frag2Rock.geometry.dispose();
        frag2Rock.material.dispose();
        frag2HaloMat.dispose();
        sparkGeo.dispose();
        sparkMat.dispose();
        streakTexture.dispose();
        persistentIonTexture.dispose();
        bowShockTexture.dispose();
        smokePuffTexture.dispose();
        meteorPlasmaTexture.dispose();
        fireTexture.dispose();
        lhsGeo.dispose();
        lhsMat.dispose();
        betaStarGeo.dispose();
        betaStarMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        shadowGeo.dispose();
        shadowMat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (err) {
        console.warn('Three.js cleanup error:', err);
      }
    };
  }, [
    createParticleTexture,
    createFireTexture,
    createStreakTexture,
    createPersistentIonTexture,
    createBowShockTexture,
    createSmokePuffTexture,
    createMeteorPlasmaTexture,
    createOceanPlanetTexture,
    createGasGiantTexture,
    createMegaEarthTexture,
    createDebrisDiskTexture,
    createAccretionRingTexture,
  ]);



  return (
    <>
      {/* 3D WebGL Background Canvas Container (80% Opacity to keep content in focus) */}
      <div 
        ref={mountRef} 
        className={`cosmic-canvas-container ${isCinematicMode ? 'cinematic' : ''}`}
        aria-hidden="true" 
      />

      {/* =========================================================================
          TOP TELEMETRY HUD BAR
          ========================================================================= */}
      <header aria-label="Astronomical Discoveries HUD" className="cosmic-hud-top">
        {/* Action Controls: Cinematic Galaxy Mode */}
        <div className="cosmic-hud-actions">
          {/* Cinematic / Unobstructed 3D Galaxy Toggle */}
          <button
            type="button"
            onClick={() => setIsCinematicMode(!isCinematicMode)}
            className={`cosmic-hud-btn ${isCinematicMode ? 'active' : ''}`}
            title={isCinematicMode ? 'Restore UI Content' : 'Explore 3D Cosmos Fullscreen'}
            aria-label="Toggle Cinematic Mode"
          >
            {isCinematicMode ? <EyeOff className="w-3.5 h-3.5" style={{ color: '#34d399' }} /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isCinematicMode ? 'EXIT GALAXY' : 'EXPLORE GALAXY'}</span>
          </button>
        </div>
      </header>



      {/* =========================================================================
          HORIZONTAL TRANSIT ROUTE MAP BANNER (Subway / Metro Map Style from Image 2)
          ========================================================================= */}
      {isCinematicMode && (
        <aside aria-label="Cosmic Odyssey Route Map" className="cosmic-cinematic-prompt">
          <div className="cosmic-cinematic-box">
            {/* Top Telemetry Header */}
            <div className="cosmic-route-header">
              <div className="cosmic-immersion-badge">
                <span>Astronomical Immersion Active</span>
              </div>
              <div className="cosmic-telemetry-tag">
                <span>SECTOR {COSMIC_SECTORS[activeSectorIdx]?.code}:</span>
                <span className="cosmic-telemetry-val">
                  {COSMIC_SECTORS[activeSectorIdx]?.name.toUpperCase()} ({COSMIC_SECTORS[activeSectorIdx]?.distance})
                </span>
              </div>
            </div>

            {/* Horizontal Subway / Metro Rail Route Map */}
            <div className="cosmic-transit-rail-container">
              {/* Background Parallel Double Rail (Subway Track) */}
              <div className="cosmic-double-track-bg" aria-hidden="true">
                <div className="cosmic-track-line track-top" />
                <div className="cosmic-track-line track-bottom" />
              </div>

              {/* Dynamic Active Illuminated Progress Rail (from Station 01 up to current train position) */}
              <div 
                className="cosmic-double-track-fill" 
                style={{ width: `calc(75% * ${scrollProgress})` }}
                aria-hidden="true"
              >
                <div className="cosmic-fill-line track-top" />
                <div className="cosmic-fill-line track-bottom" />
                {/* Gliding Micro-Shuttle / Train at the leading head of the rail fill */}
                <div className="cosmic-rail-shuttle">
                  <RocketProgressIcon className="cosmic-micro-shuttle" />
                </div>
              </div>

              {/* Stations Grid / Row */}
              <div className="cosmic-stations-row" role="tablist" aria-label="Cosmic Waypoints">
                {COSMIC_SECTORS.map((sector, index) => {
                  const isCurrent = index === activeSectorIdx;
                  const isPassed = index < activeSectorIdx;
                  return (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => handleStationClick(sector.id)}
                      className={`cosmic-station-node ${isCurrent ? 'is-active' : ''} ${isPassed ? 'is-passed' : 'is-upcoming'}`}
                      style={{
                        '--station-color': sector.color,
                        '--station-border': sector.border,
                        '--station-bg': sector.bg,
                      }}
                      title={`Warp to Station ${sector.code}: ${sector.title} (${sector.distance})`}
                      aria-label={`Station ${sector.code}: ${sector.name}. ${isCurrent ? 'Current location' : 'Click to warp here'}`}
                      aria-current={isCurrent ? 'step' : undefined}
                    >
                      {/* Circular Station Number Badge (Image 2 style) */}
                      <div className="cosmic-station-circle-wrap">
                        {isCurrent && <span className="cosmic-station-radar" />}
                        <div className="cosmic-station-circle">
                          <span>{sector.code}</span>
                        </div>
                      </div>

                      {/* Station Name & Subtitle */}
                      <div className="cosmic-station-details">
                        <span className="cosmic-station-name">{sector.name}</span>
                        <span className="cosmic-station-distance">{sector.distance}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="cosmic-route-footer">
              <button
                type="button"
                onClick={() => setIsCinematicMode(false)}
                className="cosmic-return-btn"
                aria-label="Exit galaxy and return to portfolio view"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Return to Portfolio View</span>
              </button>
              <div className="cosmic-route-hint">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Scroll or click station to warp</span>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
