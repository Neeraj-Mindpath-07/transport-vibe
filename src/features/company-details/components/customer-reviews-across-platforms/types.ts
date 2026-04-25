/**
 * Static “Customer Reviews Across Platforms” slice for the Detail Company page.
 * @module features/company-details/components/customer-reviews-across-platforms/types
 */

/** Supported third-party review sources shown in the aggregate card. */
export type ExternalReviewPlatformId = "bbb" | "google" | "trustpilot" | "yelp";

/**
 * One external platform row: logo, aggregate score, count, and outbound CTA.
 */
export type ExternalPlatformReviewRow = {
  id: ExternalReviewPlatformId;
  /** Accessible name for the platform link. */
  name: string;
  rating: number;
  /** Shown next to the numeric rating, e.g. “(312 reviews)”. */
  reviewCountLabel: string;
  /** Outbound URL to read reviews on that platform. */
  href: string;
  /** Visible CTA label (e.g. “Read →”). */
  ctaLabel: string;
};

export type CustomerReviewsAcrossPlatformsCopy = {
  title: string;
  subtitle: string;
  transportVibe: {
    rating: number;
    reviewSummary: string;
    /** e.g. “Shown below ↓” — typically anchors to `#reviews`. */
    ctaLabel: string;
    ctaHref: string;
    tagline: string;
  };
  footer: string;
};
