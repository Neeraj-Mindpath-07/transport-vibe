export const scrollRegistry = [
  { id: "trust-score", label: "Trust score" },
  { id: "customer-reviews", label: "Customer Reviews" },
  { id: "company-information", label: "Company Information" },
  { id: "reviews", label: "Reviews" },
] as const;

export type ScrollSectionId = (typeof scrollRegistry)[number]["id"];

export function isScrollSectionId(value: string): value is ScrollSectionId {
  return scrollRegistry.some((section) => section.id === value);
}
