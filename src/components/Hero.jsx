import React from 'react';
import { ArrowUpRight, MapPin, Code2, Sparkles } from 'lucide-react';

export default function Hero({
  name = "Mico Gianan",
  avatarUrl = "/images/profile.png",
  description = "Full-Stack Web & Mobile Developer based in Taguig, Philippines. Specializing in Next.js, NestJS, .NET Framework, and React Native (Expo) to build high-performance cross-platform applications.",
}) {
  return (
    <section id="hero" className="hero-section container-custom">
      <div className="hero-grid">
        
        {/* Left Column: Borderless Picture Blending into Background */}
        <div className="hero-picture-column">
          <div className="picture-glow-bg"></div>
          
          <div className="picture-blend-wrapper">
            <img
              src={avatarUrl}
              alt={name}
              className="picture-blend-img"
            />
            <div className="picture-vignette-overlay"></div>
          </div>

          {/* Floating Badges */}
          <div className="floating-badge badge-top">
            <span className="badge-pulse"></span>
            <span>Full-Stack Dev</span>
          </div>
          
          <div className="floating-badge badge-bottom font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>React Native & Next.js</span>
          </div>
        </div>

        {/* Right Column: Text Content & Actions */}
        <div className="hero-text-column">
          
          {/* Availability Status Badge */}
          <div className="status-pill">
            <span className="status-indicator">
              <span className="status-ping"></span>
              <span className="status-dot"></span>
            </span>
            <span className="status-text">Available for Opportunities</span>
          </div>

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

          {/* Tech Chips */}
          <div className="hero-tech-chips">
            <span className="tech-chip">Next.js</span>
            <span className="tech-chip">NestJS</span>
            <span className="tech-chip">.NET</span>
            <span className="tech-chip">React Native</span>
            <span className="tech-chip">Supabase</span>
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
