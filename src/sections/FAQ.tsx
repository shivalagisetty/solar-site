import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section } from "../components/Section";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { cn } from "../lib/cn";

const FAQS = [
  {
    q: "How does net metering work in my state?",
    a: "Net metering is regulated state-by-state by the SERC (state electricity regulator). Karnataka, Maharashtra, Tamil Nadu, Delhi, Gujarat, and most northern states allow net metering up to 500 kW for residential and commercial; some states cap exports or push you to net-billing above certain sizes. We design against your specific DISCOM's policy and will recommend a self-consumption-heavy system if exports don't pencil out.",
  },
  {
    q: "What happens to my roof when you install?",
    a: "We use galvanized MS or aluminium structures rated for 150 km/h wind loads — flashed and sealed at every roof penetration with 25-year leak warranty. For RCC roofs we use ballasted or chemical-anchored mounts; for metal sheds we use clamp-on systems that don't pierce the roof at all.",
  },
  {
    q: "How much does the PM Surya Ghar subsidy actually cover?",
    a: "₹30,000 for the first kW, ₹30,000 for the second, and ₹18,000 for the third — capped at ₹78,000 for any system 3 kW or larger. We file your application on the National Portal, coordinate the DISCOM inspection, and ensure the subsidy lands in your bank account within 30 days of commissioning. You don't pay anything upfront for the subsidy portion if you finance through our partner banks.",
  },
  {
    q: "What if a panel underperforms in year 18?",
    a: "We monitor each module via the inverter's RS-485 telemetry. If output drops 3% below spec for two billing cycles, we dispatch a technician under our 25-year production warranty — labour included. You don't pay anything; we file the claim with Tata, Adani, Waaree, or whichever Tier-1 OEM supplied the module.",
  },
  {
    q: "How do I know my system is sized right?",
    a: "We pull 12 months of your DISCOM bills and run an hour-by-hour simulation against your roof's irradiance model using NIWE solar resource data. You see the production curve overlaid against your consumption — and your projected post-solar bill — before you sign, not a year later.",
  },
  {
    q: "Can I add a battery later?",
    a: "Every Kairos inverter is battery-ready (Sungrow, Goodwe, or Enphase). Adding a Luminous, Exide NXT, or Tesla Powerwall in year three takes one day on-site. Battery is especially worth it on Karnataka and Maharashtra ToD tariffs where evening rates are 30–50% higher than daytime.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f0f9ff_100%)]"
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink-900">
            Questions, answered.
          </h2>
          <p className="mt-5 text-ink-700 leading-relaxed">
            Don't see yours? Email{" "}
            <a
              href="mailto:hello@Kairos.in"
              className="text-sky-700 underline underline-offset-4 hover:text-sky-900"
            >
              hello@Kairos.in
            </a>{" "}
            — a real engineer answers, usually inside 24 hours.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul
            className="divide-y divide-ink-900/10 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl shadow-[var(--shadow-card)]"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.q}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-8 py-5 hover:bg-white/40 transition focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-sky-500"
                  >
                    <span
                      itemProp="name"
                      className="font-display text-lg md:text-xl font-medium tracking-tight text-ink-900"
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className="grid place-items-center size-8 rounded-full bg-sky-50 text-sky-700 shrink-0"
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                      className="overflow-hidden"
                    >
                      <p
                        itemProp="text"
                        className="px-6 md:px-8 pb-6 text-ink-700 leading-relaxed"
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
