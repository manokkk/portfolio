import React, { useEffect, useRef, useState } from 'react';
import { Layers, Sparkles, Globe, Box, Waves, Zap, ChevronUp, ChevronDown, Compass } from 'lucide-react';

export const BACKGROUND_MODES = [
  { id: 'terrain', label: '1. Cyber Terrain', icon: Layers, desc: '3D Waveform Grid' },
  { id: 'particles', label: '2. Constellation', icon: Sparkles, desc: '3D Particle Network' },
  { id: 'globe', label: '3. 3D Globe', icon: Globe, desc: 'Interactive Cyber Earth' },
  { id: 'polyhedra', label: '4. Polyhedra', icon: Box, desc: 'Floating 3D Crystals' },
  { id: 'liquid', label: '5. Liquid Wave', icon: Waves, desc: 'Kinetic 3D Fluid' },
  { id: 'warp', label: '6. Warp Speed', icon: Zap, desc: 'Hyperspace Tunnel' },
];

export default function Background3D() {
  const [currentMode, setCurrentMode] = useState('terrain'); // Default to Option 1
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse Tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      rawX: null,
      rawY: null,
      active: false,
    };

    // Scroll Tracking with Physics (Progress & Velocity)
    const scroll = {
      y: window.scrollY || 0,
      targetY: window.scrollY || 0,
      progress: 0,
      velocity: 0,
      targetVelocity: 0,
      travelDist: 0,
    };

    let lastScrollY = window.scrollY || 0;
    let lastScrollTime = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.rawX = e.clientX;
      mouse.rawY = e.clientY;
      mouse.targetX = (e.clientX - width / 2) / (width / 2);
      mouse.targetY = (e.clientY - height / 2) / (height / 2);
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.rawX = null;
      mouse.rawY = null;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime);
      const delta = currentY - lastScrollY;

      scroll.targetY = currentY;
      const instantVel = (delta / dt) * 16.6;
      scroll.targetVelocity += instantVel * 0.35;
      scroll.targetVelocity = Math.max(-45, Math.min(45, scroll.targetVelocity));

      lastScrollY = currentY;
      lastScrollTime = now;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let time = 0;
    let uiUpdateCounter = 0;

    // ==========================================================
    // 1. CYBER WIREFRAME TERRAIN (Scroll travel + pitch + swell)
    // ==========================================================
    const terrain = {
      cols: 32,
      rows: 26,
      spacingX: 42,
      spacingZ: 38,
      fov: 380,
      camY: 175,
    };

    const renderTerrain = () => {
      // Accelerate time on scroll velocity
      time += 0.016 + Math.abs(scroll.velocity) * 0.003;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const fov = terrain.fov;
      // Horizon tilts and camera altitude dives as user scrolls through sections
      const horizonY = height * (0.54 - scroll.progress * 0.12) + mouse.y * 45;
      const originX = width * 0.5 + mouse.x * 65;
      const totalW = (terrain.cols - 1) * terrain.spacingX;
      const dynamicCamY = terrain.camY - scroll.progress * 50;

      // Direct travel displacement synchronized with scroll position
      const scrollTravel = scroll.y * 0.004 + time * 1.15;
      const velSwell = Math.min(25, Math.abs(scroll.velocity) * 0.7);

      const grid = [];
      for (let r = 0; r < terrain.rows; r++) {
        const row = [];
        const zDist = 120 + r * terrain.spacingZ;

        for (let c = 0; c < terrain.cols; c++) {
          const worldX = (c / (terrain.cols - 1) - 0.5) * totalW * 1.5;
          const waveX = c * 0.28;
          const waveZ = r * 0.28 - scrollTravel;

          let worldY =
            Math.sin(waveX + time) * (20 + velSwell * 0.25) +
            Math.cos(waveZ) * (24 + velSwell * 0.3) +
            Math.sin(waveX * 0.5 + waveZ * 0.5) * 12;

          // Local cursor ripple
          if (mouse.active && mouse.rawX !== null) {
            const tempScale = fov / (fov + zDist);
            const tempX = originX + worldX * tempScale;
            const tempY = horizonY + (dynamicCamY + worldY) * tempScale;
            const d = Math.hypot(tempX - mouse.rawX, tempY - mouse.rawY);
            if (d < 180) {
              worldY += Math.cos((d / 180) * Math.PI) * 42;
            }
          }

          const scale = fov / (fov + zDist);
          const screenX = originX + worldX * scale;
          const screenY = horizonY + (dynamicCamY + worldY) * scale;
          const depthRatio = 1 - r / terrain.rows;

          row.push({ x: screenX, y: screenY, scale, depthRatio });
        }
        grid.push(row);
      }

      // Horizontal lines
      for (let r = 0; r < terrain.rows; r++) {
        const row = grid[r];
        const depth = row[0].depthRatio;
        if (depth <= 0.05) continue;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.pow(depth, 1.3) * (0.42 + velSwell * 0.008)})`;
        ctx.lineWidth = Math.max(0.6, depth * 1.25);
        for (let c = 0; c < terrain.cols; c++) {
          if (c === 0) ctx.moveTo(row[c].x, row[c].y);
          else ctx.lineTo(row[c].x, row[c].y);
        }
        ctx.stroke();
      }

      // Longitudinal lines
      for (let c = 0; c < terrain.cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < terrain.rows; r++) {
          const pt = grid[r][c];
          ctx.strokeStyle = `rgba(52, 211, 153, ${Math.pow(pt.depthRatio, 1.3) * 0.35})`;
          ctx.lineWidth = Math.max(0.5, pt.depthRatio * 1.1);
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Vertex nodes
      for (let r = 0; r < Math.floor(terrain.rows * 0.65); r += 2) {
        for (let c = 0; c < terrain.cols; c += 2) {
          const pt = grid[r][c];
          if (pt.depthRatio > 0.45) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(1, pt.scale * 2.6), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${(pt.depthRatio - 0.4) * 0.95})`;
            ctx.fill();
          }
        }
      }
    };

    // ==========================================================
    // 2. 3D PARTICLE CONSTELLATION (Fly-through + Scroll Orbit)
    // ==========================================================
    const particles = [];
    const P_COUNT = width < 768 ? 48 : 88;
    for (let i = 0; i < P_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 0.9,
        y: (Math.random() - 0.5) * height * 0.9,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.35,
        color: i % 3 === 0 ? '56, 189, 248' : i % 3 === 1 ? '52, 211, 153' : '168, 85, 247',
        r: Math.random() * 1.5 + 1.2,
      });
    }

    const renderParticles = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 3D perspective rotates with scroll progress
      const scrollRotY = scroll.progress * Math.PI * 0.8;
      const scrollRotX = Math.sin(scroll.progress * Math.PI) * 0.3;
      const cosY = Math.cos(mouse.x * 0.35 + scrollRotY);
      const sinY = Math.sin(mouse.x * 0.35 + scrollRotY);
      const cosX = Math.cos(-mouse.y * 0.25 + scrollRotX);
      const sinX = Math.sin(-mouse.y * 0.25 + scrollRotX);
      const fov = 420;
      const cx = width / 2;
      const cy = height / 2;

      // Scroll speed drives camera forward travel through Z
      const zScrollDelta = 0.35 + scroll.velocity * 1.8;

      const projected = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z -= (p.vz + zScrollDelta);

        // Infinite wrap in 3D volume
        if (p.x < -width / 2) p.x = width / 2;
        if (p.x > width / 2) p.x = -width / 2;
        if (p.y < -height / 2) p.y = height / 2;
        if (p.y > height / 2) p.y = -height / 2;
        if (p.z < -260) p.z = 260;
        if (p.z > 260) p.z = -260;

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const depth = fov + z2;
        if (depth > 10) {
          const scale = fov / depth;
          projected.push({
            p,
            projX: cx + x1 * scale,
            projY: cy + y2 * scale,
            scale,
            alpha: Math.min(1, scale * 0.72),
          });
        }
      }

      // Constellation links
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dist3D = Math.hypot(p1.p.x - p2.p.x, p1.p.y - p2.p.y, p1.p.z - p2.p.z);
          if (dist3D < 118) {
            const alpha = (1 - dist3D / 118) * 0.22 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render nodes & dynamic velocity streaks
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, p.p.r * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.p.color}, ${p.alpha})`;
        ctx.fill();

        // High scroll velocity warp trail
        if (Math.abs(scroll.velocity) > 0.8) {
          const streakY = p.projY - scroll.velocity * p.scale * 1.5;
          ctx.beginPath();
          ctx.moveTo(p.projX, p.projY);
          ctx.lineTo(p.projX, streakY);
          ctx.strokeStyle = `rgba(${p.p.color}, ${p.alpha * 0.55})`;
          ctx.lineWidth = Math.max(0.6, p.scale * 1.4);
          ctx.stroke();
        }
      }
    };

    // ==========================================================
    // 3. 3D INTERACTIVE CYBER GLOBE (Scroll spin + orbital tilt)
    // ==========================================================
    let globeRotY = 0;
    const globePoints = [];
    const GLOBE_LAT = 18;
    const GLOBE_LON = 32;
    const GLOBE_RADIUS = Math.min(width, height) * 0.28;

    for (let i = 0; i <= GLOBE_LAT; i++) {
      const theta = (i * Math.PI) / GLOBE_LAT;
      for (let j = 0; j < GLOBE_LON; j++) {
        const phi = (j * 2 * Math.PI) / GLOBE_LON;
        const isNode = (Math.sin(theta * 3) * Math.cos(phi * 4)) > -0.2;
        if (isNode || Math.random() < 0.2) {
          globePoints.push({
            x: GLOBE_RADIUS * Math.sin(theta) * Math.cos(phi),
            y: GLOBE_RADIUS * Math.cos(theta),
            z: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi),
            isHub: Math.random() < 0.1,
          });
        }
      }
    }

    const renderGlobe = () => {
      // Rotation driven by time + scroll velocity + total scroll progress
      globeRotY += 0.006 + scroll.velocity * 0.0025;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const rotY = globeRotY + mouse.x * 0.8 + scroll.progress * Math.PI * 2.4;
      const rotX = -0.2 - mouse.y * 0.6 + Math.sin(scroll.progress * Math.PI) * 0.35;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Globe drifts slightly in viewport with scroll
      const cx = width * 0.5;
      const cy = height * (0.52 - (scroll.progress - 0.5) * 0.14);
      const fov = 450;
      const currentRadius = GLOBE_RADIUS * (1 + Math.sin(scroll.progress * Math.PI) * 0.08);

      const projected = [];
      for (let i = 0; i < globePoints.length; i++) {
        const pt = globePoints[i];
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.z * cosY + pt.x * sinY;
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + pt.y * sinX;

        if (z2 < currentRadius * 0.9) {
          const scale = fov / (fov + z2);
          const alpha = (1 - z2 / currentRadius) * 0.5 + 0.1;
          projected.push({
            x: cx + x1 * scale,
            y: cy + y2 * scale,
            scale,
            alpha: Math.max(0.1, Math.min(1, alpha)),
            isHub: pt.isHub,
          });
        }
      }

      // Outer glowing atmosphere ring
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Nodes
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        ctx.beginPath();
        const r = pt.isHub ? pt.scale * 3.2 : pt.scale * 1.8;
        ctx.arc(pt.x, pt.y, Math.max(1, r), 0, Math.PI * 2);
        ctx.fillStyle = pt.isHub
          ? `rgba(52, 211, 153, ${pt.alpha * 0.95})`
          : `rgba(56, 189, 248, ${pt.alpha * 0.7})`;
        ctx.fill();

        if (pt.isHub && pt.alpha > 0.5) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 211, 153, ${pt.alpha * 0.2})`;
          ctx.fill();
        }
      }
    };

    // ==========================================================
    // 4. 3D FLOATING POLYHEDRA (Helical Descent on Scroll)
    // ==========================================================
    const polyhedra = [
      { x: -width * 0.26, y: -height * 0.15, z: 80, size: 46, rotX: 0, rotY: 0, speedX: 0.012, speedY: 0.015 },
      { x: width * 0.28, y: -height * 0.08, z: 120, size: 56, rotX: 0.5, rotY: 0.8, speedX: -0.01, speedY: 0.013 },
      { x: -width * 0.24, y: height * 0.2, z: 50, size: 42, rotX: 1.2, rotY: 0.4, speedX: 0.014, speedY: -0.009 },
      { x: width * 0.26, y: height * 0.25, z: 90, size: 50, rotX: 0.9, rotY: 1.5, speedX: -0.012, speedY: -0.011 },
    ];

    const octaVertices = [
      [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]
    ];
    const octaEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    const renderPolyhedra = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      const fov = 400;

      for (let k = 0; k < polyhedra.length; k++) {
        const poly = polyhedra[k];
        // Spin acceleration with scroll velocity
        poly.rotX += poly.speedX + scroll.velocity * 0.003;
        poly.rotY += poly.speedY + scroll.velocity * 0.004;

        const globalRotX = poly.rotX - mouse.y * 0.4;
        const globalRotY = poly.rotY + mouse.x * 0.5;
        const cosY = Math.cos(globalRotY);
        const sinY = Math.sin(globalRotY);
        const cosX = Math.cos(globalRotX);
        const sinX = Math.sin(globalRotX);

        // Helical orbit descent as user travels down the page
        const spiralAngle = scroll.progress * Math.PI * 2.5 + k * 1.6;
        const helicalX = Math.sin(spiralAngle) * 55;
        const verticalCycle = height * 1.2;
        const scrollOffsetY = ((scroll.y * 0.4 + k * (verticalCycle / 4)) % verticalCycle) - (verticalCycle * 0.5);

        const cx = width / 2 + poly.x + helicalX + mouse.x * 30;
        const cy = height / 2 + scrollOffsetY + mouse.y * 30;

        const projPts = [];
        for (let i = 0; i < octaVertices.length; i++) {
          const v = octaVertices[i];
          const vx = v[0] * poly.size;
          const vy = v[1] * poly.size;
          const vz = v[2] * poly.size;

          const x1 = vx * cosY - vz * sinY;
          const z1 = vz * cosY + vx * sinY;
          const y2 = vy * cosX - z1 * sinX;
          const z2 = z1 * cosX + vy * sinX + poly.z;

          const scale = fov / (fov + z2);
          projPts.push({ x: cx + x1 * scale, y: cy + y2 * scale, scale });
        }

        // Draw edges
        ctx.beginPath();
        ctx.strokeStyle = k % 2 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(52, 211, 153, 0.45)';
        ctx.lineWidth = 1.2;
        for (let e = 0; e < octaEdges.length; e++) {
          const pA = projPts[octaEdges[e][0]];
          const pB = projPts[octaEdges[e][1]];
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
        }
        ctx.stroke();

        // Shimmer vertex dots
        for (let i = 0; i < projPts.length; i++) {
          const pt = projPts[i];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1.5, pt.scale * 2.8), 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }
    };

    // ==========================================================
    // 5. 3D KINETIC LIQUID WAVE (Tidal swell & wake on scroll)
    // ==========================================================
    const renderLiquid = () => {
      time += 0.022 + Math.abs(scroll.velocity) * 0.003;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const waveCount = 5;
      // Horizon descends slightly with scroll
      const baseHeight = height * (0.58 - scroll.progress * 0.14);
      const tidalSurge = Math.max(-50, Math.min(50, scroll.velocity * 1.3));

      for (let w = 0; w < waveCount; w++) {
        const offset = w * 0.4;
        const alpha = 0.15 + (w / waveCount) * 0.25;

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          const nx = x / width;
          const mouseInfluence = mouse.active && mouse.rawX !== null
            ? Math.exp(-Math.pow((x - mouse.rawX) / 180, 2)) * 45
            : 0;

          const y =
            baseHeight +
            Math.sin(nx * 5 + time + offset) * (28 + Math.abs(tidalSurge) * 0.2) +
            Math.cos(nx * 8 - time * 0.8 + offset) * 22 +
            mouse.y * 35 +
            tidalSurge * (1 - nx * 0.25) +
            mouseInfluence;

          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseHeight - 40, 0, height);
        grad.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(52, 211, 153, 0.02)`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // ==========================================================
    // 6. 3D WARP SPEED TUNNEL (Hyperspace thrust on scroll)
    // ==========================================================
    const WARP_COUNT = 240;
    const warpStars = [];
    for (let i = 0; i < WARP_COUNT; i++) {
      warpStars.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 50,
        pz: 0,
      });
      warpStars[i].pz = warpStars[i].z;
    }

    const renderWarp = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const fov = 350;
      const cx = width / 2 + mouse.x * 120;
      const cy = height / 2 + mouse.y * 90 - (scroll.progress - 0.5) * 80;

      // Scroll boosts hyperspace velocity significantly
      const warpSpeed = 10 + Math.abs(scroll.velocity) * 2.2 + scroll.progress * 8;

      for (let i = 0; i < warpStars.length; i++) {
        const star = warpStars[i];
        star.pz = star.z;
        star.z -= warpSpeed;

        if (star.z <= 10) {
          star.z = 800;
          star.pz = 800;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
        }

        const scale = fov / star.z;
        const prevScale = fov / star.pz;

        const x = cx + star.x * scale;
        const y = cy + star.y * scale;
        const px = cx + star.x * prevScale;
        const py = cy + star.y * prevScale;

        const alpha = Math.min(1, (1 - star.z / 800) * 1.25);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = i % 2 === 0 ? `rgba(56, 189, 248, ${alpha})` : `rgba(52, 211, 153, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, scale * 2.0);
        ctx.stroke();
      }
    };

    // Main render loop
    const loop = () => {
      // Lerp smooth scroll values & physics
      scroll.y += (scroll.targetY - scroll.y) * 0.09;
      scroll.targetVelocity *= 0.88;
      scroll.velocity += (scroll.targetVelocity - scroll.velocity) * 0.22;
      if (Math.abs(scroll.velocity) < 0.005) scroll.velocity = 0;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll.progress = Math.min(1, Math.max(0, scroll.y / maxScroll));

      // Throttled UI state update for scroll meter (every 10 frames)
      uiUpdateCounter++;
      if (uiUpdateCounter % 10 === 0) {
        setScrollPercent(Math.round(scroll.progress * 100));
      }

      ctx.clearRect(0, 0, width, height);

      switch (currentMode) {
        case 'terrain':
          renderTerrain();
          break;
        case 'particles':
          renderParticles();
          break;
        case 'globe':
          renderGlobe();
          break;
        case 'polyhedra':
          renderPolyhedra();
          break;
        case 'liquid':
          renderLiquid();
          break;
        case 'warp':
          renderWarp();
          break;
        default:
          renderTerrain();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [currentMode]);

  return (
    <>
      {/* 3D Background Canvas */}
      <canvas ref={canvasRef} className="particle-canvas-3d" aria-hidden="true" />

      {/* Floating 3D Mode Switcher Dock */}
      <aside aria-label="3D Background Switcher" className="switcher-3d-dock">
        <div className="switcher-3d-card">
          <div className="switcher-3d-header">
            <div>
              <div className="switcher-3d-title">
                <span className="switcher-3d-pulse" />
                <span>3D Interactive Lab</span>
              </div>
              <div className="switcher-3d-status-hint">
                <Compass className="w-3 h-3 text-[#38bdf8] shrink-0" />
                <span>Mouse + Scroll Active ({scrollPercent}%)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className="switcher-3d-toggle"
              title={isSwitcherOpen ? 'Collapse menu' : 'Expand menu'}
              aria-label={isSwitcherOpen ? 'Collapse 3D menu' : 'Expand 3D menu'}
            >
              {isSwitcherOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Interactive Scroll Progress Meter */}
          <div className="switcher-3d-meter" title={`Scroll Progress: ${scrollPercent}%`}>
            <div 
              className="switcher-3d-meter-fill" 
              style={{ width: `${scrollPercent}%` }} 
            />
          </div>

          {isSwitcherOpen && (
            <div className="switcher-3d-grid">
              {BACKGROUND_MODES.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setCurrentMode(mode.id)}
                    className={`switcher-3d-btn ${isActive ? 'active' : ''}`}
                    title={mode.desc}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <div style={{ overflow: 'hidden' }}>
                      <div className="switcher-3d-btn-label">{mode.label}</div>
                      <div className="switcher-3d-btn-desc">{mode.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
