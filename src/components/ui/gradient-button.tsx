import React from "react";
import { cn } from "./glass-card";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function GradientButton({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-sm transition-all duration-300 group overflow-hidden",
        variant === "primary" && "text-white shadow-[0_0_15px_-3px_var(--color-accent-purple)] hover:shadow-[0_0_25px_-3px_var(--color-accent-blue)]",
        variant === "outline" && "text-white border border-white/10 hover:border-white/20 glass-panel",
        className
      )}
      {...props}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-blue)] opacity-90 group-hover:opacity-100 transition-opacity" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
