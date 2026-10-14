# AGENTS.md — AI Engineering Directives

This repository enforces strict design engineering and UI/UX standards for all AI assistants.

## Mandatory Directives Before Making Any Code Changes:
1. **Adhere to `DESIGN.md`:** All UI components, colors, spacing, and typography must follow the design token architecture defined in [DESIGN.md](file:///d:/Portfolio/DESIGN.md).
2. **Execute Anti-Slop Check (TasteSkill):** Do not generate generic centered card layouts or blurry radial gradient blobs. Maintain intentional asymmetry, high-contrast typography, and purposeful negative space.
3. **Verify Vercel Web Interface Guidelines:**
   - Every `<button>` must have accessible labels (`aria-label` for icon-only).
   - Never use `outline: none` without providing a `:focus-visible` replacement.
   - Use `text-wrap: balance` on headers and `tabular-nums` on numbers.
   - All interactive elements must support keyboard navigation.
4. **Follow Spring Physics (Design Motion Principles):**
   - Use Framer Motion spring physics (`stiffness: 400, damping: 28`) for interactive elements.
   - Micro-interactions must stay under `250ms`.
   - Never animate `width`, `height`, or layout properties; only animate `transform` and `opacity`.
5. **Preserve Three.js Canvas Performance:**
   - Keep 3D canvas rendering composited behind HTML layers without blocking DOM event propagation.
