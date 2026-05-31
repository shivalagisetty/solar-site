import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Width of inner container — defaults to max-w-7xl. */
  contained?: boolean;
  /** Vertical padding — `tight` for trust bar, `default` everywhere else. */
  spacing?: "tight" | "default" | "hero";
}

export function Section({
  children,
  contained = true,
  spacing = "default",
  className,
  ...rest
}: SectionProps) {
  const pad =
    spacing === "tight"
      ? "py-12 md:py-16"
      : spacing === "hero"
        ? "pt-28 pb-24 md:pt-36 md:pb-32"
        : "py-24 md:py-32";

  return (
    <section
      className={cn("relative isolate overflow-hidden px-6", pad, className)}
      {...rest}
    >
      {contained ? (
        <div className="mx-auto max-w-7xl">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
