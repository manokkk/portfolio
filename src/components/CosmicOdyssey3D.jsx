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
    color: '#0ea5e9', // Sky Cyan (Image 2 station badge style)
    border: '#38bdf8',
    bg: 'rgba(14, 165, 233, 0.25)',
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
    color: '#f59e0b', // Amber / Orange
    border: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.25)',
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
    color: '#f43f5e', // Coral / Red-Orange
    border: '#fb7185',
    bg: 'rgba(244, 63, 94, 0.25)',
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
    color: '#a855f7', // Violet / Purple
    border: '#c084fc',
    bg: 'rgba(168, 85, 247, 0.25)',
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

  // Real-time responsive scroll tracking for horizontal transit route map
  useEffect(() => {
    let ticking = false;
    let lastIdx = -1;

    const handleScrollTracking = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || window.pageYOffset || 0;
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const ratio = Math.min(1, Math.max(0, currentY / maxScroll));
          setScrollProgress(ratio);

          let idx = 0;
          if (ratio >= 0.82) idx = 3;
          else if (ratio >= 0.52) idx = 2;
          else if (ratio >= 0.22) idx = 1;

          if (idx !== lastIdx) {
            lastIdx = idx;
            setActiveSectorIdx(idx);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    handleScrollTracking();

    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  const handleStationClick = (targetId) => {
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      let targetRatio = 0;
      if (targetId === 'projects') targetRatio = 0.32;
      else if (targetId === 'services') targetRatio = 0.62;
      else if (targetId === 'contact') targetRatio = 0.95;
      window.scrollTo({ top: targetRatio * maxScroll, behavior: 'smooth' });
    }
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
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const normalized = Math.min(1, Math.max(0, scrollY / maxScroll));
      scroll.target = normalized;

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

      // Smooth scroll interpolation
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

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      try {
        starGeo.dispose();
        starMaterial.dispose();
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
                <span className="cosmic-immersion-dot" />
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

              {/* Dynamic Active Illuminated Progress Rail */}
              <div 
                className="cosmic-double-track-fill" 
                style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
                aria-hidden="true"
              >
                <div className="cosmic-fill-line track-top" />
                <div className="cosmic-fill-line track-bottom" />
                {/* Gliding Micro-Shuttle along the rail */}
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
