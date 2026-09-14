import { Quote, Star } from "lucide-react";
import { Section } from "../components/Section";
import { Eyebrow } from "../components/Eyebrow";
import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";

const QUOTES = [
  {
    name: "Anjali Krishnan",
    role: "Homeowner · Bengaluru",
    quote:
      "Three other installers handed me a one-page brochure. Kairos handed me a 28-page engineering packet, a shading study, and a payback chart with my actual BESCOM ToD slabs. Easy decision.",
    metric: "5 kW · Luminous 5 kVA",
  },
  {
    name: "Rohan Mehta",
    role: "Director · Mehta Textiles",
    quote:
      "Our MD charges from MSEDCL were eating ₹11 lakh a month. Kairos sized a 480 kW rooftop + 600 kWh BESS and we hit positive cash flow in the first billing cycle.",
    metric: "480 kW OPEX · 4.2 yr payback",
  },
  {
    name: "Dr. Priya Iyer",
    role: "Facilities Head · Aravind Eye Hospital",
    quote:
      "They're the only EPC who showed up with a hospital-grade interconnection plan on day one. CEIG signed off on the first walk-through and we never lost a clinic-day.",
    metric: "1.1 MW shed array",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-white">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>What customers say</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink-900">
            Engineered systems. Engineered relationships.
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 80}>
            <GlassCard hover className="h-full flex flex-col">
              <Quote
                size={28}
                className="text-sun-400"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="mt-5 text-ink-900 leading-relaxed">{q.quote}</p>

              <div className="mt-auto pt-8">
                <div className="flex items-center gap-1 text-sun-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-3 font-medium text-ink-900">{q.name}</p>
                <p className="text-sm text-ink-500">{q.role}</p>
                <p className="mt-3 inline-flex items-center rounded-full bg-sky-50 border border-sky-100 px-2.5 py-1 text-xs font-mono tracking-tight text-sky-700">
                  {q.metric}
                </p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
