import React, { useState, useEffect, useRef } from 'react';
import { Mail, Menu, X, Check, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RocketProgressIcon from './RocketProgressIcon';

export default function Navbar({ email = "micogianan28@gmail.com", onOpenResume }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const progressBarRef = useRef(null);
  const rocketRef = useRef(null);

  // Lock background scroll when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    let ticking = false;
    let lastIsScrolled = false;
    let lastActiveSection = '';
    let scrollTimeout = null;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || window.pageYOffset || 0;
          const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const percent = Math.min(100, Math.max(0, (currentY / docHeight) * 100));
          const roundedPercent = Math.round(percent);
          const scrollRatio = percent / 100;
          const rocketShift = (1 - scrollRatio) * 100;

          // Direct DOM transform/style update avoids continuous React re-renders
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${percent}%`;
            progressBarRef.current.style.setProperty('--rocket-shift', `${rocketShift}%`);
            progressBarRef.current.style.setProperty('--scroll-ratio', scrollRatio);
          }

          // Fade in rocket button smoothly only once scrolling starts (> 1.5%) to avoid cut-off at initial load
          if (rocketRef.current) {
            if (percent > 1.5) {
              rocketRef.current.style.opacity = '1';
              rocketRef.current.style.pointerEvents = 'auto';
            } else {
              rocketRef.current.style.opacity = '0';
              rocketRef.current.style.pointerEvents = 'none';
            }
          }

          // Active cruising thruster boost when actively scrolling
          if (rocketRef.current) {
            if (!rocketRef.current.classList.contains('is-cruising')) {
              rocketRef.current.classList.add('is-cruising');
            }
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              if (rocketRef.current) {
                rocketRef.current.classList.remove('is-cruising');
              }
            }, 180);
          }

          const scrolledNow = currentY > 40;
          if (scrolledNow !== lastIsScrolled) {
            lastIsScrolled = scrolledNow;
            setIsScrolled(scrolledNow);
          }

          // Fast arithmetic active section detection matching ScrollNavigator
          let current = '';
          if (roundedPercent >= 84) current = 'contact';
          else if (roundedPercent >= 55) current = 'services';
          else if (roundedPercent >= 24) current = 'projects';

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRocketClick = (e) => {
    e.preventDefault();
    const currentY = window.scrollY || window.pageYOffset || 0;
    if (currentY > 80) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const worksElem = document.getElementById('works') || document.getElementById('projects');
      if (worksElem) {
        worksElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''} ${mobileOpen ? 'mobile-menu-active' : ''}`}>
      {/* Laser Reading Progress Bar with Horizontal Rocket Explorer */}
      <div 
        ref={progressBarRef}
        className="nav-reading-bar" 
        style={{ width: '0%' }} 
      >
        <button
          ref={rocketRef}
          type="button"
          onClick={handleRocketClick}
          className="nav-rocket-btn"
          aria-label="Rocket explorer: click to return to top"
          title="Rocket Explorer • Click to scroll to top"
        >
          <RocketProgressIcon />
        </button>
      </div>

      <div className="header-inner">
        {/* Left: Circled mail icon + email button with instant copy feedback */}
        <button 
          type="button"
          onClick={handleCopyEmail} 
          className="email-pill" 
          aria-label={`Copy email address: ${email}`}
          title="Click to copy email address"
        >
          <div className="icon-circle">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-white" />}
          </div>
          <span>{copied ? "Copied!" : email}</span>
        </button>

        {/* Right: Desktop Navigation Links with Scroll-Active Glow */}
        <nav className="nav-links">
          <button 
            type="button"
            onClick={onOpenResume} 
            className="nav-link"
            aria-haspopup="dialog"
            aria-label="Open Curriculum Vitae / Resume"
          >
            Resume
          </button>
          <a 
            href="#projects" 
            className={`nav-link ${activeSection === 'projects' ? 'active-nav-link' : ''}`}
          >
            Projects
          </a>
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
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle-btn"
          aria-label="Toggle Navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay & Content */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              key="mobile-backdrop"
              className="mobile-drawer-backdrop"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              aria-hidden="true"
            />
            <motion.div 
              key="mobile-drawer"
              className="mobile-drawer" 
              role="dialog" 
              aria-modal="true" 
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="mobile-drawer-links">
                <button 
                  type="button"
                  onClick={() => { setMobileOpen(false); onOpenResume(); }} 
                  className="mobile-nav-link"
                >
                  <FileText className="w-4 h-4 text-sky-400" aria-hidden="true" />
                  <span>Resume</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" aria-hidden="true" />
                </button>
                <a 
                  href="#projects" 
                  onClick={() => setMobileOpen(false)} 
                  className={`mobile-nav-link ${activeSection === 'projects' ? 'active-mobile-link' : ''}`}
                >
                  <span>Projects</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" aria-hidden="true" />
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileOpen(false)} 
                  className={`mobile-nav-link ${activeSection === 'services' ? 'active-mobile-link' : ''}`}
                >
                  <span>Services</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" aria-hidden="true" />
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileOpen(false)} 
                  className={`mobile-nav-link ${activeSection === 'contact' ? 'active-mobile-link' : ''}`}
                >
                  <span>Contact</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" aria-hidden="true" />
                </a>
              </div>

              {/* Dedicated 3D Galaxy Toggle on Mobile */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent('toggle-galaxy-mode', { detail: true }));
                }}
                className="mobile-galaxy-toggle-btn"
                aria-label="Explore 3D Galaxy Simulation"
              >
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                <span>Explore 3D Galaxy</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
