import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Code2, Sparkles } from 'lucide-react';

export default function Hero({
  name = "Mico Gianan",
  avatarUrl = "/images/profile.png",
  description = "Full-Stack Web & Mobile Developer based in Taguig, Philippines. Specializing in Next.js, NestJS, .NET Framework, and React Native (Expo) to build high-performance cross-platform applications.",
}) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optimized off-thread transform pipelines (Tuned specifically for mobile vs desktop)
  const imageOffsetY = useTransform(scrollY, [0, 600], isMobile ? [0, 40] : [0, 96]);
  const imageScale = useTransform(scrollY, [0, 600], isMobile ? [1, 0.94] : [1, 0.85]);

  const topBadgeX = useTransform(scrollY, [0, 600], isMobile ? [0, 14] : [0, 72]);
  const topBadgeY = useTransform(scrollY, [0, 600], isMobile ? [0, -24] : [0, -90]);
  const topBadgeRot = useTransform(scrollY, [0, 600], isMobile ? [0, 4] : [0, 9]);

  const bottomBadgeX = useTransform(scrollY, [0, 600], isMobile ? [0, -14] : [0, -60]);
  const bottomBadgeY = useTransform(scrollY, [0, 600], isMobile ? [0, 24] : [0, 90]);
  const bottomBadgeRot = useTransform(scrollY, [0, 600], isMobile ? [0, -3] : [0, -7.2]);

  const textOffsetY = useTransform(scrollY, [0, 600], isMobile ? [0, 20] : [0, 48]);
  const textOpacity = useTransform(scrollY, [0, 550], [1, 0]);

  const glowScale = useTransform(scrollY, [0, 600], [1, 1.24]);
  const glowOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  // Subtle staggered tech-chip scroll float
  const chip1Y = useTransform(scrollY, [0, 600], [0, -12]);
  const chip2Y = useTransform(scrollY, [0, 600], [0, -18]);
  const chip3Y = useTransform(scrollY, [0, 600], [0, -15]);
  const chip4Y = useTransform(scrollY, [0, 600], [0, -21]);
  const chip5Y = useTransform(scrollY, [0, 600], [0, -12]);

  const springConfig = { type: "spring", stiffness: 400, damping: 28 };

  return (
    <section id="hero" className="hero-section container-custom">
      <div className="hero-grid">
        
        {/* Left Column: Borderless Picture Blending into Background with 3D Scroll Parallax */}
        <div className="hero-picture-column">
          <motion.div 
            className="picture-glow-bg"
            style={shouldReduceMotion ? {} : { scale: glowScale, opacity: glowOpacity }}
          />
          
          <motion.div 
            className="picture-blend-wrapper"
            style={shouldReduceMotion ? {} : { y: imageOffsetY, scale: imageScale }}
          >
            <img
              src={avatarUrl}
              alt={name}
              className="picture-blend-img"
            />
            <div className="picture-vignette-overlay" />
          </motion.div>

          {/* Floating Badges with Multi-Plane 3D Zero-G Parallax */}
          <motion.div 
            className="floating-badge badge-top"
            style={shouldReduceMotion ? {} : { x: topBadgeX, y: topBadgeY, rotate: topBadgeRot }}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
            <span>Full-Stack Dev</span>
          </motion.div>
          
          <motion.div 
            className="floating-badge badge-bottom font-mono"
            style={shouldReduceMotion ? {} : { x: bottomBadgeX, y: bottomBadgeY, rotate: bottomBadgeRot }}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
            <span>React Native & Next.js</span>
          </motion.div>
        </div>

        {/* Right Column: Text Content & Actions with Gentle Parallax and Fade */}
        <motion.div 
          className="hero-text-column"
          style={shouldReduceMotion ? {} : { y: textOffsetY, opacity: textOpacity }}
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
            <motion.span className="tech-chip" style={shouldReduceMotion ? {} : { y: chip1Y }}>Next.js</motion.span>
            <motion.span className="tech-chip" style={shouldReduceMotion ? {} : { y: chip2Y }}>NestJS</motion.span>
            <motion.span className="tech-chip" style={shouldReduceMotion ? {} : { y: chip3Y }}>.NET</motion.span>
            <motion.span className="tech-chip" style={shouldReduceMotion ? {} : { y: chip4Y }}>React Native</motion.span>
            <motion.span className="tech-chip" style={shouldReduceMotion ? {} : { y: chip5Y }}>Supabase</motion.span>
          </div>

          {/* Action Buttons with Tactile Spring Physics */}
          <div className="hero-actions">
            <motion.a 
              href="#contact" 
              className="pill-btn-white group"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={springConfig}
            >
              <span>CONNECT WITH ME</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </motion.a>
            <motion.a 
              href="#projects" 
              className="pill-btn-outline"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={springConfig}
            >
              <span>EXPLORE PROJECTS</span>
            </motion.a>
          </div>

          {/* Metadata Footer Line */}
          <div className="hero-meta">
            <div className="meta-item">
              <MapPin className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>Taguig, Philippines</span>
            </div>
            <div className="meta-divider" aria-hidden="true">•</div>
            <div className="meta-item">
              <Code2 className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
              <span>Web & Mobile Developer</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
