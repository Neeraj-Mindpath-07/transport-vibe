import { HelpCircle, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const trustItems = [
  "15K+ verified reviews",
  "4.5★ rating",
  "FMCSA checked carriers",
  "Real customer data",
] as const;

function Dot() {
  return <span className="size-[3px] shrink-0 rounded-full bg-neutral-400" aria-hidden />;
}

/**
 * Utility strip — trust signals, help, search, auth (Figma Navigation row 1).
 */
export function TopHeader() {
  return (
    <div
      className={cn(
        "border-b border-white/20 bg-[#fafafa] backdrop-blur-[12px]",
        "px-4 pb-2.5 pt-2 sm:px-8",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-5 whitespace-nowrap pr-8">
            {trustItems.map((label, i) => (
              <span key={label} className="flex items-center gap-2">
                {i > 0 ? <Dot /> : null}
                <span className="text-body-xs text-text-dark-gray">{label}</span>
              </span>
            ))}
            <Dot />
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-display-caption font-semibold text-primary-500"
          >
            <HelpCircle className="size-4 shrink-0 stroke-[2]" aria-hidden />
            Help Center
          </Link>
          <label className="relative hidden min-w-[200px] max-w-[278px] flex-1 sm:block">
            <span className="sr-only">Search company</span>
            <span className="flex h-8 items-center justify-between gap-2 rounded-md border-2 border-neutral-200 bg-[var(--cd-surface-search)] px-3">
              <span className="text-body-xs text-neutral-500">Search Company</span>
              <Search className="size-4 shrink-0 text-neutral-500" aria-hidden />
            </span>
          </label>
          <span className="hidden h-8 w-px bg-neutral-200 sm:block" aria-hidden />
          <div className="flex items-center gap-4 text-display-caption font-semibold uppercase text-primary-500">
            <Link href="#">Sign In</Link>
            <Link href="#">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
