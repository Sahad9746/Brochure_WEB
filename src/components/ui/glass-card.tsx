import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl glass-panel group transition-all duration-300 hover:shadow-[0_0_30px_-5px_var(--color-accent-purple)]",
        className
      )}
      {...props}
    >
      {/* Subtle top border gradient reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-purple)]/10 to-[var(--color-accent-blue)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
