import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-surface-card p-6 shadow-card border border-brand-100/60 ${className}`}
    >
      {children}
    </div>
  );
}
