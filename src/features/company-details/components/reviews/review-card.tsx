"use client";

import { CheckCircle2, Flag, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import { cn } from "@/lib/cn";
import { resolveReviewImageSrc } from "../../lib/review-media";
import type { CompanyReview } from "../../types/company-details-page";
import { ReviewImageViewer } from "./review-image-viewer";
import { ReviewShareModal } from "./review-share-modal";

type ReviewCardProps = {
  review: CompanyReview;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setShareUrl(`${window.location.origin}${window.location.pathname}#reviews`);
  }, []);

  const openViewer = useCallback((index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  }, []);

  const hasCriteria = review.criteria.length > 0;
  const [leftCriteria, rightCriteria] = [
    review.criteria.slice(0, 3),
    review.criteria.slice(3, 6),
  ];

  return (
    <>
      <article className="rounded-lg border border-neutral-200 bg-neutral-0 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-3">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full text-display-h7 font-semibold",
                review.avatarClassName,
              )}
              aria-hidden
            >
              {review.reviewerInitial}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-display-h7 font-semibold text-text-black">{review.reviewer}</h3>
                {review.verified ? (
                  <span className="inline-flex items-center gap-0.5 rounded bg-primary-500 px-1.5 py-0.5 text-body-xs font-semibold text-text-white">
                    <CheckCircle2 className="size-3 shrink-0" aria-hidden />
                    Verified
                  </span>
                ) : null}
                {review.reviewerReviewCount != null ? (
                  <span className="text-body-xs text-text-dark-gray">{review.reviewerReviewCount} reviews</span>
                ) : null}
              </div>
              <p className="mt-0.5 text-body-sm text-text-dark-gray">
                <span className="font-medium text-text-black">{review.amountPaid}</span>
                <span className="mx-1.5 text-neutral-300">·</span>
                {review.relativeTime}
              </p>
            </div>
          </div>
          <StarRatingDisplay rating={review.rating} className="shrink-0 sm:pt-1" />
        </div>

        {hasCriteria ? (
          <div className="mt-4 rounded-lg bg-neutral-100 px-3 py-3 sm:px-4">
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              <ul className="space-y-2">
                {leftCriteria.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-3 text-body-sm">
                    <span className="text-text-dark-gray">{row.label}</span>
                    <StarRatingDisplay
                      rating={row.rating}
                      iconSizeClassName="size-3.5"
                      className="shrink-0 gap-0"
                    />
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {rightCriteria.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-3 text-body-sm">
                    <span className="text-text-dark-gray">{row.label}</span>
                    <StarRatingDisplay
                      rating={row.rating}
                      iconSizeClassName="size-3.5"
                      className="shrink-0 gap-0"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <p className={cn("text-body-sm leading-relaxed text-text-black", hasCriteria ? "mt-4" : "mt-3")}>
          {review.body}
        </p>

        {review.media?.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {review.media.map((item, index) => {
              const resolved = resolveReviewImageSrc(item.src);
              return (
                <li key={`${review.id}-media-${index}`}>
                  <button
                    type="button"
                    onClick={() => openViewer(index)}
                    className="relative block overflow-hidden rounded-md border border-neutral-200 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    aria-label={`Open image ${index + 1} of ${review.media?.length ?? 0}`}
                  >
                    {item.kind === "video" ? (
                      <span className="flex size-20 items-center justify-center bg-neutral-800 text-body-xs font-semibold text-text-white sm:size-24">
                        Video
                      </span>
                    ) : (
                      <Image
                        src={resolved}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="size-20 object-cover sm:size-24"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="ghost"
              className="h-9 gap-1.5 px-2 text-body-sm font-medium text-primary-600 hover:bg-primary-100 hover:text-primary-700"
            >
              <ThumbsUp className="size-4" aria-hidden />
              Useful
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="h-9 gap-1.5 px-2 text-body-sm font-medium text-text-dark-gray hover:text-text-black"
              onClick={() => setShareOpen(true)}
            >
              <Share2 className="size-4" aria-hidden />
              Share
            </Button>
          </div>
          <Button
            variant="ghost"
            className="size-9 shrink-0 p-0 text-neutral-400 hover:text-text-dark-gray"
            aria-label="Report review"
          >
            <Flag className="size-4" />
          </Button>
        </div>
      </article>

      {review.media?.length ? (
        <ReviewImageViewer
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
          review={{
            reviewer: review.reviewer,
            reviewerInitial: review.reviewerInitial,
            avatarClassName: review.avatarClassName,
            verified: review.verified,
            amountPaid: review.amountPaid,
            relativeTime: review.relativeTime,
          }}
          media={review.media}
          initialIndex={viewerIndex}
        />
      ) : null}

      <ReviewShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={shareUrl}
        shareTitle={`${review.reviewer} on Transportvibe`}
      />
    </>
  );
}
