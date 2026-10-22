import { useState, useEffect } from 'react';

/**
 * Custom hook to track window scroll and viewport height
 * with requestAnimationFrame throttling for 60-120fps performance.
 */
export function useScrollPhysics() {
  const [scrollY, setScrollY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);
  const [viewportH, setViewportH] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY || 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || 0;
          if (Math.abs(currentY - lastY) >= 3) {
            lastY = currentY;
            setScrollY(currentY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setViewportH(window.innerHeight || 800);
      // Invalidate layout cache on resize
      if (typeof document !== 'undefined') {
        const anchors = document.querySelectorAll('.scroll-anchor');
        anchors.forEach(el => { el._layoutCache = null; });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Computes continuous In & Out scroll physics for any DOM element with layout caching
   */
  const getElementPhysics = (element, options = {}) => {
    if (!element) {
      return {
        opacity: 1,
        scale: 1,
        translateY: 0,
        totalOffsetY: 0,
        rotateX: 0,
        rotateY: 0,
        ratio: 0,
        absRatio: 0,
        isFocal: false
      };
    }

    const currentScroll = typeof window !== 'undefined' ? (window.scrollY || 0) : 0;
    const vh = viewportH || (typeof window !== 'undefined' ? window.innerHeight : 800);

    // Fast Layout Caching (eliminates forced synchronous reflows / getBoundingClientRect thrashing)
    if (!element._layoutCache) {
      const rect = element.getBoundingClientRect();
      element._layoutCache = {
        top: rect.top + currentScroll,
        height: rect.height || element.offsetHeight || 300
      };
    }

    const elemCenter = (element._layoutCache.top - currentScroll) + (element._layoutCache.height * 0.5);
    const viewportCenter = vh * 0.5;
    const dist = elemCenter - viewportCenter;

    // Normalized ratio (-1.0 at top edge, 0.0 at center, +1.0 at bottom edge)
    const focalRadius = vh * (options.focalRadiusFactor || 0.52);
    const rawRatio = dist / focalRadius;
    const ratio = Math.max(-1.5, Math.min(1.5, rawRatio));
    const absRatio = Math.abs(ratio);

    // 1. Continuous In & Out Opacity
    const focalZone = options.focalZone !== undefined ? options.focalZone : 0.32;
    const minOpacity = options.minOpacity !== undefined ? options.minOpacity : 0.18;
    let opacity = 1;
    if (absRatio > focalZone) {
      const progress = Math.min(1, (absRatio - focalZone) / (1.25 - focalZone));
      const curve = 0.5 * (1 - Math.cos(progress * Math.PI));
      opacity = Math.max(minOpacity, 1 - curve * (1 - minOpacity));
    }

    // 2. Continuous In & Out Scale
    const minScale = options.minScale !== undefined ? options.minScale : 0.90;
    let scale = 1;
    if (absRatio > focalZone) {
      const progress = Math.min(1, (absRatio - focalZone) / (1.25 - focalZone));
      const curve = 0.5 * (1 - Math.cos(progress * Math.PI));
      scale = Math.max(minScale, 1 - curve * (1 - minScale));
    }

    // 3. Continuous In & Out Lift / Float
    const maxLift = options.maxLift !== undefined ? options.maxLift : 44;
    const baseLiftY = Math.max(-maxLift, Math.min(maxLift, ratio * maxLift * 0.85));

    // 4. Column 3D Perspective (keeps row cards horizontally level and aligned)
    const col = options.col !== undefined ? options.col : -1;
    let rotateY = 0;
    let colDrift = 0;
    if (col === 0) {
      rotateY = -1.5;
    } else if (col === 2) {
      rotateY = 1.5;
    }
    if (options.enableColDrift) {
      colDrift = col === 1 ? -Math.sin(ratio * Math.PI * 0.5) * 6 : Math.sin(ratio * Math.PI * 0.5) * 6;
    }

    const totalOffsetY = baseLiftY + colDrift;

    // 5. 3D Perspective Pitch Tilt
    const maxTilt = options.maxTilt !== undefined ? options.maxTilt : 5.0;
    const rotateX = Math.max(-maxTilt, Math.min(maxTilt, -ratio * maxTilt * 0.75));

    // 6. Internal Element Parallax Values
    const imgOffsetY = Math.max(-18, Math.min(18, -baseLiftY * 0.42));
    const iconOffsetY = Math.max(-12, Math.min(12, ratio * 10));
    const iconRot = Math.max(-7, Math.min(7, -ratio * 6));
    const tagDrift = Math.max(-8, Math.min(8, (col - 1) * (1 - Math.min(1, absRatio)) * 6));

    // 7. Reading Focal Zone Flag
    const isFocal = absRatio < (options.focalThreshold || 0.36);

    return {
      opacity,
      scale,
      translateY: baseLiftY,
      totalOffsetY,
      rotateX,
      rotateY,
      imgOffsetY,
      iconOffsetY,
      iconRot,
      tagDrift,
      ratio,
      absRatio,
      isFocal
    };
  };

  return { scrollY, viewportH, getElementPhysics };
}
