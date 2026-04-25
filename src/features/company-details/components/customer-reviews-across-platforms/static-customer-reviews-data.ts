import type { CustomerReviewsAcrossPlatformsCopy, ExternalPlatformReviewRow } from "./types";

/** Placeholder outbound URLs for static aggregate rows (replace with real deep links later). */
const SAMPLE_HREF = "https://example.com";

/**
 * Default static rows for the Detail Company aggregate reviews card.
 */
export const defaultExternalPlatformRows: ExternalPlatformReviewRow[] = [
  {
    id: "bbb",
    name: "Better Business Bureau",
    rating: 4.7,
    reviewCountLabel: "(312 reviews)",
    href: SAMPLE_HREF,
    ctaLabel: "Read →",
  },
  {
    id: "google",
    name: "Google",
    rating: 4.7,
    reviewCountLabel: "(312 reviews)",
    href: SAMPLE_HREF,
    ctaLabel: "Read →",
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    rating: 4.7,
    reviewCountLabel: "(312 reviews)",
    href: SAMPLE_HREF,
    ctaLabel: "Read →",
  },
  {
    id: "yelp",
    name: "Yelp",
    rating: 4.7,
    reviewCountLabel: "(312 reviews)",
    href: SAMPLE_HREF,
    ctaLabel: "Read →",
  },
];

/** Default marketing copy for the card header, highlight row, and disclaimer. */
export const defaultCustomerReviewsAcrossPlatformsCopy: CustomerReviewsAcrossPlatformsCopy = {
  title: "Customer Reviews Across Platforms",
  subtitle: "Aggregate data only - We link, not reproduce",
  transportVibe: {
    rating: 4.9,
    reviewSummary: "1,000+ email-confirmed reviews",
    ctaLabel: "Shown below ↓",
    ctaHref: "#reviews",
    tagline: "We Drive the Truth in Auto Transport Reviews",
  },
  footer:
    "TransportVibe shows aggregate scores and review counts only. We do not reproduce individual reviews from external platforms — click any platform to read reviews there directly.",
};
