"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ReviewSort } from "../../lib/filter-state";

const OPTIONS: { value: ReviewSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highestBudget", label: "Highest Budget" },
  { value: "lowestBudget", label: "Lowest Budget" },
  { value: "highestRating", label: "Highest Rating" },
  { value: "lowestRating", label: "Lowest Rating" },
];

type ReviewSortSelectProps = {
  value: ReviewSort;
  onChange: (value: ReviewSort) => void;
  className?: string;
};

export function ReviewSortSelect({ value, onChange, className }: ReviewSortSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = OPTIONS.find((option) => option.value === value) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="inline-flex h-11 min-w-[200px] items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-neutral-0 px-3 text-body-sm text-text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Sort reviews by ${selected.label}`}
      >
        <span className="truncate text-left">
          <span className="text-neutral-500">Sort by </span>
          <span className="font-semibold text-text-black">{selected.label}</span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-neutral-500 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-30 min-w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 py-1 shadow-lg"
        >
          {OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2.5 text-left text-body-sm transition-colors hover:bg-primary-100",
                    isSelected && "bg-primary-100 font-semibold text-primary-700",
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden>
                    {isSelected ? (
                      <Check className="size-4 text-primary-600" strokeWidth={2.5} />
                    ) : (
                      <span className="size-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
