import { PiggyBank, Zap, ClipboardCheck } from "lucide-react";
import { Section } from "../components/Section";
import { Eyebrow } from "../components/Eyebrow";
import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";

const VALUES = [
  {
    icon: PiggyBank,
    title: "Save",
    body:
      "Lock in tomorrow's tariff at today's price. The average Helio customer offsets 92% of their DISCOM bill and clears payback inside four years.",
    metric: "₹14.6 L",
    metricLabel: "avg 25-yr savings",
  },
  {
    icon: Zap,
    title: "Power",
    body:
      "Tier-1 BIS-certified panels, microinverter-per-module architecture, and battery-ready inverters. Built to outlive the warranty — not survive it.",
    metric: "25 yrs",
    metricLabel: "production warranty",
  },
  {
    icon: ClipboardCheck,
    title: "Plan-it",
    body:
      "We file the PM Surya Ghar subsidy, the DISCOM net-metering application, and the structural NOC. You sign once. We do the rest.",
    metric: "₹78,000",
    metricLabel: "central subsidy, secured",
  },
] as const;

export function ValueProps() {
  return (
    <Section className="bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_60%,#fff8eb_100%)]">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Why Helio</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink-900">
            Premium hardware. Honest math. Zero surprises.
          </h2>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            Most installers sell panels. We design energy systems — sized to
            your load profile, your roof, and your state's net-metering policy
            — whether you're in Karnataka, Maharashtra, or Tamil Nadu.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 80}>
            <GlassCard hover className="h-full">
              <span
                aria-hidden
                className="grid place-items-center size-12 rounded-xl bg-gradient-to-br from-sky-100 to-sun-100 border border-white/70 text-sky-700"
              >
                <v.icon size={22} strokeWidth={2} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink-900">
                {v.title}
              </h3>
              <p className="mt-3 text-ink-700 leading-relaxed">{v.body}</p>
              <div className="mt-8 pt-5 border-t border-ink-900/5">
                <p className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink-900">
                  {v.metric}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-500">
                  {v.metricLabel}
                </p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
