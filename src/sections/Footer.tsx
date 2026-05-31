import { Sun } from "lucide-react";

const COLUMNS = [
  {
    title: "Solutions",
    links: ["Residential", "Commercial", "Industrial", "Battery storage", "EV charging"],
  },
  {
    title: "Company",
    links: ["About", "Engineering blog", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: [
      "Savings calculator",
      "PM Surya Ghar guide",
      "Net-metering by state",
      "Warranty terms",
      "Developer API",
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-ink-900 text-sky-100">
      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[1.3fr_2fr] gap-16">
        <div>
          <a href="#" className="inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-white">
            <span
              aria-hidden
              className="grid place-items-center size-9 rounded-full bg-gradient-to-br from-sun-200 to-sun-500 text-ink-900"
            >
              <Sun size={18} strokeWidth={2.25} />
            </span>
            Helio
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sky-200/80">
            Premium solar design, install, and 25-year monitoring for homes,
            MSMEs, and industrial sites across India — Bengaluru, Mumbai, Pune,
            Hyderabad, Chennai, and Delhi NCR.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {["MNRE empanelled", "BIS certified", "ISO 9001", "GST 29ABCDE1234F1Z5"].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] font-medium text-sky-100"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.18em] font-medium text-sky-300">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sky-100/80 hover:text-white transition"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-sky-200/60">
          <p>© {new Date().getFullYear()} Helio Energy, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
