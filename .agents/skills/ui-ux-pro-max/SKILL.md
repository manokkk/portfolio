---
name: ui-ux-pro-max
description: Design system intelligence toolkit for building modern UI/UX. Includes rules for Bento Grid layouts, glassmorphism, dark-mode surface elevation, accessible color harmonizing, and technical typography.
---

# UI UX Pro Max (Design System & Layout Architecture)

A systematic toolkit for constructing cohesive, modern, and production-grade web interfaces.

## 1. Bento Grid Architecture
Instead of repetitive equal-width cards:
- **Hero / Flagship Cell:** Span 2 columns or 2 rows for your primary item (e.g. your best project, live demo, or core technical specialty).
- **Secondary Cells:** Compact 1-column cells for quick stats, github commit graphs, tech stack pills, or live badges.
- **Visual Weight Distribution:** Combine interactive canvases/3D elements, typography callouts, and clean data points across the grid so no quadrant feels visually empty or overcrowded.

## 2. Dark-Mode Surface Elevation System
Pure black backgrounds (`#000000`) often cause eye strain and harsh contrast with bright text. Use layered dark tones:
- **Layer 0 (Canvas Base):** `#06070a` – `#08090d` (Deepest canvas behind WebGL particles/stars)
- **Layer 1 (Section Wrappers):** `#0c0d12`
- **Layer 2 (Cards & Containers):** `#12131a` with 1px border `rgba(255, 255, 255, 0.08)`
- **Layer 3 (Elevated / Modals):** `#181924` with subtle top highlight border `rgba(255, 255, 255, 0.15)`
- **Interactive State:** Hover state brightens background by 4% and strengthens border luminosity.

## 3. High-Craft Glassmorphism (No Muddy Frosted Glass)
Muddy glass comes from heavy gray backgrounds and thick borders. High-end frosted glass requires:
1. `backdrop-filter: blur(12px) saturate(160%)`
2. Very transparent background: `rgba(18, 19, 26, 0.65)`
3. Directional hairline border: Subtle gradient border or `rgba(255, 255, 255, 0.1)` on top, fading to `rgba(255, 255, 255, 0.03)` at the bottom.
4. Inner shadow highlight: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`.

## 4. Typography Hierarchy & Sizing Rules
- **Headline Display:** `font-family: 'Outfit', sans-serif`, weight `700` or `800`, letter-spacing `-0.03em`.
- **Body & Controls:** `font-family: 'Plus Jakarta Sans', sans-serif`, weight `400`–`500`, line-height `1.6`.
- **Code & Metadata:** Monospace font for timestamps, metrics, git tags, and terminal outputs.
