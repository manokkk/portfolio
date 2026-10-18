import React from 'react';

/**
 * RocketProgressIcon — Minimalist Space Shuttle Vector Icon
 * Clean, bold, high-contrast graphic style matching the NASA Orbiter icon:
 * - Swept delta wings with straight trailing edges and inner contour lines
 * - Aerodynamic fuselage with segmented panel dividers and longitudinal highlight
 * - Iconic cockpit chevron canopy visor and dual forward windows
 * - Flared aft engine housing and center trailing stabilizer connecting to progress track
 */
export default function RocketProgressIcon({ className = "nav-rocket-svg" }) {
  return (
    <svg
      className={className}
      width="44"
      height="30"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center Engine Rudder / Trailing Stabilizer (Connects to Laser Bar) */}
      <rect x="0" y="15.2" width="6" height="1.6" rx="0.5" fill="#38bdf8" />

      {/* Main Space Shuttle Solid Body (Clean High-Contrast Silhouette) */}
      <path
        d="
          M 46 16
          C 44 14.5, 40 12, 36 12
          L 30 12
          L 14 4
          L 12 4
          L 12 12
          C 10 12, 8 11.2, 7 10.5
          L 7 13.5
          L 5 13.5
          L 5 18.5
          L 7 18.5
          L 7 21.5
          C 8 20.8, 10 20, 12 20
          L 12 28
          L 14 28
          L 30 20
          L 36 20
          C 40 20, 44 17.5, 46 16
          Z
        "
        fill="#f8fafc"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      {/* Cockpit Chevron Canopy Cutout (with Electric Cyan Accent) */}
      <path
        d="M 37.5 13.4 L 41.2 16 L 37.5 18.6 L 38.8 16 Z"
        fill="#38bdf8"
      />

      {/* Dual Forward Cockpit Windows */}
      <rect x="34" y="13.5" width="1.6" height="1.7" rx="0.3" fill="#08090d" />
      <rect x="34" y="16.8" width="1.6" height="1.7" rx="0.3" fill="#08090d" />

      {/* Forward Fuselage Divider Seam */}
      <line x1="32.5" y1="12" x2="32.5" y2="20" stroke="#08090d" strokeWidth="1" strokeLinecap="round" />

      {/* Mid-Fuselage Payload Bay Divider Seam */}
      <line x1="23" y1="12" x2="23" y2="20" stroke="#08090d" strokeWidth="1" strokeLinecap="round" />

      {/* Longitudinal Highlight Stripe (Fuselage Ridge) */}
      <rect x="13.5" y="13.2" width="18" height="1.2" rx="0.4" fill="#08090d" />

      {/* Upper Wing Inner Contour Slit */}
      <path
        d="M 13.5 6 L 14.5 6 L 27.5 12"
        stroke="#08090d"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lower Wing Inner Contour Slit */}
      <path
        d="M 13.5 26 L 14.5 26 L 27.5 20"
        stroke="#08090d"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flared Aft Skirt Divider */}
      <line x1="12" y1="12" x2="12" y2="20" stroke="#08090d" strokeWidth="1" strokeLinecap="round" />

      {/* Center Engine Nozzle Bell Core */}
      <rect x="4.5" y="14.8" width="1.8" height="2.4" rx="0.4" fill="#38bdf8" />
    </svg>
  );
}
