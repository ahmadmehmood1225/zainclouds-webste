import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "dark" | "outline-light" | "outline-dark" | "light" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * One button, six states, and a single flat green for the primary action.
 *
 * Contrast, so the palette change does not quietly cost accessibility:
 * - `primary` is brand-700 (#2a513a) with white text: 8.9:1, hover brand-600 at 6.8:1.
 * - `dark` is ink-900 (#1b1a18) with white: 17:1.
 * - `light` is brand-50 on white text, 12:1.
 * The focus ring uses brand-600, which is 6.8:1 against both white paper and ink.
 */
const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-medium tracking-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-60";

const sizeClasses = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-7 text-base",
};

const variantClasses = {
  primary: "bg-brand-700 text-white hover:bg-brand-600 hover:-translate-y-0.5",
  dark: "bg-ink-900 text-white hover:bg-ink-800 hover:-translate-y-0.5",
  "outline-light":
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  "outline-dark":
    "border border-ink-900/25 text-ink-900 hover:border-ink-900/50 hover:bg-ink-50",
  light: "bg-brand-50 text-brand-900 hover:bg-brand-100 hover:-translate-y-0.5",
  ghost: "text-ink-900 hover:text-brand-600",
};

export function Button({ children, variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}