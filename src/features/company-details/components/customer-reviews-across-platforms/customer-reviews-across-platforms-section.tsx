import { CustomerReviewsAcrossPlatformsCard } from "./customer-reviews-across-platforms-card";
import type { CustomerReviewsAcrossPlatformsCardProps } from "./customer-reviews-across-platforms-card";

export type CustomerReviewsAcrossPlatformsSectionProps = CustomerReviewsAcrossPlatformsCardProps;

/**
 * Scroll-targeted section for the Detail Company page (`#customer-reviews` matches `scroll-registry`).
 */
export function CustomerReviewsAcrossPlatformsSection(props: CustomerReviewsAcrossPlatformsSectionProps) {
  return (
    <section
      id="customer-reviews"
      data-scroll-section
      aria-labelledby="customer-reviews-across-platforms-heading"
      className="scroll-mt-[calc(var(--header-offset)+16px)]"
    >
      <CustomerReviewsAcrossPlatformsCard {...props} />
    </section>
  );
}
