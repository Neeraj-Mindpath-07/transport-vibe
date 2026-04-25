import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { ReviewPlatformRow } from "./review-platform-row";
import { TransportVibeHighlightRow } from "./transportvibe-highlight-row";
import {
  defaultCustomerReviewsAcrossPlatformsCopy,
  defaultExternalPlatformRows,
} from "./static-customer-reviews-data";
import type { CustomerReviewsAcrossPlatformsCopy, ExternalPlatformReviewRow } from "./types";

export type CustomerReviewsAcrossPlatformsCardProps = {
  rows?: ExternalPlatformReviewRow[];
  copy?: CustomerReviewsAcrossPlatformsCopy;
  className?: string;
};

/**
 * White card listing aggregate scores per platform plus highlighted TransportVibe row and disclaimer.
 */
export function CustomerReviewsAcrossPlatformsCard({
  rows = defaultExternalPlatformRows,
  copy = defaultCustomerReviewsAcrossPlatformsCopy,
  className,
}: CustomerReviewsAcrossPlatformsCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg border-neutral-200 px-4 py-4 sm:px-6 sm:py-6",
        className,
      )}
    >
      <header className="flex flex-col gap-1.5 border-b border-neutral-200 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:pb-4">
        <h2
          id="customer-reviews-across-platforms-heading"
          className="font-display text-[17px] font-semibold leading-snug text-text-black sm:text-[19px]"
        >
          {copy.title}
        </h2>
        <p className="max-w-md text-left text-body-xs font-normal leading-snug text-text-dark-gray sm:text-right sm:pt-0.5">
          {copy.subtitle}
        </p>
      </header>

      <div className="pt-1">
        {rows.map((row) => (
          <ReviewPlatformRow key={row.id} row={row} />
        ))}
      </div>

      <TransportVibeHighlightRow transportVibe={copy.transportVibe} />

      <p className="mt-4 max-w-none text-body-xs leading-relaxed text-text-dark-gray">{copy.footer}</p>
    </Card>
  );
}
