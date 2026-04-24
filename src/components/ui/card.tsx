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
        "rounded-card border border-neutral-200 bg-neutral-0 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}
