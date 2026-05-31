import { Section } from "../components/Section";

const PARTNERS = ["Tata Power Solar", "Adani Solar", "Waaree", "Vikram", "Sungrow", "Enphase"];

export function TrustBar() {
  return (
    <Section id="trust" spacing="tight" className="bg-white">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-ink-500">
        Engineered with industry-leading hardware
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
        {PARTNERS.map((p) => (
          <li
            key={p}
            className="font-display text-xl md:text-2xl font-semibold tracking-tight text-ink-700"
          >
            {p}
          </li>
        ))}
      </ul>
    </Section>
  );
}
