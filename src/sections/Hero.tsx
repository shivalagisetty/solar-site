import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";

export function Hero() {
  return (
    <Section
      spacing="hero"
      contained={false}
      className="noise bg-[radial-gradient(120%_80%_at_50%_0%,#e0f2fe_0%,#bae6fd_30%,#fff8eb_70%,#ffd58a_100%)]"
    >
      {/* Ambient sun-glare */}
      <div
        aria-hidden
        className="sun-drift pointer-events-none absolute -top-40 right-[-10%] size-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(255,190,87,0.55)_0%,rgba(255,190,87,0)_60%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-[-15%] size-[45vmax] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.45)_0%,rgba(125,211,252,0)_60%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 backdrop-blur px-3 py-1 text-xs font-medium text-sky-700">
              <span className="size-1.5 rounded-full bg-sun-400" /> PM Surya Ghar empanelled · MNRE-approved vendor
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] text-ink-900">
              Sunlight in.{" "}
              <span className="bg-gradient-to-br from-sky-700 via-sky-500 to-sun-500 bg-clip-text text-transparent">
                Savings out.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
              Kairos designs, installs, and monitors premium rooftop solar
              across India — for homes, MSMEs, and industrial sites. We handle
              the DISCOM, the subsidy, and 25 years of monitoring after.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button as="a" href="#savings">
                Estimate my savings <ArrowRight size={18} />
              </Button>
              <Button as="a" href="#how" variant="secondary">
                <PlayCircle size={18} /> See the process
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-14 grid grid-cols-3 max-w-xl gap-6">
              {[
                ["3.8 yrs", "avg. payback"],
                ["42k+", "panels installed"],
                ["4.9/5", "Google rating"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink-900">
                    {k}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-500">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Floating glass mini-card preview */}
        <Reveal
          delay={200}
          className="hidden lg:block absolute right-0 top-12 w-[360px]"
        >
          <div className="rounded-2xl border border-white/50 bg-white/65 backdrop-blur-xl shadow-[var(--shadow-card)] p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] font-medium text-sky-700">
                Live yield
              </p>
              <span className="text-xs text-ink-500">today</span>
            </div>
            <p className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] text-ink-900">
              42.6 <span className="text-lg text-ink-500">kWh</span>
            </p>
            <p className="mt-1 text-sm text-ink-700">
              +18% vs. forecast · 34.5 kg CO₂ offset
            </p>

            {/* Tiny svg sparkline */}
            <svg
              viewBox="0 0 240 60"
              className="mt-5 h-14 w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffa726" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffa726" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 C20,40 35,30 55,32 C80,34 95,18 120,16 C145,14 165,28 190,22 C210,18 225,10 240,8 L240,60 L0,60 Z"
                fill="url(#hg)"
              />
              <path
                d="M0,45 C20,40 35,30 55,32 C80,34 95,18 120,16 C145,14 165,28 190,22 C210,18 225,10 240,8"
                fill="none"
                stroke="#ea580c"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                ["6.1", "kW peak"],
                ["94%", "uptime"],
                ["A+", "perf grade"],
              ].map(([k, v]) => (
                <div
                  key={v}
                  className="rounded-xl bg-white/60 border border-white/60 py-2"
                >
                  <p className="text-sm font-semibold text-ink-900">{k}</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-ink-500">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Scroll cue */}
        <a
          href="#trust"
          className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1 text-xs uppercase tracking-[0.2em] text-ink-500 hover:text-ink-700 transition"
        >
          Scroll <ChevronDown size={16} className="animate-bounce" />
        </a>
      </div>
    </Section>
  );
}
