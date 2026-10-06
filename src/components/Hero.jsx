import React from 'react';

export default function Hero({
  name = "Mico",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  description = "a Full-Stack Web & Mobile Developer in Taguig, Philippines. Specializing in Next.js, NestJS, .NET Framework, and React Native (Expo) to build scalable cross-platform applications.",
}) {
  return (
    <section id="hero" className="hero-section container-custom">
      
      {/* Circular Avatar */}
      <div className="avatar-wrapper">
        <img
          src={avatarUrl}
          alt={name}
          className="avatar-img"
        />
      </div>

      {/* Greeting */}
      <div className="greeting-text">
        <span>Hi, I'm {name}</span>
        <span className="text-xl">🤘</span>
      </div>

      {/* Main Headline */}
      <h1 className="hero-headline">
        <span className="underline-accent">Building</span> web, mobile, <br />
        and intelligent AI <br />
        applications.
      </h1>

      {/* Sub-headline Description */}
      <p className="hero-description">
        {description}
      </p>

      {/* Connect Pill Button */}
      <a href="#contact" className="pill-btn-white">
        CONNECT WITH ME
      </a>

    </section>
  );
}
