import { useState } from "react";
import { Home, Building2, Factory, ArrowUpRight } from "lucide-react";
import { Section } from "../components/Section";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { cn } from "../lib/cn";

type Key = "home" | "commercial" | "industrial";

const TABS: Record<
  Key,
  {
    icon: typeof Home;
    label: string;
    headline: string;
    body: string;
    bullets: string[];
    metric: { k: string; v: string }[];
  }
> = {
  home: {
    icon: Home,
    label: "Residential",
    headline: "Designed for one roof. Yours.",
    body:
      "Most Indian homes need 8–12 panels and a 5 kWh battery for backup. We size to your usage and your DISCOM's net-metering cap — no oversized systems just to chase a bigger ticket.",
    bullets: [
      "Battery backup ready (Luminous, Exide NXT, or Tesla Powerwall)",
      "1–2 day install for most flat-roof and tile-roof homes",
      "PM Surya Ghar subsidy (up to ₹78,000) filed and tracked for you",
    ],
    metric: [
      { k: "5 kW", v: "avg. system size" },
      { k: "₹1.97 L", v: "avg. net cost" },
      { k: "3.8 yrs", v: "median payback" },
    ],
  },
  commercial: {
    icon: Building2,
    label: "Commercial",
    headline: "Cut your second-largest line item.",
    body:
      "MSMEs, schools, and showrooms see 50–75% bill reduction with rooftop arrays. We finance via OPEX (zero capex) or CAPEX with 40% accelerated depreciation, and handle CEIG approval end-to-end.",
    bullets: [
      "OPEX/RESCO model — fixed ₹/unit, 30% below DISCOM tariff",
      "40% accelerated depreciation modelled into your proposal",
      "Engineered for RCC, metal-deck, and tin-shed roofs",
    ],
    metric: [
      { k: "100 kW", v: "avg. system size" },
      { k: "62%", v: "bill reduction" },
      { k: "4.2 yrs", v: "median payback" },
    ],
  },
  industrial: {
    icon: Factory,
    label: "Industrial",
    headline: "Megawatt-scale, behind-the-meter.",
    body:
      "Textiles, pharma, cold storage, foundries — sites with three-shift baseload are our sweet spot. We co-locate solar + BESS to flatten MD charges and stack open-access wheeling where the state allows.",
    bullets: [
      "Demand-charge management via behind-the-meter BESS",
      "SCADA + Modbus integration with your existing EMS",
      "Group captive / open-access modelling included",
    ],
    metric: [
      { k: "2.5 MW", v: "median project" },
      { k: "₹4.8 cr", v: "annual savings" },
      { k: "3.6 yrs", v: "median payback" },
    ],
  },
};

export function UseCases() {
  const [active, setActive] = useState<Key>("home");
  const tab = TABS[active];

  return (
    <Section id="cases" className="bg-white">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Built for</Eyebrow>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink-900">
              One playbook. Three scales.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Use cases"
            className="inline-flex p-1 rounded-full bg-sky-50 border border-sky-100 self-start md:self-end"
          >
            {(Object.keys(TABS) as Key[]).map((k) => {
              const Icon = TABS[k].icon;
              const isActive = active === k;
              return (
                <button
                  key={k}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(k)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-white text-ink-900 shadow-[0_4px_12px_-6px_rgba(15,23,42,0.2)]"
                      : "text-ink-500 hover:text-ink-700",
                  )}
                >
                  <Icon size={16} />
                  {TABS[k].label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-12">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl border border-white/60 bg-[radial-gradient(80%_80%_at_30%_20%,#e0f2fe_0%,#bae6fd_30%,#fff8eb_70%,#ffd58a_100%)] p-8 md:p-10 relative overflow-hidden noise">
            <div
              aria-hidden
              className="absolute -top-16 -right-16 size-64 rounded-full bg-[radial-gradient(circle,rgba(255,190,87,0.7)_0%,rgba(255,190,87,0)_60%)] blur-2xl"
            />
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/60 px-3 py-1 text-xs font-medium text-sky-700">
              <tab.icon size={14} /> {tab.label}
            </span>
            <h3 className="mt-6 font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink-900">
              {tab.headline}
            </h3>
            <p className="mt-4 text-ink-700 leading-relaxed text-lg max-w-md">
              {tab.body}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {tab.metric.map((m) => (
                <div
                  key={m.v}
                  className="rounded-xl border border-white/70 bg-white/65 backdrop-blur px-3 py-3"
                >
                  <dt className="font-display text-xl font-semibold tracking-tight text-ink-900">
                    {m.k}
                  </dt>
                  <dd className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-ink-500">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl border border-ink-900/5 bg-sky-50/40 p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.18em] font-medium text-sky-700">
              What you get
            </p>
            <ul className="mt-6 space-y-5">
              {tab.bullets.map((b) => (
                <li key={b} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-1 grid place-items-center size-6 rounded-full bg-gradient-to-br from-sun-200 to-sun-400 text-ink-900 text-xs font-semibold"
                  >
                    ✓
                  </span>
                  <span className="text-ink-700 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className="mt-10 inline-flex items-center gap-2 text-sky-700 font-medium hover:text-sky-900 transition"
            >
              Talk to a {tab.label.toLowerCase()} engineer
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
