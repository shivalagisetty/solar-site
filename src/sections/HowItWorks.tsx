import { Compass, Ruler, Wrench, Activity } from "lucide-react";
import { Section } from "../components/Section";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { cn } from "../lib/cn";

const STEPS = [
  {
    n: "01",
    icon: Compass,
    title: "Site model",
    body:
      "We pull satellite imagery and run a full-year irradiance simulation on your roof using NIWE/MNRE solar resource data. No salesperson on a ladder.",
    chip: "Aurora · HelioScope",
  },
  {
    n: "02",
    icon: Ruler,
    title: "System design",
    body:
      "Engineers size string layout, microinverter pairing, and cable runs against your sanctioned load and your DISCOM's net-metering schedule.",
    chip: "CEA-compliant",
  },
  {
    n: "03",
    icon: Wrench,
    title: "Install week",
    body:
      "Our in-house crews mount, wire, and commission in two to four days. We file the structural NOC and coordinate the DISCOM inspection.",
    chip: "2–4 days on-site",
  },
  {
    n: "04",
    icon: Activity,
    title: "Live monitoring",
    body:
      "Module-level telemetry streams to your phone. If a panel underperforms by 3%, we know before you do — and we dispatch a technician the same week.",
    chip: "25-yr support",
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="how" className="bg-white">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink-900">
            From sunshine to switched-on, in four steps.
          </h2>
        </Reveal>
      </div>

      <ol className="mt-16 space-y-12 md:space-y-20">
        {STEPS.map((step, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={step.n} delay={i * 80}>
              <li
                className={cn(
                  "grid gap-8 md:gap-12 md:grid-cols-2 items-center",
                  reverse && "md:[&>*:first-child]:order-2",
                )}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.2em] text-sky-700">
                      {step.n}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-sky-300/60 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-ink-700 leading-relaxed text-lg">
                    {step.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    {step.chip}
                  </span>
                </div>

                {/* Visual — abstract gradient panel */}
                <div className="relative aspect-[5/4] rounded-3xl overflow-hidden border border-white/60 bg-[radial-gradient(80%_70%_at_30%_20%,#e0f2fe_0%,#bae6fd_40%,#fff8eb_80%,#ffd58a_100%)] shadow-[var(--shadow-card)]">
                  {/* faux solar grid */}
                  <div
                    aria-hidden
                    className="absolute inset-6 rounded-2xl border border-white/50 bg-white/10 backdrop-blur-[2px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(12,42,74,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(12,42,74,0.18) 1px, transparent 1px)",
                      backgroundSize: "14% 22%",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute -top-10 -right-10 size-56 rounded-full bg-[radial-gradient(circle,rgba(255,190,87,0.7)_0%,rgba(255,190,87,0)_60%)] blur-xl"
                  />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl bg-white/70 backdrop-blur px-4 py-3 border border-white/60">
                    <span className="grid place-items-center size-9 rounded-lg bg-gradient-to-br from-sun-200 to-sun-400 text-ink-900">
                      <step.icon size={18} />
                    </span>
                    <span className="font-mono text-xs tracking-[0.18em] text-ink-500">
                      STEP {step.n}
                    </span>
                  </div>
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
