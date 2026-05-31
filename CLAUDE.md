# CLAUDE.md

Guidance for Claude when working in this repo. Read this first, then `docs/DESIGN_SYSTEM.md` before writing any UI.

## Project

Marketing landing page for a solar installation firm (residential, commercial, industrial). The site needs to feel **ultra-modern, premium, and aspirational** — a "neo sky & sun" aesthetic: luminous gradients, soft atmospheric depth, glassy surfaces, and warm solar accents against cool sky tones. Think Apple-grade polish meets Tesla Energy / Arcadia / Sunrun, not a generic local-installer template.

## Stack

- Vite 8 + React 19 + TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/vite` — **no `tailwind.config.js`, no PostCSS config**. Theme tokens live in `src/index.css` under `@theme`.
- ESLint 10 (flat config in `eslint.config.js`)
- No router, no state library, no UI kit yet. Don't add one without being asked.
- No test runner configured.

## Commands

- `npm run dev` — dev server (HMR)
- `npm run build` — `tsc -b` then production build
- `npm run preview` — serve production build
- `npm run lint` — ESLint over the repo

After any non-trivial change, run `npm run lint` and `npm run build` and fix issues before declaring done.

## Code style

- TypeScript strict; no `any`, prefer explicit prop types via `interface`.
- Functional components with named exports; one component per file unless tightly coupled.
- File naming: `PascalCase.tsx` for components, `camelCase.ts` for utilities, `kebab-case` for assets.
- Folder layout (create as needed):
  - `src/components/` — reusable UI primitives (Button, Card, Section, etc.)
  - `src/sections/` — page-level sections (Hero, HowItWorks, Pricing, Testimonials, FAQ, CTA, Footer)
  - `src/lib/` — pure helpers, hooks (`use-*.ts`)
  - `src/assets/` — imported images/SVGs
- Use `clsx` (add via npm if needed) for conditional classes; never string-concat Tailwind classes.
- Imports order: React/3rd-party → aliases/internal → relative → styles. No unused imports.
- Accessibility is non-negotiable: semantic HTML, `alt` on every image, focus rings preserved, `prefers-reduced-motion` respected on animations.

## Tailwind v4 rules

- Customize tokens (colors, fonts, radii, shadows) with `@theme` in `src/index.css`. Don't create a JS config.
- Prefer the design tokens from `docs/DESIGN_SYSTEM.md` over arbitrary values. Reach for `bg-[#...]` only when no token fits, and flag it for follow-up.
- Use Tailwind utilities directly in JSX. Avoid `@apply` except for tiny shared primitives in `index.css`.
- Design **light-first** with the luminous sky/sun palette. Add `dark:` variants only if/when dark mode is requested.

## Design direction (summary — full spec in `docs/DESIGN_SYSTEM.md`)

- **Mood:** dawn-to-noon sky with a low warm sun. Cool sky blues + cyan + soft white at the top, warming into amber/peach/coral lower down.
- **Surfaces:** large radial/linear gradients, subtle grain or noise overlay, frosted-glass cards (`backdrop-blur`), thin 1px borders with low-opacity white.
- **Typography:** display in a modern geometric sans (Inter, Geist, or similar via Google/Fontsource); generous tracking-tight on headlines; comfortable measure on body.
- **Motion:** gentle, physics-y. Fade + 8–16px translate on scroll-in. No bouncy/cartoonish springs. Honor `prefers-reduced-motion`.
- **Imagery:** rooftop installs at golden hour, drone-style aerial shots, abstract sun-glare lens artifacts. Avoid stock-photo clichés (handshakes, cartoon houses, generic green leaves).
- **Don'ts:** generic eco-green, hard drop shadows on flat cards, gradient text on body copy, emoji as icons in production UI.

## When generating UI

1. Read `docs/DESIGN_SYSTEM.md` and reuse the defined tokens, gradients, and component recipes.
2. Build sections as composable components in `src/sections/`, each fully self-contained.
3. Make it responsive mobile-first. Mentally check 375px, 768px, 1280px, 1536px.
4. Prefer real, specific copy over `Lorem ipsum` — solar-domain language (kWh offset, payback period, net metering, NEM 3.0, ITC, microinverter, etc.).
5. For icons, use `lucide-react`. For charts (savings calculators), use `recharts`. Add via npm only when first needed.

## Ask before doing

Skip clarifying questions for small visual tweaks. Ask before:

- Adding a new dependency (router, animation lib, UI kit, CMS).
- Introducing a backend, form handler, or analytics pipeline.
- Changing tooling (Vite config, TS config, ESLint config).

## Architecture (current)

Single-page React app. Entry: `src/main.tsx` → `src/App.tsx`. Static assets in `public/` (served at `/`) and `src/assets/` (imported as modules). Update this section when routing, state, or data-fetching is introduced.
