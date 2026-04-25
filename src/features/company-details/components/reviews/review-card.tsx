import { CheckCircle2, Flag, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import reviewImageOneAlt from "@/assets/images/company-details/Rectangle 181 (1).png";
import reviewImageOne from "@/assets/images/company-details/Rectangle 181.png";
import reviewImageTwo from "@/assets/images/company-details/Rectangle 182.png";
import { Button } from "@/components/ui/button";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import { cn } from "@/lib/cn";
import type { CompanyReview } from "../../types/company-details-page";

type ReviewCardProps = {
  review: CompanyReview;
};

const reviewImageByName = {
  "Rectangle 181 (1).png": reviewImageOneAlt,
  "Rectangle 181.png": reviewImageOne,
  "Rectangle 182.png": reviewImageTwo,
} as const;

export function ReviewCard({ review }: ReviewCardProps) {
  const [leftCriteria, rightCriteria] = [
    review.criteria.slice(0, 3),
    review.criteria.slice(3, 6),
  ];

  return (
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
              <h3 className="font-display text-display-h7 font-semibold text-text-black">
                {review.reviewer}
              </h3>
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

      <p className="mt-4 text-body-sm leading-relaxed text-text-black">{review.body}</p>

      {review.media?.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {review.media.map((item, index) => (
            <li
              key={`${review.id}-media-${index}`}
              className="relative overflow-hidden rounded-md border border-neutral-200"
            >
              {/** Media can come from mock URL or local assets by file name. */}
              <Image
                src={reviewImageByName[item.src as keyof typeof reviewImageByName] ?? item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="size-20 object-cover sm:size-24"
              />
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" className="h-9 gap-1.5 px-2 text-body-sm font-medium text-text-dark-gray hover:text-text-black">
            <ThumbsUp className="size-4" aria-hidden />
            Helpful
          </Button>
          <Button variant="ghost" className="h-9 gap-1.5 px-2 text-body-sm font-medium text-text-dark-gray hover:text-text-black">
            <Share2 className="size-4" aria-hidden />
            Share
          </Button>
          <Button
            variant="ghost"
            className="size-9 shrink-0 p-0 text-text-dark-gray hover:text-text-black"
            aria-label="Reply to review"
          >
            <MessageCircle className="size-4" />
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
  );
}
