import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MapPin, Code2, Sparkles } from 'lucide-react';

export default function Hero({
  name = "Mico Gianan",
  avatarUrl = "/images/profile.png",
  description = "Full-Stack Web & Mobile Developer based in Taguig, Philippines. Specializing in Next.js, NestJS, .NET Framework, and React Native (Expo) to build high-performance cross-platform applications.",
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastClamped = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          const clamped = Math.min(600, y);

          // Only re-render Hero if clamped parallax value changed
          if (Math.abs(clamped - lastClamped) >= 1) {
            lastClamped = clamped;
            setScrollY(clamped);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate smooth scroll parallax values (capped for natural physics)
  const clampedScroll = Math.min(600, scrollY);
  const imageOffsetY = clampedScroll * 0.16;
  const imageScale = Math.max(0.9, 1 - clampedScroll * 0.00025);

  const topBadgeX = Math.min(80, clampedScroll * 0.12);
  const topBadgeY = Math.max(-90, -clampedScroll * 0.2);
  const topBadgeRot = clampedScroll * 0.015;

  const bottomBadgeX = Math.max(-80, -clampedScroll * 0.1);
  const bottomBadgeY = Math.min(90, clampedScroll * 0.18);
  const bottomBadgeRot = -clampedScroll * 0.012;

  const textOffsetY = clampedScroll * 0.08;
  const textOpacity = Math.max(0, 1 - clampedScroll / 550);

  return (
    <section id="hero" className="hero-section container-custom">
      <div className="hero-grid">
        
        {/* Left Column: Borderless Picture Blending into Background with 3D Scroll Parallax */}
        <div className="hero-picture-column">
          <div 
            className="picture-glow-bg"
            style={{
              transform: `translate(-50%, -45%) scale(${1 + clampedScroll * 0.0004})`,
              opacity: Math.max(0.2, 1 - clampedScroll / 600)
            }}
          />
          
          <div 
            className="picture-blend-wrapper"
            style={{
              transform: `translateY(${imageOffsetY}px) scale(${imageScale})`,
              transition: 'transform 0.05s ease-out'
            }}
          >
            <img
              src={avatarUrl}
              alt={name}
              className="picture-blend-img"
            />
            <div className="picture-vignette-overlay" />
          </div>

          {/* Floating Badges with Multi-Plane 3D Zero-G Parallax */}
          <div 
            className="floating-badge badge-top"
            style={{
              transform: `translate(${topBadgeX}px, ${topBadgeY}px) rotate(${topBadgeRot}deg)`,
              transition: 'transform 0.05s ease-out'
            }}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Full-Stack Dev</span>
          </div>
          
          <div 
            className="floating-badge badge-bottom font-mono"
            style={{
              transform: `translate(${bottomBadgeX}px, ${bottomBadgeY}px) rotate(${bottomBadgeRot}deg)`,
              transition: 'transform 0.05s ease-out'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>React Native & Next.js</span>
          </div>
        </div>

        {/* Right Column: Text Content & Actions with Gentle Parallax and Fade */}
        <div 
          className="hero-text-column"
          style={{
            transform: `translateY(${textOffsetY}px)`,
            opacity: textOpacity,
            transition: 'transform 0.05s ease-out, opacity 0.05s ease-out'
          }}
        >
          {/* Greeting */}
          <div className="greeting-text">
            <span>Hi, I'm <strong className="text-white font-extrabold">{name}</strong></span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline">
            <span className="underline-accent">Building</span> web, mobile, and intelligent AI applications.
          </h1>

          {/* Description */}
          <p className="hero-description">
            {description}
          </p>

          {/* Tech Chips with Staggered Scroll Float */}
          <div className="hero-tech-chips">
            <span className="tech-chip" style={{ transform: `translateY(${-clampedScroll * 0.02}px)` }}>Next.js</span>
            <span className="tech-chip" style={{ transform: `translateY(${-clampedScroll * 0.03}px)` }}>NestJS</span>
            <span className="tech-chip" style={{ transform: `translateY(${-clampedScroll * 0.025}px)` }}>.NET</span>
            <span className="tech-chip" style={{ transform: `translateY(${-clampedScroll * 0.035}px)` }}>React Native</span>
            <span className="tech-chip" style={{ transform: `translateY(${-clampedScroll * 0.02}px)` }}>Supabase</span>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="#contact" className="pill-btn-white group">
              <span>CONNECT WITH ME</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#projects" className="pill-btn-outline">
              <span>EXPLORE PROJECTS</span>
            </a>
          </div>

          {/* Metadata Footer Line */}
          <div className="hero-meta">
            <div className="meta-item">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Taguig, Philippines</span>
            </div>
            <div className="meta-divider">•</div>
            <div className="meta-item">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Web & Mobile Developer</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
