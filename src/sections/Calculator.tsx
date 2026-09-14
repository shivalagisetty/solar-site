import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section } from "../components/Section";
import { Eyebrow } from "../components/Eyebrow";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";

/**
 * Order-of-magnitude India residential model — not a quote.
 *
 * Assumptions:
 *  - DISCOM tariff ≈ ₹7/unit (urban average across KA/MH/TN/DL slabs)
 *  - Tariff inflation ≈ 4%/yr
 *  - 1 kW rooftop ≈ 120 units/month at India insolation (~4–5 sun-hours)
 *  - System CAPEX ≈ ₹55,000/kW installed (residential, post-GST)
 *  - PM Surya Ghar Muft Bijli Yojana subsidy: ₹30k for 1 kW, ₹60k for 2 kW,
 *    ₹78k cap from 3 kW and up
 *  - System covers ~92% of bill via self-consumption + state net-metering
 */

const TARIFF = 7; // ₹/unit
const KW_PER_BILL_UNIT = 1 / (120 * TARIFF); // kW per ₹1 of monthly bill
const COST_PER_KW = 55_000;
const TARIFF_INFLATION = 0.04;
const OFFSET = 0.92;

function pmSuryaGharSubsidy(kW: number): number {
  if (kW <= 1) return Math.round(30_000 );
  if (kW <= 2) return Math.round(30_000 + 30_000);
  return 78_000;
}

function modelSavings(monthlyBill: number) {
  const kW = +(monthlyBill * KW_PER_BILL_UNIT).toFixed(2);
  const systemCost = Math.round(kW * COST_PER_KW);
  const subsidy = pmSuryaGharSubsidy(kW);
  const netCost = systemCost - subsidy;

  let utility25 = 0;
  for (let yr = 0; yr < 25; yr++) {
    utility25 += monthlyBill * 12 * Math.pow(1 + TARIFF_INFLATION, yr);
  }
  const offsetSavings = utility25 * OFFSET;
  const lifetime = Math.round(offsetSavings - netCost);
  const annualOffset = monthlyBill * 12 * OFFSET;
  const payback = Math.max(2, +(netCost / annualOffset).toFixed(1));

  return { kW, systemCost, subsidy, netCost, lifetime, payback };
}

/** Indian numbering: ₹1,23,456 / ₹15.4 lakh / ₹1.2 crore */
function inr(n: number, opts: { compact?: boolean } = {}): string {
  if (opts.compact) {
    if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} cr`;
    if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)} L`;
  }
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function Calculator() {
  const [bill, setBill] = useState(3500);

  const result = useMemo(() => modelSavings(bill), [bill]);

  const path = useMemo(() => {
    const w = 600;
    const h = 180;
    const points: [number, number][] = [];
    let cum = -result.netCost;
    for (let yr = 0; yr <= 25; yr++) {
      const annual =
        bill * 12 * OFFSET * Math.pow(1 + TARIFF_INFLATION, yr === 0 ? 0 : yr - 1);
      if (yr > 0) cum += annual;
      points.push([yr, cum]);
    }
    const min = Math.min(...points.map((p) => p[1]));
    const max = Math.max(...points.map((p) => p[1]));
    const xs = (i: number) => (i / 25) * w;
    const ys = (v: number) =>
      h - ((v - min) / Math.max(max - min, 1)) * (h - 6) - 3;

    const line = points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${xs(x).toFixed(1)},${ys(y).toFixed(1)}`)
      .join(" ");
    const area = `${line} L ${w},${h} L 0,${h} Z`;
    const zeroY = ys(0);
    return { line, area, zeroY };
  }, [bill, result.netCost]);

  return (
    <Section
      id="savings"
      className="bg-[radial-gradient(60%_60%_at_80%_30%,#ffbe57_0%,transparent_60%),radial-gradient(50%_50%_at_20%_80%,#7dd3fc_0%,transparent_60%),linear-gradient(180deg,#ffffff_0%,#f0f9ff_100%)] noise"
    >
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <Reveal>
            <Eyebrow>Savings calculator</Eyebrow>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink-900">
              See your 25-year payback in one minute.
            </h2>
            <p className="mt-5 text-lg text-ink-700 leading-relaxed">
              Enter your PIN and your average monthly DISCOM bill. We'll size
              the system, apply your PM Surya Ghar subsidy, and project what
              you'd keep over the life of the array.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <GlassCard>
              <div className="grid gap-5 sm:grid-cols-[1fr_2fr]">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.16em] font-medium text-ink-500">
                    Avg. monthly bill — {inr(bill)}
                  </span>
                  <input
                    type="range"
                    min={500}
                    max={15000}
                    step={100}
                    value={bill}
                    onChange={(e) => setBill(Number(e.target.value))}
                    className="mt-4 w-full accent-sun-500"
                    aria-label="Average monthly DISCOM bill"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-ink-500">
                    <span>₹500</span>
                    <span>₹15,000</span>
                  </div>
                </label>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-4">
                <Stat label="Payback" value={`${result.payback} yrs`} />
                <Stat label="Subsidy" value={inr(result.subsidy)} />
                <Stat
                  label="25-yr savings"
                  value={inr(result.lifetime, { compact: true })}
                  emphasis
                />
              </div>

              <p className="mt-4 text-sm text-ink-700">
                System size:{" "}
                <span className="font-medium text-ink-900">{result.kW} kW</span>{" "}
                · Net cost after subsidy:{" "}
                <span className="font-medium text-ink-900">
                  {inr(result.netCost)}
                </span>
              </p>

              <Button as="a" href="#cta" className="mt-6 w-full sm:w-auto">
                Get a custom design <ArrowRight size={18} />
              </Button>
              <p className="mt-3 text-xs text-ink-500">
                Estimate only. Final design accounts for shading, roof
                orientation, and your DISCOM's gross/net metering policy.
              </p>
            </GlassCard>
          </Reveal>
        </div>

        {/* Chart card */}
        <Reveal delay={200} className="lg:col-span-3">
          <GlassCard>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] font-medium text-sky-700">
                  Cumulative savings
                </p>
                <p className="mt-2 font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-ink-900">
                  {inr(result.lifetime, { compact: true })}
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-sun-50 border border-sun-100 px-3 py-1 text-xs font-medium text-sun-700">
                <Sparkles size={14} /> Subsidy: {inr(result.subsidy)}
              </span>
            </div>

            <div className="mt-8 relative">
              <svg
                viewBox="0 0 600 180"
                className="w-full h-[180px] md:h-[260px]"
                role="img"
                aria-label="Cumulative savings over 25 years"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="savings-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffa726" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffa726" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="savings-line" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>

                <line
                  x1="0"
                  x2="600"
                  y1={path.zeroY}
                  y2={path.zeroY}
                  stroke="#94a3b8"
                  strokeDasharray="2 4"
                  strokeWidth="1"
                />
                <path d={path.area} fill="url(#savings-fill)" />
                <path
                  d={path.line}
                  fill="none"
                  stroke="url(#savings-line)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="mt-3 flex justify-between text-[11px] text-ink-500 font-mono">
                <span>Yr 0</span>
                <span>Yr 5</span>
                <span>Yr 10</span>
                <span>Yr 15</span>
                <span>Yr 20</span>
                <span>Yr 25</span>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

function Stat({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl border border-white/70 bg-white/55 backdrop-blur px-4 py-3 " +
        (emphasis ? "ring-1 ring-sun-300/60" : "")
      }
    >
      <p className="text-[10px] uppercase tracking-[0.16em] font-medium text-ink-500">
        {label}
      </p>
      <p className="mt-1 font-display text-xl md:text-2xl font-semibold tracking-tight text-ink-900">
        {value}
      </p>
    </div>
  );
}
