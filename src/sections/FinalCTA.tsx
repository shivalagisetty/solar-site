import { ArrowRight } from "lucide-react";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";

export function FinalCTA() {
  return (
    <Section
      id="cta"
      contained={false}
      className="bg-[linear-gradient(180deg,#0c2a4a_0%,#0369a1_60%,#f97316_120%)] noise text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-20 size-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(255,167,38,0.45)_0%,rgba(255,167,38,0)_60%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 size-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.35)_0%,rgba(125,211,252,0)_60%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] font-medium text-sky-200">
            Ready when you are
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-display text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.0]">
            Every sunny day you wait is{" "}
            <span className="bg-gradient-to-br from-sun-200 via-sun-300 to-sun-500 bg-clip-text text-transparent">
              money on the roof.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl mx-auto text-lg leading-relaxed text-sky-100">
            Get a custom system design and a real payback chart in under
            48 hours. No on-site visit required for the first quote.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="#savings" size="lg">
              Start my design <ArrowRight size={18} />
            </Button>
            <Button
              as="a"
              href="tel:+918045550100"
              variant="secondary"
              className="bg-white/15 border-white/30 text-white hover:bg-white/25"
            >
              Call +91 80 4555 0100
            </Button>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="mt-8 text-sm text-sky-200/80">
            No high-pressure sales · Free design study · MNRE-empanelled
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
