"use client";

import { cn } from "@/lib/cn";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  className?: string;
};

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 hidden w-max max-w-[220px] -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-body-xs text-text-white group-hover:block group-focus-within:block"
      >
        {content}
      </span>
    </span>
  );
}
