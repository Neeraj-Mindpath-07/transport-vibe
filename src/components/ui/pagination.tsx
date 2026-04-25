"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildPaginationEntries } from "@/components/ui/pagination-pages";
import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = "Pagination",
  className,
  previousLabel = "Previous",
  nextLabel = "Next",
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const entries = buildPaginationEntries(currentPage, totalPages);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "grid w-full grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-9 items-center gap-1 justify-self-start rounded-md border border-neutral-200 px-3 text-body-sm text-text-black disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        {previousLabel}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:px-2">
        {entries.map((entry, index) =>
          entry === "ellipsis" ? (
            <span key={`e-${index}`} className="px-1 text-body-sm text-neutral-500">
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              aria-current={entry === currentPage ? "page" : undefined}
              onClick={() => onPageChange(entry)}
              className={cn(
                "inline-flex min-w-9 items-center justify-center rounded-md border px-2 py-1.5 text-body-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
                entry === currentPage
                  ? "border-primary-500 bg-primary-100 font-semibold text-primary-700"
                  : "border-neutral-200 text-text-black",
              )}
            >
              {entry}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-9 items-center gap-1 justify-self-end rounded-md border border-neutral-200 px-3 text-body-sm text-text-black disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        {nextLabel}
        <ChevronRight className="size-4 shrink-0" aria-hidden />
      </button>
    </nav>
  );
}
