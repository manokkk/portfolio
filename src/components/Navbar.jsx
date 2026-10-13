import React, { useState, useEffect, useRef } from 'react';
import { Mail, Menu, X, Check } from 'lucide-react';

export default function Navbar({ email = "micogianan28@gmail.com", onOpenResume }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let lastIsScrolled = false;
    let lastActiveSection = '';

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || window.pageYOffset || 0;
          const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const percent = Math.min(100, Math.max(0, Math.round((currentY / docHeight) * 100)));

          // Direct DOM transform/style update avoids continuous React re-renders
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${percent}%`;
          }

          const scrolledNow = currentY > 40;
          if (scrolledNow !== lastIsScrolled) {
            lastIsScrolled = scrolledNow;
            setIsScrolled(scrolledNow);
          }

          // Fast arithmetic active section detection matching ScrollNavigator
          let current = '';
          if (percent >= 84) current = 'contact';
          else if (percent >= 55) current = 'services';
          else if (percent >= 24) current = 'projects';

          if (current !== lastActiveSection) {
            lastActiveSection = current;
            setActiveSection(current);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      {/* Laser Reading Progress Bar */}
      <div 
        ref={progressBarRef}
        className="nav-reading-bar" 
        style={{ width: '0%' }} 
        aria-hidden="true" 
      />

      <div className="header-inner">
        {/* Left: Circled mail icon + email button with instant copy feedback */}
        <button onClick={handleCopyEmail} className="email-pill" title="Click to copy email address">
          <div className="icon-circle">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-white" />}
          </div>
          <span>{copied ? "Copied!" : email}</span>
        </button>

        {/* Right: Desktop Navigation Links with Scroll-Active Glow */}
        <nav className="nav-links">
          <a 
            href="#projects" 
            className={`nav-link ${activeSection === 'projects' ? 'active-nav-link' : ''}`}
          >
            Works & Projects
          </a>
          <button onClick={onOpenResume} className="nav-link">
            Resume
          </button>
          <a 
            href="#services" 
            className={`nav-link ${activeSection === 'services' ? 'active-nav-link' : ''}`}
          >
            Services
          </a>
          <a 
            href="#contact" 
            className={`nav-link ${activeSection === 'contact' ? 'active-nav-link' : ''}`}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle-btn"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <a 
            href="#projects" 
            onClick={() => setMobileOpen(false)} 
            className={`mobile-nav-link ${activeSection === 'projects' ? 'active-mobile-link' : ''}`}
          >
            Works & Projects
          </a>
          <button 
            onClick={() => { setMobileOpen(false); onOpenResume(); }} 
            className="mobile-nav-link"
          >
            Resume
          </button>
          <a 
            href="#services" 
            onClick={() => setMobileOpen(false)} 
            className={`mobile-nav-link ${activeSection === 'services' ? 'active-mobile-link' : ''}`}
          >
            Services
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileOpen(false)} 
            className={`mobile-nav-link ${activeSection === 'contact' ? 'active-mobile-link' : ''}`}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
