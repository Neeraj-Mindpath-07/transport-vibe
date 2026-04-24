"use client";

import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/cn";
import { SectionShell } from "../section-shell";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type ImageGalleryProps = {
  data: CompanyDetailsPageData["gallery"];
};

export function ImageGallery({ data }: ImageGalleryProps) {
  const [activeTag, setActiveTag] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    data.images.forEach((image) => {
      image.tags.forEach((tag) => allTags.add(tag));
    });
    return ["all", ...allTags];
  }, [data.images]);

  const filteredImages = useMemo(
    () =>
      activeTag === "all"
        ? data.images
        : data.images.filter((image) => image.tags.includes(activeTag)),
    [activeTag, data.images],
  );

  const selectedImage = selectedIndex === null ? null : filteredImages[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((prev) => {
          if (prev === null) return prev;
          return prev === 0 ? filteredImages.length - 1 : prev - 1;
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((prev) => {
          if (prev === null) return prev;
          return prev === filteredImages.length - 1 ? 0 : prev + 1;
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredImages.length, selectedIndex]);

  return (
    <SectionShell id="customer-reviews" title={data.title} description={data.description}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setActiveTag(tag);
                setSelectedIndex(null);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-body-xs font-semibold capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
                activeTag === tag
                  ? "border-primary-600 bg-primary-500 text-text-white"
                  : "border-neutral-200 bg-neutral-0 text-text-dark-gray",
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </div>
              <div className="absolute right-2 top-2 rounded-full bg-neutral-0/90 p-1 text-text-black">
                <Expand className="size-4" aria-hidden />
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={selectedImage !== null}
        title={selectedImage?.alt ?? "Gallery image"}
        description="Use left and right arrow keys to browse images."
        onClose={() => setSelectedIndex(null)}
        className="max-w-6xl"
      >
        {selectedImage ? (
          <div className="grid gap-4 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) => {
                  if (prev === null) return prev;
                  return prev === 0 ? filteredImages.length - 1 : prev - 1;
                })
              }
              className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 text-text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1440px) 90vw, 1200px"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) => {
                  if (prev === null) return prev;
                  return prev === filteredImages.length - 1 ? 0 : prev + 1;
                })
              }
              className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 text-text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        ) : null}
      </Modal>
    </SectionShell>
  );
}
