# AGENTS.md

This repo's primary instructions for AI coding agents live in **[CLAUDE.md](./CLAUDE.md)** and the **[design system](./docs/DESIGN_SYSTEM.md)**. Read both before making any change.

Quick rules for any agent (Claude, Cursor, Copilot, etc.):

1. Stack is fixed: Vite 8 + React 19 + TS strict + Tailwind v4. Don't swap or add tooling without asking.
2. Tailwind v4 is **CSS-first** — tokens go in `src/index.css` under `@theme`. No `tailwind.config.js`, no PostCSS config.
3. Aesthetic is "neo sky & sun": luminous gradients, glassy surfaces, sun-warm accents on cool sky tones. No generic eco-green. No bouncy motion.
4. Run `npm run lint && npm run build` after non-trivial changes; fix what breaks.
5. Ask before adding dependencies, backends, routers, or UI kits.
