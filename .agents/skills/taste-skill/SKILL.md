---
name: taste-skill
description: Anti-slop frontend skill for portfolios and landing pages. Enforces intentional art direction, bold editorial layout, high contrast, distinctive typography, and eliminates predictable AI defaults (like generic purple blur halos, centered 3-card grids, and decorative filler).
---

# TasteSkill (Anti-Slop Art Direction)

A page built by default usually looks like the average of every page an AI has seen: a centered headline over three lines, a small pill label above it, a row of three identical icon cards, a soft purple blur gradient, thin borders, and a monospace subtitle. Nothing in it is wrong, but nothing was intentionally decided.

This skill replaces those defaults with deliberate, high-craft design decisions.

## 1. Eliminate the "AI Tells" (Anti-Slop Rules)
- **NO Generic Purple/Cyan Blurs:** Never drop blurry glowing radial gradient blobs behind cards or hero text without architectural purpose.
- **NO Cookie-Cutter Three-Card Grids:** Avoid predictable 3-column identical box layouts. Use varied aspect ratios, asymmetric Bento grids, or editorial staggered layouts.
- **NO Meaningless Pill Badges:** Don't put "✦ Welcome to my portfolio" or "✨ Creative Developer" as a rounded pill above every title unless it conveys vital metadata (e.g. status: `● Available for Q4 2026`).
- **NO Generic Centering:** Avoid centering everything. Left-aligned, bold editorial rhythm with high-contrast typography conveys far more craft and confidence.
- **NO Decorative Filler Without Substance:** Every element must earn its place. Use real metrics, real tech architectures, real case study previews, or authentic personality over decorative noise.

## 2. Typography First
- **Display Scale:** Headlines should have commanding presence (large, tight tracking `-0.03em` to `-0.04em`, balanced line-height `0.95` to `1.1`).
- **Text Wrapping:** Always apply `text-wrap: balance` on headers and `text-wrap: pretty` on body copy to eliminate orphan words.
- **Contrast & Pairing:** Pair a bold, expressive display font (e.g., *Outfit* or *Plus Jakarta Sans*) with crisp, readable body text and high-contrast monospace accents for technical metadata.

## 3. Surface & Depth Architecture
- Replace flat opacity cards with rich, layered surfaces:
  - Surface Base: Deepest background (`#07080e` or `#090a0f`).
  - Surface Card: Subtly tinted container with 1px border using `color-mix` or `rgba(255, 255, 255, 0.08)`.
  - Surface Interactive: Light-reflecting hover state with inner bevel or hairline highlights.
- Use subtle noise textures, frosted glass (`backdrop-blur-md`), or directional borders instead of heavy drop shadows.

## 4. Substantive Content Rhythm
- Highlight client/employer proof, actual code capabilities, live preview links, and concrete technical solutions.
- Give breathing room: generous vertical spacing (`padding: 6rem` to `10rem` between major sections) gives the eye room to focus on high-impact work.
