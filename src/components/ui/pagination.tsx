"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  className?: string;
};

function getPageWindow(currentPage: number, totalPages: number): number[] {
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);
  const pages: number[] = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = "Pagination",
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageWindow(currentPage, totalPages);

  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-9 items-center gap-1 rounded-md border border-neutral-200 px-3 text-body-sm text-text-black disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <ChevronLeft className="size-4" />
        Prev
      </button>

      {pages[0] !== 1 ? (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          className="inline-flex size-9 items-center justify-center rounded-md border border-neutral-200 text-body-sm text-text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          1
        </button>
      ) : null}

      {pages[0] > 2 ? <span className="px-1 text-body-sm text-neutral-500">…</span> : null}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-md border text-body-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
            page === currentPage
              ? "border-primary-600 bg-primary-500 text-text-white"
              : "border-neutral-200 text-text-black",
          )}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages - 1 ? (
        <span className="px-1 text-body-sm text-neutral-500">…</span>
      ) : null}

      {pages[pages.length - 1] !== totalPages ? (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          className="inline-flex size-9 items-center justify-center rounded-md border border-neutral-200 text-body-sm text-text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          {totalPages}
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-9 items-center gap-1 rounded-md border border-neutral-200 px-3 text-body-sm text-text-black disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
