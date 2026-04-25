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
    "companyDeepDive",
    "gallery",
    "reviews",
    "paymentStrip",
    "newsletter",
    "disclaimer",
    "sidebar",
  ].every((key) => key in value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isProsConsListItem(
  value: unknown,
): value is { id: string; title: string; description: string } {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.title) &&
    isNonEmptyString(value.description)
  );
}

function isComparisonBlock(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }
  if (
    !isNonEmptyString(value.title) ||
    !isNonEmptyString(value.reviewAttribution) ||
    !isNonEmptyString(value.prosHeading) ||
    !isNonEmptyString(value.consHeading)
  ) {
    return false;
  }
  if (!Array.isArray(value.pros) || !value.pros.every(isProsConsListItem)) {
    return false;
  }
  if (!Array.isArray(value.cons) || !value.cons.every(isProsConsListItem)) {
    return false;
  }
  return true;
}

function isCompanyDeepDiveCallout(value: unknown): value is { label: string; lines: string[] } {
  if (!isRecord(value)) {
    return false;
  }
  return isNonEmptyString(value.label) && isStringArray(value.lines) && value.lines.length > 0;
}

function isCompanyDeepDiveLabeledBlock(value: unknown): value is { label: string; text: string } {
  if (!isRecord(value)) {
    return false;
  }
  return isNonEmptyString(value.label) && isNonEmptyString(value.text);
}

function isCompanyDeepDiveSection(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonEmptyString(value.id) || !isNonEmptyString(value.heading)) {
    return false;
  }
  if (!Array.isArray(value.paragraphs) || !value.paragraphs.every((p) => typeof p === "string")) {
    return false;
  }
  if (value.callout !== undefined && !isCompanyDeepDiveCallout(value.callout)) {
    return false;
  }
  if (value.labeledBlocks !== undefined) {
    if (!Array.isArray(value.labeledBlocks) || !value.labeledBlocks.every(isCompanyDeepDiveLabeledBlock)) {
      return false;
    }
  }
  return true;
}

function isCompanyDeepDive(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonEmptyString(value.title) || !isNonEmptyString(value.attribution)) {
    return false;
  }
  if (!isStringArray(value.badges)) {
    return false;
  }
  if (!Array.isArray(value.sections) || !value.sections.every(isCompanyDeepDiveSection)) {
    return false;
  }
  return true;
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

  if (!isRecord(banner) || !Array.isArray(banner.bottomStats)) {
    return false;
  }

  if (!isRecord(reviews) || typeof reviews.pageSize !== "number" || !Array.isArray(reviews.items)) {
    return false;
  }

  if (!isNonEmptyString(reviews.leaveReviewCtaLabel)) {
    return false;
  }

  if (!isComparisonBlock(value.comparison)) {
    return false;
  }

  if (!isCompanyDeepDive(value.companyDeepDive)) {
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
