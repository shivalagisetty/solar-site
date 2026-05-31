import { type ReactNode } from "react";
import { cn } from "../lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs uppercase tracking-[0.18em] font-medium text-sky-700",
        className,
      )}
    >
      {children}
    </p>
  );
}
