import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function GlassCard({
  children,
  hover = false,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl",
        "shadow-[var(--shadow-card)] p-6 md:p-8",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[0_30px_60px_-25px_rgb(15_23_42_/_0.25)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
