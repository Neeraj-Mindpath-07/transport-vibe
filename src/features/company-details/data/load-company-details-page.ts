import { assert, isRecord, isStringArray } from "@/lib/assert";
import rawData from "./company-details.mock.json";
import type { CompanyDetailsPageData } from "../types/company-details-page";

function hasRequiredTopLevelKeys(value: Record<string, unknown>): boolean {
  return [
    "company",
    "banner",
    "score",
    "companyInformation",
    "comparison",
    "gallery",
    "reviews",
    "paymentStrip",
    "newsletter",
    "disclaimer",
    "sidebar",
  ].every((key) => key in value);
}

function isCompanyDetailsPageData(value: unknown): value is CompanyDetailsPageData {
  if (!isRecord(value)) {
    return false;
  }

  if (!hasRequiredTopLevelKeys(value)) {
    return false;
  }

  const banner = value.banner;
  const reviews = value.reviews;

  if (!isRecord(banner) || !isStringArray(banner.badges)) {
    return false;
  }

  if (!isRecord(reviews) || typeof reviews.pageSize !== "number" || !Array.isArray(reviews.items)) {
    return false;
  }

  return true;
}

export async function loadCompanyDetailsPageData(): Promise<CompanyDetailsPageData> {
  const data: unknown = rawData;
  assert(
    isCompanyDetailsPageData(data),
    "Invalid company-details mock payload. Verify company-details.mock.json shape.",
  );
  return data;
}
