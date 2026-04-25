import type { CompanyReview } from "../types/company-details-page";

export type ReviewRatingTab = "all" | 1 | 2 | 3 | 4 | 5;

export type ReviewSort = "newest" | "oldest" | "highest" | "lowest";

export type CustomerFeedbackState = {
  ratingTab: ReviewRatingTab;
  sort: ReviewSort;
  page: number;
};

export const defaultCustomerFeedbackState: CustomerFeedbackState = {
  ratingTab: "all",
  sort: "newest",
  page: 1,
};

export function filterReviewsByRatingTab(
  reviews: CompanyReview[],
  tab: ReviewRatingTab,
): CompanyReview[] {
  if (tab === "all") {
    return reviews;
  }
  return reviews.filter((review) => review.rating === tab);
}

export function sortReviews(reviews: CompanyReview[], sort: ReviewSort): CompanyReview[] {
  const sorted = [...reviews];

  const time = (review: CompanyReview) => new Date(review.postedAt).getTime();

  switch (sort) {
    case "newest":
      sorted.sort((a, b) => time(b) - time(a));
      break;
    case "oldest":
      sorted.sort((a, b) => time(a) - time(b));
      break;
    case "highest":
      sorted.sort((a, b) => b.rating - a.rating || time(b) - time(a));
      break;
    case "lowest":
      sorted.sort((a, b) => a.rating - b.rating || time(b) - time(a));
      break;
    default:
      break;
  }

  return sorted;
}

export function buildCustomerFeedbackList(
  items: CompanyReview[],
  state: Omit<CustomerFeedbackState, "page">,
): CompanyReview[] {
  const filtered = filterReviewsByRatingTab(items, state.ratingTab);
  return sortReviews(filtered, state.sort);
}

export function paginateReviews(
  reviews: CompanyReview[],
  page: number,
  pageSize: number,
): CompanyReview[] {
  const start = (page - 1) * pageSize;
  return reviews.slice(start, start + pageSize);
}
