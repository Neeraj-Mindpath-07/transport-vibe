import Image from "next/image";
import { figmaAssets } from "@/config/figma-assets";
import { cn } from "@/lib/cn";
import { StarRating } from "./star-rating";
import type { CustomerReviewsAcrossPlatformsCopy } from "./types";

export type TransportVibeHighlightRowProps = {
  transportVibe: CustomerReviewsAcrossPlatformsCopy["transportVibe"];
  className?: string;
};

/**
 * Mint-highlighted TransportVibe aggregate row (native reviews; CTA scrolls to on-page list).
 */
export function TransportVibeHighlightRow({ transportVibe, className }: TransportVibeHighlightRowProps) {
  const { rating, reviewSummary, ctaHref, ctaLabel, tagline } = transportVibe;

  return (
    <div
      className={cn(
        "mt-1 flex items-center gap-3 rounded-lg bg-primary-100 px-3 py-4 sm:gap-6 sm:px-5 sm:py-5",
        className,
      )}
    >
      <div className="flex min-w-0 shrink-0 flex-col gap-1 sm:max-w-[min(48%,280px)]">
        <div
          className="relative h-8 w-[min(148px,42vw)] max-w-[160px] sm:h-10 sm:w-[min(180px,46%)] sm:max-w-[200px]"
          role="img"
          aria-label={`TransportVibe. ${tagline}`}
        >
          <Image
            src={figmaAssets.navLogo}
            alt=""
            fill
            className="object-contain object-left"
            sizes="(max-width: 640px) 160px, 200px"
            unoptimized
          />
        </div>
        <p className="hidden max-w-sm text-[11px] font-medium leading-snug text-text-dark-gray sm:block" aria-hidden>
          {tagline}
        </p>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
          <StarRating value={rating} />
          <span className="text-body-sm font-semibold tabular-nums text-primary-700">{rating.toFixed(1)}</span>
          <span className="text-body-sm text-text-dark-gray">{reviewSummary}</span>
        </div>
        <a
          href={ctaHref}
          className="shrink-0 text-body-sm font-semibold text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
