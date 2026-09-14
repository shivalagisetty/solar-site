import { Sun } from "lucide-react";
import { Button } from "../components/Button";

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink-900"
        >
          <span
            aria-hidden
            className="grid place-items-center size-8 rounded-full bg-gradient-to-br from-sun-200 to-sun-500 text-ink-900 shadow-[var(--shadow-glow-sun)]"
          >
            <Sun size={16} strokeWidth={2.25} />
          </span>
          Kairos
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-700">
          <a href="#how" className="hover:text-ink-900 transition">How it works</a>
          <a href="#savings" className="hover:text-ink-900 transition">Savings</a>
          <a href="#cases" className="hover:text-ink-900 transition">For you</a>
          <a href="#faq" className="hover:text-ink-900 transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button as="a" href="#savings" variant="secondary" size="md">
            Get a quote
          </Button>
        </div>
      </div>
    </header>
  );
}
