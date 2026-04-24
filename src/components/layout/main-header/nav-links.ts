import { siteConfig } from "@/config/site";

export const mainNavLinks = siteConfig.navLabels.map((label) =>
  label === "ShipAdvisor AI" ? { label, href: "#", badge: "New" as const } : { label, href: "#" },
);
