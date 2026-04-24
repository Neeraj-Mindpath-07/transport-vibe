import type { CompanyReview } from "../types/company-details-page";

export type ReviewFilterState = {
  search: string;
  serviceTypes: string[];
  states: string[];
  ratings: number[];
  page: number;
};

// v1: client-only state holder. Planned extension point for URL sync via nuqs.
export const defaultReviewFilterState: ReviewFilterState = {
  search: "",
  serviceTypes: [],
  states: [],
  ratings: [],
  page: 1,
};

export function toggleMultiSelect(value: string, current: string[]): string[] {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

export function toggleRatings(value: number, current: number[]): number[] {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

export function applyReviewFilters(
  reviews: CompanyReview[],
  state: Omit<ReviewFilterState, "page">,
): CompanyReview[] {
  const search = state.search.trim().toLowerCase();

  return reviews.filter((review) => {
    const matchesSearch =
      search.length === 0 ||
      review.reviewer.toLowerCase().includes(search) ||
      review.headline.toLowerCase().includes(search) ||
      review.body.toLowerCase().includes(search) ||
      review.vehicle.toLowerCase().includes(search);

    const matchesServiceType =
      state.serviceTypes.length === 0 || state.serviceTypes.includes(review.serviceType);
    const matchesState = state.states.length === 0 || state.states.includes(review.state);
    const matchesRating = state.ratings.length === 0 || state.ratings.includes(review.rating);

    return matchesSearch && matchesServiceType && matchesState && matchesRating;
  });
}

export function paginateReviews(
  reviews: CompanyReview[],
  page: number,
  pageSize: number,
): CompanyReview[] {
  const start = (page - 1) * pageSize;
  return reviews.slice(start, start + pageSize);
}
