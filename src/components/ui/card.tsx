import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Bordered surface for grouped content (sections, sidebars).
 */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border-default bg-surface shadow-[var(--cd-elevation-card)]",
        className,
      )}
      {...props}
    />
  );
}
