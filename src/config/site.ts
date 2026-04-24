/**
 * Site-wide constants for layout chrome and marketing copy.
 * Tune `--header-offset` in CSS to match measured header height.
 */
export const siteConfig = {
  productName: "Company Details Page",
  /** Used in metadata and visible title patterns */
  shortTitle: "Company Details",
  /** Default sticky offset (px); mirrors `--header-offset` until layout is final */
  headerOffsetPx: 72,
} as const;
