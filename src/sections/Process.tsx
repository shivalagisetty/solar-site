import { Section } from "../components/Section";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";

const PHASES = [
  { label: "Quote", weeks: "Day 1", span: 1, color: "from-sky-300 to-sky-500" },
  { label: "Design", weeks: "Wk 1", span: 1, color: "from-sky-400 to-sky-600" },
  { label: "DISCOM", weeks: "Wk 2–4", span: 3, color: "from-sky-500 to-sun-300" },
  { label: "Install", weeks: "Wk 5", span: 1, color: "from-sun-300 to-sun-400" },
  { label: "CEIG", weeks: "Wk 6", span: 1, color: "from-sun-400 to-sun-500" },
  { label: "Net meter", weeks: "Wk 7–8", span: 2, color: "from-sun-500 to-sun-600" },
];

const TOTAL = PHASES.reduce((a, p) => a + p.span, 0);

export function Process() {
  return (
    <Section className="bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_60%,#f0f9ff_100%)]">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Process & timeline</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink-900">
            Eight weeks. Signed contract to switched on.
          </h2>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            We've shaved an average of three weeks off industry timelines by
            front-loading design and pre-filing the DISCOM application the day
            you sign.
          </p>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-14">
        <div className="rounded-3xl border border-white/60 bg-white/55 backdrop-blur-xl shadow-[var(--shadow-card)] p-6 md:p-10">
          {/* Stepper bar */}
          <div className="flex w-full overflow-hidden rounded-full bg-sky-50 h-3">
            {PHASES.map((p) => (
              <div
                key={p.label}
                className={`bg-gradient-to-r ${p.color}`}
                style={{ width: `${(p.span / TOTAL) * 100}%` }}
              />
            ))}
          </div>

          {/* Labels */}
          <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4">
            {PHASES.map((p, i) => (
              <div key={p.label} className="relative">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-ink-900/10" />
                </div>
                <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink-900">
                  {p.label}
                </p>
                <p className="mt-0.5 text-xs text-ink-500">{p.weeks}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink-500 max-w-2xl">
            Timelines vary by DISCOM. Karnataka (BESCOM), Maharashtra (MSEDCL),
            and Tamil Nadu (TANGEDCO) typically run on schedule; Delhi and
            Gujarat are even faster. Tier-2 cities may add 1–2 weeks during
            net-meter installation.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
