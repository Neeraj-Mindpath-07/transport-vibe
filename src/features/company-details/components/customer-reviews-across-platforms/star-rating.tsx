import { cn } from "@/lib/cn";

export type StarRatingProps = {
  /** Value between 0 and 5; renders full stars only (static aggregate UI). */
  value: number;
  className?: string;
};

/** Filled five-point star in a 20×20 viewBox (gold fill via `currentColor`). */
const STAR_PATH =
  "M10 1.5 12.35 7.42 19 8.27 14 12.73 15.27 19.5 10 15.77 4.73 19.5 6 12.73 1 8.27 7.65 7.42 10 1.5z";

/**
 * Five gold stars for aggregate scores (Figma-aligned fill `#FACC15`).
 */
export function StarRating({ value, className }: StarRatingProps) {
  const full = Math.min(5, Math.max(0, Math.round(value)));

  return (
    <div
      className={cn("flex shrink-0 items-center gap-px", className)}
      role="img"
      aria-label={`${full} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          width={16}
          height={16}
          className={i < full ? "text-[#FACC15]" : "text-neutral-200"}
          aria-hidden
        >
          <path fill="currentColor" d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}
