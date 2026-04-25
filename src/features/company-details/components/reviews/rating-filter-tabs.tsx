"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReviewRatingTab } from "../../lib/filter-state";

const TABS: { id: ReviewRatingTab; label: string; showStar: boolean }[] = [
  { id: "all", label: "All Reviews", showStar: false },
  { id: 5, label: "5 Reviews", showStar: true },
  { id: 4, label: "4 Reviews", showStar: true },
  { id: 3, label: "3 Reviews", showStar: true },
  { id: 2, label: "2 Reviews", showStar: true },
  { id: 1, label: "1 Reviews", showStar: true },
];

type RatingFilterTabsProps = {
  active: ReviewRatingTab;
  onChange: (tab: ReviewRatingTab) => void;
};

export function RatingFilterTabs({ active, onChange }: RatingFilterTabsProps) {
  return (
    <div className="-mx-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex min-w-max items-stretch gap-6 px-1 sm:gap-8" role="tablist" aria-label="Filter by rating">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <li key={String(tab.id)} className="flex shrink-0">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(tab.id)}
                className={cn(
                  "flex items-center gap-1 border-b-2 px-0.5 py-3 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:text-[16px]",
                  isActive
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-text-dark-gray hover:text-text-black",
                )}
              >
                {tab.showStar ? (
                  <Star className="size-3.5 shrink-0 fill-alert text-alert" aria-hidden />
                ) : null}
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
