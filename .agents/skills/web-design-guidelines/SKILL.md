---
name: web-design-guidelines
description: Audit and review UI components against Vercel's official Web Interface Guidelines. Enforces 100+ production standards for accessibility, focus states, form usability, animation performance, typography, and content resiliency.
---

# Web Interface Guidelines (Vercel Production Standards)

Review and build all UI code in this project in strict compliance with these production engineering guidelines.

## 1. Accessibility (a11y)
- **Buttons vs Links:** Use `<button>` for actions (triggering modals, submitting forms, toggling state); use `<a>` or `<Link>` for navigation. Never `<div onClick>`.
- **Icon-Only Buttons:** Every icon-only button must have an explicit `aria-label` (e.g., `aria-label="Close modal"`).
- **Decorative Icons:** Any icon accompanied by text must have `aria-hidden="true"` so screen readers don't stutter.
- **Form Labels:** Every input must be associated with a `<label>` (via `htmlFor` matching `id`) or have an `aria-label`.
- **Keyboard Navigation:** All interactive custom elements must handle `onKeyDown` (support `Enter` and `Space`, `Escape` for modals).
- **Heading Hierarchy:** Strictly maintain `h1` through `h6` order without skipping levels. Single `h1` per page.
- **Anchor Offsets:** Set `scroll-margin-top: 5rem` or equivalent on section headings with IDs so sticky headers don't obscure content on hash navigation.

## 2. Focus States
- **Never `outline-none` Without Replacement:** Never strip browser focus rings without adding a crisp replacement (e.g., `focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`).
- **Use `:focus-visible` Over `:focus`:** Prevents ugly focus rings from showing up on mouse clicks while keeping keyboard tabbing fully accessible.
- **Compound Controls:** Use `focus-within` on card or search wrappers where the entire container should light up when the child input is focused.

## 3. Forms & Inputs
- **Autocomplete & Name:** Inputs must have meaningful `name` and standard `autoComplete` attributes (`email`, `name`, `tel`, etc.).
- **Do Not Block Paste:** Never intercept or block `onPaste`.
- **Spellcheck Disabling:** Set `spellCheck={false}` on email fields, usernames, or technical codes.
- **Submit Feedback:** The submit button must remain active until the request initiates, then show a spinner/loading state while disabling repeated clicks.
- **Inline Error Feedback:** Display error messages immediately adjacent to fields with `aria-live="polite"`.

## 4. Animation & Motion Standards
- **Honor Reduced Motion:** Always provide a reduced-motion fallback using `prefers-reduced-motion` media queries or Framer Motion's reduced motion support.
- **Compositor Only:** Animate `transform` and `opacity` only. Never animate layout-triggering properties like `width`, `height`, `margin`, or `top/left`.
- **No `transition: all`:** Explicitly declare transitions (e.g., `transition: transform 0.2s ease, opacity 0.2s ease`).
- **Interruptible:** Gestures and transitions must respond smoothly mid-flight without stuttering.

## 5. Typography & Content Resiliency
- **Punctuation:** Use true ellipsis `…` instead of `...`, and curly quotes `“ ”` in editorial text.
- **Headings:** Apply `text-wrap: balance` to titles to prevent single trailing words (orphans).
- **Tabular Numbers:** For timestamps, metrics, counters, and statistics, set `font-variant-numeric: tabular-nums` to prevent layout jitter as numbers change.
- **Overflow Protection:** Add `truncate`, `line-clamp-*`, or `break-words` with `min-w-0` on flex items to prevent text from blowing out card layouts.
- **Explicit Image Dimensions:** Always specify `width` and `height` or aspect-ratio on images to eliminate Cumulative Layout Shift (CLS).
