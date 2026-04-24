"use client";

import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import {
  applyReviewFilters,
  defaultReviewFilterState,
  paginateReviews,
  type ReviewFilterState,
} from "../../lib/filter-state";
import { SectionShell } from "../section-shell";
import { FilterBar } from "./filter-bar";
import { ReviewCard } from "./review-card";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type ReviewsSectionProps = {
  data: CompanyDetailsPageData["reviews"];
};

export function ReviewsSection({ data }: ReviewsSectionProps) {
  const [state, setState] = useState<ReviewFilterState>(defaultReviewFilterState);
  const { page, ...filterState } = state;

  const filteredReviews = useMemo(
    () => applyReviewFilters(data.items, filterState),
    [data.items, filterState],
  );

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / data.pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedReviews = paginateReviews(filteredReviews, currentPage, data.pageSize);

  return (
    <SectionShell id="reviews" title={data.title} description={data.description}>
      <div className="space-y-4">
        <FilterBar
          state={state}
          serviceTypes={data.filterOptions.serviceTypes}
          states={data.filterOptions.states}
          ratings={data.filterOptions.ratings}
          onSearchChange={(search) => setState((prev) => ({ ...prev, search, page: 1 }))}
          onServiceTypesChange={(values) =>
            setState((prev) => ({ ...prev, serviceTypes: values, page: 1 }))
          }
          onStatesChange={(values) => setState((prev) => ({ ...prev, states: values, page: 1 }))}
          onRatingsChange={(values) => setState((prev) => ({ ...prev, ratings: values, page: 1 }))}
          onReset={() => setState(defaultReviewFilterState)}
        />

        <p className="text-body-sm text-text-dark-gray">
          Showing {pagedReviews.length} of {filteredReviews.length} matching reviews
        </p>

        {pagedReviews.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-8 text-center text-body-sm text-text-dark-gray">
            No reviews match the selected filters.
          </div>
        ) : (
          <div className="space-y-3">
            {pagedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setState((prev) => ({ ...prev, page }))}
        />
      </div>
    </SectionShell>
  );
}
