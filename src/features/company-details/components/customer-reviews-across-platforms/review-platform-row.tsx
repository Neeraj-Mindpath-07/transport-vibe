import type { ReactNode } from "react";
import Image from "next/image";
import { figmaAssets } from "@/config/figma-assets";
import { cn } from "@/lib/cn";
import { StarRating } from "./star-rating";
import type { ExternalPlatformReviewRow } from "./types";
import { GooglePlatformMark } from "./platform-marks";

function platformLogo(id: ExternalPlatformReviewRow["id"]): ReactNode {
  switch (id) {
    case "bbb":
      return (
        <Image
          src={figmaAssets.bbbWordmark}
          alt="Better Business Bureau"
          width={40}
          height={24}
          className="h-6 w-auto object-contain object-left"
          unoptimized
        />
      );
    case "google":
      return <GooglePlatformMark className="max-h-[22px] w-auto" />;
    case "trustpilot":
      return (
        <Image
          src={figmaAssets.trustpilotWordmark}
          alt="Trustpilot"
          width={100}
          height={24}
          className="h-6 w-auto max-w-full object-contain object-left"
          unoptimized
        />
      );
    case "yelp":
      return (
        <Image
          src={figmaAssets.yelpWordmark}
          alt="Yelp"
          width={62}
          height={24}
          className="h-6 w-auto max-w-full object-contain object-left"
          unoptimized
        />
      );
    default:
      return null;
  }
}

export type ReviewPlatformRowProps = {
  row: ExternalPlatformReviewRow;
  className?: string;
};

/**
 * Single external platform row — mobile: logo | stars + green score + count, “Read →” flush right (Figma).
 * Desktop: same horizontal rhythm with more horizontal space.
 */
export function ReviewPlatformRow({ row, className }: ReviewPlatformRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-neutral-200 py-4 sm:gap-6 sm:py-[18px]",
        className,
      )}
    >
      <a
        href={row.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
      >
        <span className="sr-only">{row.name}</span>
        {platformLogo(row.id)}
      </a>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
          <StarRating value={row.rating} />
          <span className="text-body-sm font-semibold tabular-nums text-primary-700">
            {row.rating.toFixed(1)}
          </span>
          <span className="text-body-sm text-text-dark-gray">{row.reviewCountLabel}</span>
        </div>
        <a
          href={row.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-body-sm font-semibold text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline"
        >
          {row.ctaLabel}
        </a>
      </div>
    </div>
  );
}
