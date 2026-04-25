/**
 * Temporary Figma MCP asset URLs (short-lived; replace with /public assets for production).
 * @see https://www.figma.com/design/rvG6ZoipbH8L2kZKOWsC2B/Transportvibe---Revamp
 *
 * **Detail company — Customer Reviews Across Platforms:** when MCP quota allows, run
 * `get_design_context` on the reviews-aggregate frame and paste exported SVG URLs here
 * (then swap `platform-marks.tsx` for `<Image src={figmaAssets.reviews.bbb} … />` etc.).
 */
export const figmaAssets = {
  navLogo: "https://www.figma.com/api/mcp/asset/cb32dead-6777-4ec1-b8b5-fcab679a85ac",
  /** Trustpilot row — was exported from Figma as `Trustpilot logo (2).svg`; renamed for clarity. */
  trustpilotWordmark: "/trustpilot-wordmark.svg",
  /** Yelp row — design asset was saved as `Trustpilot logo (3).svg`; renamed to match platform. */
  yelpWordmark: "/yelp-wordmark.svg",
  /** BBB row — `public/bbb.svg`. */
  bbbWordmark: "/bbb.svg",
  navShipAdvisorIcon: "https://www.figma.com/api/mcp/asset/05899a20-a407-4cd5-a4b6-2ae83633fe8d",
  topBarHelpIcon: "https://www.figma.com/api/mcp/asset/50876fe0-6fb4-4557-8158-f0b3ce865b3c",
  topBarSearchIcon: "https://www.figma.com/api/mcp/asset/9728523b-e42e-4eb9-a6eb-6225870b7765",
  topBarDivider: "https://www.figma.com/api/mcp/asset/91809f38-2eb3-4a70-b447-65d37b5e4bae",
  newsletterBg: "https://www.figma.com/api/mcp/asset/88c04655-8d69-411e-b438-910cdc74df2a",
  footerLogo: "https://www.figma.com/api/mcp/asset/68f817f1-3cab-4f50-8b92-58a106c80319",
} as const;
