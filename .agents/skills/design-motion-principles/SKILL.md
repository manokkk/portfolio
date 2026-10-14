---
name: design-motion-principles
description: Motion design and interaction physics principles for React and Framer Motion. Curated from design engineering standards (Emil Kowalski, Jakub Krehel). Enforces snappy spring physics, micro-durations under 250ms, tactile feedback, and interruptible state transitions.
---

# Design Motion Principles (Framer Motion & Interaction Engineering)

UI animation must feel physical, intentional, and instantaneous. Bad animations feel sluggish, floaty, or distracting; great motion provides spatial context, confirms direct manipulation, and disappears into the background.

## 1. The Core Philosophy (Emil Kowalski Lens)
- **Speed Over Drama:** Everyday productivity and navigation interactions must take less than **200ms–250ms**. If an interaction takes longer than 300ms, it feels like lagging software.
- **Spring Physics Over Easing Curves:** For direct-manipulation elements (modals, drawers, card tilts, drag, gestures), use spring physics rather than arbitrary bezier curves.
  ```js
  // Snappy, production-tested spring recipe
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.8
  }
  ```
- **Never Animate for the Sake of Animating:** Every animation must answer one question: *Where did this element come from, and where does it go?*
- **Subtle Bounce:** Never allow extreme comical bouncing in web UI. Springs should settle within 1.5 oscillations max.

## 2. Interaction Timing Matrix

| Interaction Type | Recommended Transition | Target Duration |
| :--- | :--- | :--- |
| **Micro-hover (Buttons, Chips)** | Scale `1.02` to `1.04`, subtle border glow | `0.15s` – `0.18s` |
| **Active Click / Tap** | Scale `0.97` to `0.98` | Instant (`0.1s`) |
| **Dropdown / Tooltip / Popover** | Scale `0.96 -> 1` + Opacity `0 -> 1` | `0.18s` – `0.22s` |
| **Modal / Dialog Entrance** | Scale `0.95 -> 1` + Opacity `0 -> 1` (Spring) | `stiffness: 380, damping: 28` |
| **Page / Section Stagger** | Stagger children `0.06s` | Max total `< 0.4s` |

## 3. Directional Momentum (Jakub Krehel Lens)
- **Enter from Intent:** If an element was clicked from the top right, modals or menus should scale or translate outward from that origin (`transformOrigin`).
- **Exit Faster Than Entrance:** When removing an element from the screen, animate it out **30% faster** than its entrance so the user is not waiting for old content to vanish.
  ```js
  // Framer motion variant pattern
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 30 } },
    exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.12, ease: "easeIn" } }
  };
  ```

## 4. Hardware Acceleration & Best Practices
- **Only Composable Properties:** Only mutate `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`.
- **Force GPU Layer:** For complex 3D cards or elements with backdrop filters, apply `willChange: "transform, opacity"` or `translateZ(0)`.
- **Layout Animations with Caution:** When using `layout` or `layoutId` in Framer Motion, set `layoutDependency` and ensure children with border radiuses or text use `layout="position"` to avoid distortion.
