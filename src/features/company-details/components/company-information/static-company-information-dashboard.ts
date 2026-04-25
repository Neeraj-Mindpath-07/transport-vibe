/**
 * Static copy and asset paths for the Detail Company “Company Information” dashboard card.
 * @module features/company-details/components/company-information/static-company-information-dashboard
 */

/** Public SVGs (see `public/Background.svg`, `Icon.svg`, `Container.svg`). */
export const companyInformationDashboardAssets = {
  verifiedBadge: "/Background.svg",
  warningIcon: "/Icon.svg",
  complianceAvatars: "/Container.svg",
} as const;

export type CompanyInformationGridCell = {
  label: string;
  value: string;
  /** When true, value uses primary green emphasis. */
  valueEmphasis?: "primary";
  subtext: string;
};

export const companyInformationDashboardCopy = {
  liveStatus: "Live · Updated daily",
  verification: {
    title: "Verified via FMCSA SAFER system",
    subtitle: "MC-776701 is active and authorized as of today.",
    ctaLabel: "Check FMCSA",
    ctaHref: "https://safer.fmcsa.dot.gov/",
  },
  grid: [
    {
      label: "FMCSA Status",
      value: "Active · Authorized Broker",
      valueEmphasis: "primary" as const,
      subtext: "Continuously active since 2006",
    },
    {
      label: "MC Number",
      value: "MC-776701",
      subtext: "Verified via FMCSA SAFER",
    },
    {
      label: "DOT Number",
      value: "2894599",
      subtext: "US Department of Transportation",
    },
    {
      label: "Headquarters",
      value: "Chicago, Illinois",
      subtext: "Operations nationwide",
    },
    {
      label: "In Business Since",
      value: "2006 — 18 years",
      subtext: "Private equity backed since 2016",
    },
    {
      label: "Coverage",
      value: "All 48 continental states",
      subtext: "Alaska & Hawaii excluded",
    },
  ] satisfies CompanyInformationGridCell[],
  cargoInsurance: {
    title: "Cargo insurance",
    body: "Held by the carrier, not Montway. If your vehicle is damaged, the claim goes against the carrier's $100K policy. Montway facilitates but is not the insuring party. Always photograph the vehicle before handover and document any damage on the Bill of Lading at delivery before signing.",
  },
  quotesWarning: {
    title: "Quotes are estimates",
    body: "While Montway's 93% accuracy rate is strong, price adjustments can occur especially on rural routes or last-minute bookings. Any change must be communicated before pickup, not presented at delivery.",
  },
  transportVibeRole: {
    title: "Transportvibe's role",
    body: "TransportVibe is an independent review and comparison platform not affiliated with Montway. Data is drawn from FMCSA records and our verified review database. For Full Service bookings, TransportVibe acts as your agent",
    socialProof: "Trusted by 1.2k compliance officers",
  },
} as const;
