import { CheckCircle2, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { CompanyReview } from "../../types/company-details-page";

type ReviewCardProps = {
  review: CompanyReview;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="p-4 sm:p-5">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-display-h7 font-semibold text-text-black">
            {review.headline}
          </h3>
          <p className="mt-1 text-body-sm text-text-dark-gray">
            {review.reviewer} • {review.vehicle}
          </p>
        </div>
        <div className="flex items-center gap-1 text-alert">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={`${review.id}-star-${index}`}
              className="size-4"
              fill={index < review.rating ? "currentColor" : "transparent"}
            />
          ))}
        </div>
      </header>

      <p className="mt-3 text-body-sm text-text-black">{review.body}</p>

      <footer className="mt-3 flex flex-wrap items-center gap-3 text-body-xs text-text-dark-gray">
        <span className="rounded-full bg-neutral-100 px-2 py-1">{review.serviceType}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-1">{review.state}</span>
        <time className="rounded-full bg-neutral-100 px-2 py-1">{review.date}</time>
        {review.verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-primary-700">
            <CheckCircle2 className="size-3.5" aria-hidden />
            Verified
          </span>
        ) : null}
      </footer>
    </Card>
  );
}
