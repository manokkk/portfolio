import React from 'react';
import { Mail, ArrowUp, Code2 } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container-custom">
        
        {/* Top Grid Row */}
        <div className="footer-top">
          
          {/* Brand & Bio Column */}
          <div className="footer-brand">
            <div className="footer-brand-title">
              <span>Mico H. Gianan.</span>
            </div>
            <p className="footer-brand-desc">
              Full-Stack Web, Backend & Mobile Developer specializing in Next.js, NestJS, .NET Framework, and React Native (Expo).
            </p>
          </div>

          {/* Quick Links & Email Action */}
          <div className="footer-nav">
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#services" className="footer-link">Services</a>
            <a href="#contact" className="footer-link">Contact</a>

            <a href="mailto:micogianan28@gmail.com" className="footer-email-btn" aria-label="Send email to micogianan28@gmail.com">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>micogianan28@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits Row */}
        <div className="footer-bottom">
          
          <p>© {CURRENT_YEAR} Mico H. Gianan. All rights reserved.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* React & Vite Tech Badge */}
            <div className="tech-badge">
              <Code2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>Built with <strong style={{ color: '#ffffff' }}>React</strong> & <strong style={{ color: '#c084fc' }}>Vite</strong></span>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="top-scroll-btn"
              aria-label="Back to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
