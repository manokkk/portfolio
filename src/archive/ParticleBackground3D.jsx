import React, { useEffect, useRef } from 'react';

/**
 * ParticleBackground3D
 * High-performance 3D interactive particle constellation canvas.
 * - True 3D coordinate space with perspective projection
 * - 3D camera rotation and parallax tracking on mouse move
 * - Interactive cursor magnetic tether and repulsion physics
 * - Dynamic depth-faded energy connection lines
 * - High-DPI support, zero lag, pointer-events pass-through
 */
export default function ParticleBackground3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // 3D camera orientation
    const camera = {
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0,
      fov: 450,
    };

    // Mouse coordinates in 3D centered space
    const mouse = {
      x: null,
      y: null,
      screenX: null,
      screenY: null,
      radius: 140,
      active: false,
    };

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 50 : 95;
    const MAX_LINE_DIST = isMobile ? 90 : 125;

    // Palette: Cyan, Emerald, Electric Purple, Ice White
    const PALETTES = [
      { r: 56, g: 189, b: 248 },  // Sky/Cyan
      { r: 52, g: 211, b: 153 },  // Emerald
      { r: 168, g: 85, b: 247 },  // Purple
      { r: 224, g: 242, b: 254 }, // Ice white
    ];

    class Particle3D {
      constructor(w, h) {
        this.reset(w, h, true);
      }

      reset(w, h, initial = false) {
        // 3D bounding box centered at (0, 0, 0)
        const spreadX = w * 0.9;
        const spreadY = h * 0.9;
        const spreadZ = 600;

        this.x = (Math.random() - 0.5) * spreadX;
        this.y = (Math.random() - 0.5) * spreadY;
        this.z = initial ? (Math.random() - 0.5) * spreadZ : 300;

        // Base 3D velocity
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.vz = (Math.random() - 0.5) * 0.5;

        // Origin return point for elastic mouse repulsion
        this.originX = this.x;
        this.originY = this.y;
        this.originZ = this.z;

        this.baseRadius = Math.random() * 1.6 + 1.2;
        this.color = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        this.alpha = Math.random() * 0.45 + 0.35;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;

        // Screen projections
        this.projX = 0;
        this.projY = 0;
        this.projScale = 1;
        this.visible = false;
      }

      update(w, h) {
        // Natural drift
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        this.pulse += this.pulseSpeed;

        // Boundary wrapping in 3D
        const halfW = w * 0.55;
        const halfH = h * 0.55;
        const halfZ = 320;

        if (this.x < -halfW) this.x = halfW;
        if (this.x > halfW) this.x = -halfW;
        if (this.y < -halfH) this.y = halfH;
        if (this.y > halfH) this.y = -halfH;
        if (this.z < -halfZ) this.z = halfZ;
        if (this.z > halfZ) this.z = -halfZ;

        // Interactive mouse repulsion in projected 2D space
        if (mouse.active && mouse.x !== null) {
          const dx = this.projX - mouse.screenX;
          const dy = this.projY - mouse.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 3.5;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }
      }

      project(cx, cy, sinY, cosY, sinX, cosX) {
        // 3D rotation: Yaw around Y-axis
        const x1 = this.x * cosY - this.z * sinY;
        const z1 = this.z * cosY + this.x * sinY;

        // Pitch around X-axis
        const y2 = this.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.y * sinX;

        // Perspective division
        const depth = camera.fov + z2;
        if (depth <= 10) {
          this.visible = false;
          return;
        }

        const scale = camera.fov / depth;
        this.projScale = scale;
        this.projX = cx + x1 * scale;
        this.projY = cy + y2 * scale;
        this.visible = true;
      }

      draw(context) {
        if (!this.visible) return;

        const currentAlpha = Math.min(
          1,
          this.alpha * this.projScale * (0.8 + Math.sin(this.pulse) * 0.2)
        );
        if (currentAlpha <= 0.02) return;

        const r = Math.max(0.6, this.baseRadius * this.projScale);

        // Core particle
        context.beginPath();
        context.arc(this.projX, this.projY, r, 0, Math.PI * 2);
        context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentAlpha})`;
        context.fill();

        // Soft halo on larger/closer particles
        if (this.projScale > 1.1) {
          context.beginPath();
          context.arc(this.projX, this.projY, r * 2.8, 0, Math.PI * 2);
          context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentAlpha * 0.22})`;
          context.fill();
        }
      }
    }

    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle3D(width, height));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse & Touch Tracking
    const handleMouseMove = (e) => {
      mouse.screenX = e.clientX;
      mouse.screenY = e.clientY;
      mouse.x = e.clientX - width / 2;
      mouse.y = e.clientY - height / 2;
      mouse.active = true;

      // Subtle parallax camera tilt (normalized -0.25 to +0.25 radians)
      camera.targetRotY = (mouse.x / width) * 0.45;
      camera.targetRotX = -(mouse.y / height) * 0.35;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.screenX = null;
      mouse.screenY = null;
      camera.targetRotX = 0;
      camera.targetRotY = 0;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave, { passive: true });

    // Main 3D Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      camera.rotX += (camera.targetRotX - camera.rotX) * 0.045;
      camera.rotY += (camera.targetRotY - camera.rotY) * 0.045;

      const cosY = Math.cos(camera.rotY);
      const sinY = Math.sin(camera.rotY);
      const cosX = Math.cos(camera.rotX);
      const sinX = Math.sin(camera.rotX);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Update and project all 3D particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(width, height);
        p.project(cx, cy, sinY, cosY, sinX, cosX);
      }

      // 2. Draw 3D connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!p1.visible) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2.visible) continue;

          // Euclidean distance in 3D
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < MAX_LINE_DIST) {
            const lineAlpha = (1 - dist3D / MAX_LINE_DIST) * 0.22 * Math.min(p1.projScale, p2.projScale);

            if (lineAlpha > 0.015) {
              ctx.beginPath();
              ctx.moveTo(p1.projX, p1.projY);
              ctx.lineTo(p2.projX, p2.projY);
              ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
              ctx.lineWidth = Math.max(0.5, 0.85 * Math.min(p1.projScale, p2.projScale));
              ctx.stroke();
            }
          }
        }

        // 3. Connect to mouse if active & within reach (interactive tether)
        if (mouse.active && mouse.screenX !== null) {
          const dmx = p1.projX - mouse.screenX;
          const dmy = p1.projY - mouse.screenY;
          const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);

          if (distMouse < mouse.radius * 1.15) {
            const tetherAlpha = (1 - distMouse / (mouse.radius * 1.15)) * 0.32 * p1.projScale;
            if (tetherAlpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(p1.projX, p1.projY);
              ctx.lineTo(mouse.screenX, mouse.screenY);
              ctx.strokeStyle = `rgba(52, 211, 153, ${tetherAlpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }
      }

      // 4. Draw particle points
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas-3d"
      aria-hidden="true"
    />
  );
}
