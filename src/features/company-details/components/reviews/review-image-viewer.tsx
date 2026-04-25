"use client";

import { CheckCircle2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { resolveReviewImageSrc } from "../../lib/review-media";
import { cn } from "@/lib/cn";
import type { CompanyReview, ReviewMedia } from "../../types/company-details-page";

type ReviewImageViewerProps = {
  open: boolean;
  onClose: () => void;
  review: Pick<
    CompanyReview,
    "reviewer" | "reviewerInitial" | "avatarClassName" | "verified" | "amountPaid" | "relativeTime"
  >;
  media: ReviewMedia[];
  initialIndex: number;
};

export function ReviewImageViewer({
  open,
  onClose,
  review,
  media,
  initialIndex,
}: ReviewImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      setActiveIndex(Math.min(Math.max(0, initialIndex), Math.max(0, media.length - 1)));
    }
  }, [open, initialIndex, media.length]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    },
    [open, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  if (!open || media.length === 0) {
    return null;
  }

  const active = media[activeIndex];
  if (!active) {
    return null;
  }

  const activeSrc = resolveReviewImageSrc(active.src);
  const isVideo = active.kind === "video" && typeof activeSrc === "string";

  return (
    <div className="fixed inset-0 z-[95] flex flex-col bg-neutral-900/90 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default bg-transparent"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
      />
      <header className="relative z-10 flex items-start justify-between gap-4 px-4 pb-2 pt-4 sm:px-6 sm:pt-6">
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
              <h2 className="font-display text-display-h6 font-semibold text-text-white">{review.reviewer}</h2>
              {review.verified ? (
                <span className="inline-flex items-center gap-0.5 text-body-sm font-semibold text-primary-500">
                  <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                  Verified
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 text-body-sm text-neutral-300">
              <span className="font-medium text-neutral-100">{review.amountPaid}</span>
              <span className="mx-1.5 text-neutral-500">·</span>
              {review.relativeTime}
            </p>
          </div>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="relative z-10 inline-flex size-10 items-center justify-center rounded-md text-text-white transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          aria-label="Close image viewer"
        >
          <X className="size-6" strokeWidth={2} />
        </button>
      </header>

      <div
        className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative mx-auto flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center">
          <div className="relative h-[min(62vh,720px)] w-full">
            {isVideo ? (
              <video
                key={active.src}
                src={activeSrc}
                controls
                className="size-full rounded-lg bg-black object-contain"
                playsInline
              />
            ) : (
              <Image
                src={activeSrc}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
              />
            )}
          </div>
        </div>

        <div className="relative z-10 mt-4 flex justify-start overflow-x-auto pb-1 [scrollbar-width:thin]">
          <ul className="flex gap-2" aria-label="Review photos">
            {media.map((item, index) => {
              const thumbSrc = resolveReviewImageSrc(item.src);
              const selected = index === activeIndex;
              return (
                <li key={`${item.src}-${index}`}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-current={selected ? "true" : undefined}
                    className={cn(
                      "relative size-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:size-20",
                      selected ? "border-primary-500 ring-2 ring-primary-500/40" : "border-transparent opacity-80 hover:opacity-100",
                    )}
                  >
                    {item.kind === "video" ? (
                      <span className="flex size-full items-center justify-center bg-neutral-800 text-body-xs font-semibold text-text-white">
                        Video
                      </span>
                    ) : (
                      <Image
                        src={thumbSrc}
                        alt=""
                        width={80}
                        height={80}
                        className="size-full object-cover"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
