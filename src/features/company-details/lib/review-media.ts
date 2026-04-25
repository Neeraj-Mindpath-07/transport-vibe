import type { StaticImageData } from "next/image";
import reviewImageOneAlt from "@/assets/images/company-details/Rectangle 181 (1).png";
import reviewImageOne from "@/assets/images/company-details/Rectangle 181.png";
import reviewImageTwo from "@/assets/images/company-details/Rectangle 182.png";

const localReviewImages = {
  "Rectangle 181 (1).png": reviewImageOneAlt,
  "Rectangle 181.png": reviewImageOne,
  "Rectangle 182.png": reviewImageTwo,
} as const;

export function resolveReviewImageSrc(src: string): string | StaticImageData {
  return localReviewImages[src as keyof typeof localReviewImages] ?? src;
}
