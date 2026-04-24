"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-text-white hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 disabled:opacity-50",
  secondary:
    "bg-secondary-500 text-text-white hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 disabled:opacity-50",
  ghost:
    "bg-transparent text-text-black hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:opacity-50",
  destructive:
    "bg-warning text-text-white hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning disabled:opacity-50",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

/**
 * Primary action control; variants map to Transportvibe palette.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:pointer-events-none",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
});
