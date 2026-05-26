import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-soft active:scale-[0.98]",
  secondary:
    "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 shadow-soft",
  ghost: "bg-transparent text-brand-700 hover:bg-brand-50",
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkButtonProps = BaseProps & {
  href: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  fullWidth,
  href,
  ...rest
}: ButtonProps | LinkButtonProps) {
  const base = `inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={base} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}
