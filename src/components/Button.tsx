import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-sun-300 to-sun-500 text-ink-900 " +
    "shadow-[var(--shadow-glow-sun)] hover:from-sun-200 hover:to-sun-400 " +
    "focus-visible:outline-sun-600",
  secondary:
    "bg-white/60 backdrop-blur-md border border-white/60 text-ink-900 " +
    "hover:bg-white/85 focus-visible:outline-sky-500",
  ghost:
    "text-ink-900 hover:bg-white/60 focus-visible:outline-sky-500",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    as?: "button";
  };

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    as: "a";
  };

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "primary",
    size = "lg",
    className,
    children,
    ...rest
  } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (rest.as === "a") {
    const anchorRest = { ...rest } as Partial<typeof rest>;
    delete anchorRest.as;
    return (
      <a className={classes} {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const buttonRest = { ...rest } as Partial<typeof rest>;
  delete buttonRest.as;
  return (
    <button className={classes} {...(buttonRest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
