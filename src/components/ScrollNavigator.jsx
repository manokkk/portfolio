import React, { useState, useEffect } from 'react';
import { ArrowUp, Compass } from 'lucide-react';

export default function ScrollNavigator() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastPercent = -1;
    let lastVisible = false;
    let lastSection = 'HERO';

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || window.pageYOffset || 0;
          const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const percent = Math.min(100, Math.max(0, Math.round((currentY / docHeight) * 100)));

          // Throttled state updates only on actual change
          if (percent !== lastPercent) {
            lastPercent = percent;
            setScrollPercent(percent);
          }

          const visibleNow = currentY > 280;
          if (visibleNow !== lastVisible) {
            lastVisible = visibleNow;
            setIsVisible(visibleNow);
          }

          // Fast arithmetic section detection (zero layout thrashing)
          let current = 'HERO';
          if (percent >= 84) current = 'CONTACT';
          else if (percent >= 55) current = 'SERVICES';
          else if (percent >= 24) current = 'WORKS';

          if (current !== lastSection) {
            lastSection = current;
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Scroll Navigator" className="scroll-navigator-dock">
      <div className="scroll-navigator-card">
        {/* Active Section Tag */}
        <div className="scroll-navigator-section" title={`Current Section: ${activeSection}`}>
          <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="scroll-navigator-label">{activeSection}</span>
        </div>

        <div className="scroll-navigator-divider" />

        {/* Quick Back to Top with Live Percentage */}
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-navigator-btn group"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <span className="scroll-navigator-percent">{scrollPercent}%</span>
          <div className="scroll-navigator-arrow-box group-hover:-translate-y-0.5 transition-transform">
            <ArrowUp className="w-3 h-3 text-white" />
          </div>
        </button>
      </div>
    </aside>
  );
}
