/**
 * Site-wide constants for layout chrome and marketing copy.
 * Tune `--header-offset` in CSS to match measured header height.
 */
export const siteConfig = {
  productName: "Company Details Page",
  /** Used in metadata and visible title patterns */
  shortTitle: "Company Details",
  /** Sticky offset = Figma Navigation frame height (330:6333), px */
  headerOffsetPx: 131,
  navLabels: [
    "About Us",
    "Compare",
    "ShipAdvisor AI",
    "Full Service",
    "Companies",
    "Stories",
    "Resources",
  ] as const,
} as const;
