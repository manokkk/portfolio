# Design System & Engineering Specification (DESIGN.md)
**Project:** Mico Gianan — Full-Stack Developer & Designer Portfolio  
**Architecture:** React 19 + Vite + Vanilla CSS + Framer Motion + Three.js  
**Standard:** Enforces TasteSkill, Vercel Web Interface Guidelines, UI UX Pro Max, and Design Motion Principles.

---

## 1. Visual Language & Brand Tokens

### Color Palette (Elevated Dark Theme)
```css
:root {
  /* Surfaces */
  --bg-deep: #06070a;          /* Deepest canvas background behind WebGL */
  --bg-surface-1: #0c0d14;      /* Section level container */
  --bg-surface-2: #12131e;      /* Card & interactive panel background */
  --bg-surface-elevated: #1a1b2a; /* Modals, dropdowns, sticky elements */
  
  /* Glassmorphism Tokens */
  --glass-bg: rgba(12, 13, 20, 0.72);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-hover: rgba(255, 255, 255, 0.18);
  --glass-highlight: inset 0 1px 0 0 rgba(255, 255, 255, 0.12);

  /* Accents & Brand Tones */
  --accent-cyan: #38bdf8;       /* Primary highlight (electric sky) */
  --accent-indigo: #6366f1;     /* Secondary highlight (deep cosmic indigo) */
  --accent-emerald: #10b981;    /* Live status, success indicator */
  --accent-amber: #f59e0b;      /* Notice / warning */

  /* Typography Colors */
  --text-primary: #f8fafc;      /* High contrast readability */
  --text-secondary: #94a3b8;    /* Subtitles, descriptions */
  --text-muted: #64748b;        /* Metadata, labels, inactive tabs */
  --text-code: #38bdf8;         /* Technical tokens, numbers */
}
```

---

## 2. Typography Rules (TasteSkill Standard)
* **Display Font:** `Outfit`, sans-serif (Weights: 600, 700, 800)
  * Headings must use tight letter-spacing: `-0.03em` to `-0.04em`.
  * Always use `text-wrap: balance` on headers to eliminate orphan words.
* **Body Font:** `Plus Jakarta Sans`, sans-serif (Weights: 400, 500)
  * Line-height must stay between `1.5` and `1.65` for optimal readability.
  * Always use `text-wrap: pretty` on paragraphs.
* **Monospace Font:** `ui-monospace, 'JetBrains Mono', Consolas, monospace`
  * Used for: Git tags, commit hashes, code blocks, technology badges, timestamps.
  * Numbers must use `font-variant-numeric: tabular-nums` to prevent layout jitter.

---

## 3. Motion Engineering & Spring Physics (Emil Kowalski Spec)
All transitions must be snappy, subtle, and intentional. Never use slow floaty eases.

* **Standard Micro-Spring (Buttons, Badges, Hover cards):**
  ```js
  transition: { type: "spring", stiffness: 400, damping: 28, mass: 0.8 }
  ```
* **Modal / Overlay Spring (ResumeModal, Drawers):**
  ```js
  transition: { type: "spring", stiffness: 380, damping: 30 }
  ```
* **Micro-durations:**
  * Button hover/tap: `0.15s`
  * Tab switch / filter change: `0.2s`
  * Stagger interval between items: `0.05s` – `0.08s`
  * Exit animations must be **30% faster** than entrances.
* **Reduced Motion:** Provide non-transform fallbacks when `prefers-reduced-motion` is detected.

---

## 4. Accessibility & Vercel Web Standards
* **Focus States:** Every button, input, and interactive link must have a visible focus replacement:
  ```css
  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--bg-deep), 0 0 0 4px var(--accent-cyan);
  }
  ```
* **Semantic Tags:** Never use `<div onClick>`. Always use `<button>` for actions, `<a>` for links.
* **Icon-Only Controls:** Must include `aria-label="Description"`.
* **Decorative Icons:** Must include `aria-hidden="true"`.
* **Form Quality:** Inputs must have `autoComplete`, clickable labels, and clear loading/disabled feedback during async requests.
* **Anchors:** Sections must use `scroll-margin-top: 5rem` to prevent fixed navigation from overlapping headings.

---

## 5. Do's and Don'ts Checklist

| Do | Don't |
| :--- | :--- |
| **Do** use asymmetric Bento grid layouts with distinct hero items. | **Don't** use identical 3-card horizontal repeating blocks. |
| **Do** use crisp hairline borders (`rgba(255, 255, 255, 0.08)`). | **Don't** use generic large muddy drop shadows. |
| **Do** keep animations snappy and under `250ms`. | **Don't** use floaty 1-second linear easing that slows navigation. |
| **Do** use real project screenshots, live metrics, and live GitHub data. | **Don't** rely on vague placeholder text or generic AI purple glow blobs. |
| **Do** test viewports on mobile (375px), tablet (768px), and desktop (1280px). | **Don't** allow horizontal scroll or truncated text on small screens. |
