"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import {
  buildCustomerFeedbackList,
  defaultCustomerFeedbackState,
  paginateReviews,
  type CustomerFeedbackState,
} from "../../lib/filter-state";
import { SectionShell } from "../section-shell";
import { RatingFilterTabs } from "./rating-filter-tabs";
import { ReviewCard } from "./review-card";
import { ReviewSortSelect } from "./review-sort-select";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type ReviewsSectionProps = {
  data: CompanyDetailsPageData["reviews"];
};

export function ReviewsSection({ data }: ReviewsSectionProps) {
  const [state, setState] = useState<CustomerFeedbackState>(defaultCustomerFeedbackState);
  const { page, ...listState } = state;

  const processed = useMemo(
    () => buildCustomerFeedbackList(data.items, listState),
    [data.items, listState],
  );

  const totalPages = Math.max(1, Math.ceil(processed.length / data.pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedReviews = useMemo(
    () => paginateReviews(processed, currentPage, data.pageSize),
    [processed, currentPage, data.pageSize],
  );

  return (
    <SectionShell
      id="reviews"
      title={data.title}
      description={data.description}
      headerEnd={
        <>
          <ReviewSortSelect
            value={state.sort}
            onChange={(sort) => setState((previous) => ({ ...previous, sort, page: 1 }))}
          />
          <Button className="h-11 uppercase tracking-wide">{data.leaveReviewCtaLabel}</Button>
        </>
      }
      headerAccessory={
        <RatingFilterTabs
          active={state.ratingTab}
          onChange={(ratingTab) => setState((previous) => ({ ...previous, ratingTab, page: 1 }))}
        />
      }
    >
      <div className="space-y-4">
        {pagedReviews.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-8 text-center text-body-sm text-text-dark-gray">
            No reviews match the selected rating.
          </div>
        ) : (
          <div className="space-y-4">
            {pagedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(nextPage) => setState((previous) => ({ ...previous, page: nextPage }))}
          className="pt-2"
        />
      </div>
    </SectionShell>
  );
}
