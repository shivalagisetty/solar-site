# Design System — Neo Sky & Sun

The visual language for the solar landing page. Read this fully before building any UI. Tokens live in `src/index.css` under `@theme`; copy this list into CSS verbatim when scaffolding the theme.

## Concept

A luminous "dawn-to-noon" sky, with a low warm sun grazing the horizon. The page should feel **calm, optimistic, and engineered** — clean enough to read as premium, warm enough to feel human. Cool sky tones dominate (≈70%), warm sun tones accent (≈25%), with crisp ink/charcoal for text (≈5%).

## Color tokens

Add to `@theme` in `src/index.css`:

```css
@theme {
  /* Sky — cool side */
  --color-sky-50:  #f0f9ff;
  --color-sky-100: #e0f2fe;
  --color-sky-200: #bae6fd;
  --color-sky-300: #7dd3fc;
  --color-sky-400: #38bdf8;
  --color-sky-500: #0ea5e9; /* primary blue */
  --color-sky-600: #0284c7;
  --color-sky-700: #0369a1;
  --color-sky-900: #0c2a4a; /* deep horizon */

  /* Sun — warm accent */
  --color-sun-50:  #fff8eb;
  --color-sun-100: #ffeac4;
  --color-sun-200: #ffd58a;
  --color-sun-300: #ffbe57;
  --color-sun-400: #ffa726; /* primary amber */
  --color-sun-500: #f97316;
  --color-sun-600: #ea580c;
  --color-sun-700: #c2410c;

  /* Ink */
  --color-ink-900: #0b1220;
  --color-ink-700: #1e293b;
  --color-ink-500: #475569;
  --color-ink-300: #94a3b8;

  /* Glass / surface */
  --color-glass-white: color-mix(in oklab, white 70%, transparent);
  --color-glass-edge:  color-mix(in oklab, white 35%, transparent);

  /* Radii */
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-2xl: 36px;

  /* Shadows — soft, layered, never harsh */
  --shadow-glow-sun: 0 30px 80px -20px rgb(255 167 38 / 0.45);
  --shadow-glow-sky: 0 30px 80px -20px rgb(14 165 233 / 0.35);
  --shadow-card:     0 1px 0 rgb(255 255 255 / 0.6) inset,
                     0 20px 40px -20px rgb(15 23 42 / 0.18);

  /* Type */
  --font-display: "Geist", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-body:    "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    "Geist Mono", ui-monospace, monospace;
}
```

## Signature gradients

Use these as page/section backgrounds. Don't invent new ones without a reason.

- **Dawn sky (hero):** `bg-[radial-gradient(120%_80%_at_50%_0%,#e0f2fe_0%,#bae6fd_30%,#fff8eb_70%,#ffd58a_100%)]`
- **Noon haze (mid-page):** `bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_60%,#fff8eb_100%)]`
- **Sun flare (accent block):** `bg-[radial-gradient(60%_60%_at_80%_30%,#ffbe57_0%,transparent_60%),radial-gradient(50%_50%_at_20%_80%,#7dd3fc_0%,transparent_60%)]`
- **Deep horizon (footer/CTA):** `bg-[linear-gradient(180deg,#0c2a4a_0%,#0369a1_60%,#f97316_120%)]`

Layer a subtle noise/grain overlay on hero/CTA sections (SVG fractal noise at ~3% opacity) to prevent banding.

## Typography scale

Use `font-display` for h1–h3, `font-body` for everything else. Tracking and weights:

- Display XL — `text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-[0.95]`
- Display L  — `text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05]`
- Display M  — `text-3xl md:text-4xl font-medium tracking-[-0.02em]`
- Title     — `text-xl md:text-2xl font-medium tracking-tight`
- Body L    — `text-lg leading-relaxed text-ink-700`
- Body      — `text-base leading-relaxed text-ink-700`
- Caption   — `text-sm text-ink-500`
- Eyebrow   — `text-xs uppercase tracking-[0.18em] font-medium text-sky-700`

Never put gradients on body copy. Headlines may use a sky→sun gradient sparingly (one per page max).

## Components

Every visual primitive should follow these recipes. Don't recreate them ad hoc.

### Glass card
```
rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl
shadow-[var(--shadow-card)] p-6 md:p-8
```

### Primary button (sun)
```
inline-flex items-center gap-2 rounded-full px-6 py-3
bg-gradient-to-b from-sun-300 to-sun-500 text-ink-900 font-medium
shadow-[var(--shadow-glow-sun)]
hover:from-sun-200 hover:to-sun-400 transition
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun-600
```

### Secondary button (glass)
```
inline-flex items-center gap-2 rounded-full px-6 py-3
bg-white/60 backdrop-blur-md border border-white/50 text-ink-900
hover:bg-white/80 transition
```

### Section wrapper
```
relative isolate overflow-hidden py-24 md:py-32 px-6
mx-auto max-w-7xl
```

### Eyebrow + heading pattern
```tsx
<p className="text-xs uppercase tracking-[0.18em] font-medium text-sky-700">How it works</p>
<h2 className="mt-3 text-4xl md:text-5xl font-medium tracking-[-0.03em] text-ink-900">
  Sunlight in. Savings out.
</h2>
```

## Page sections (recommended order)

1. **Hero** — full-bleed dawn-sky gradient, headline + subhead + dual CTA, abstract sun-glare SVG, scroll cue.
2. **Trust bar** — partner/inverter logos (LG, Tesla, Enphase, SunPower), grayscale at 60% opacity.
3. **Value props** — 3 glass cards (Save, Power, Plan-it) with lucide icons.
4. **How it works** — 4-step numbered timeline, alternating left/right with screenshots/photos.
5. **Savings calculator** — interactive card: ZIP + monthly bill → estimated payback / 25-yr savings (recharts area chart).
6. **Use cases** — tabs for Home / Commercial / Industrial.
7. **Process & timeline** — Gantt-ish horizontal stepper.
8. **Testimonials** — quote cards with installer-site photos.
9. **FAQ** — accordion, schema.org/FAQPage markup.
10. **Final CTA** — deep-horizon gradient, single bold CTA.
11. **Footer** — minimal, with certifications (NABCEP, BBB), warranty terms.

## Motion

- Library: Motion / Framer Motion (`npm i motion`). Add only when the first animated section is built.
- Scroll-in: `opacity 0 → 1`, `y 16 → 0`, `duration 0.6`, `ease [0.22, 1, 0.36, 1]`.
- Hover lift on cards: `translateY(-2px)` + shadow intensify, `transition-all duration-300`.
- Sun-glare ambient: very slow (20–40s) hue rotate or position drift on the hero gradient.
- Always wrap with `useReducedMotion()` to disable for users who opt out.

## Imagery

- Real installs at golden hour or dusk. Avoid handshake/family stock cliches.
- Drone aerials of solar arrays — emphasize geometry and scale.
- Abstract: lens flares, prism refractions, soft bokeh — used sparingly behind glass cards.
- All raster images: WebP/AVIF, `loading="lazy"` except hero, `<picture>` with explicit sizes.

## Accessibility checklist

- Color contrast: body text ≥ 4.5:1, large text ≥ 3:1. Verify against gradient backgrounds — add a soft white scrim if needed.
- All interactive elements reachable by keyboard, with a visible focus ring (`focus-visible:outline-2 outline-offset-2 outline-sky-500`).
- Animations gated on `prefers-reduced-motion: reduce`.
- Form labels are real `<label>` elements; never placeholder-as-label.
- Hero headline is a single `<h1>`; one per page.

## Don'ts

- No generic eco-green. The "green" in this brand is sky + sun, not chlorophyll.
- No hard drop shadows. Shadows are soft, colored, and layered.
- No gradient text on paragraph copy.
- No bouncy/spring motion. Calm, engineered easing only.
- No emoji as UI icons. Use `lucide-react`.
- No more than one display gradient per viewport.
