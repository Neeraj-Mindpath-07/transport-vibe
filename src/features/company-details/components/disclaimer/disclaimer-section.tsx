import { Card } from "@/components/ui/card";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type DisclaimerSectionProps = {
  data: CompanyDetailsPageData["disclaimer"];
};

export function DisclaimerSection({ data }: DisclaimerSectionProps) {
  return (
    <section aria-labelledby="company-disclaimer-title" className="mt-8 mb-12">
      <Card className="mx-auto w-full max-w-[1366px] border-neutral-200 bg-neutral-200 px-4 py-5 sm:px-8 lg:px-[100px]">
        <h2
          id="company-disclaimer-title"
          className="font-display text-display-h7 font-semibold text-text-black"
        >
          {data.title}
        </h2>
        <p className="mt-3 text-body-caption leading-[1.5] text-[var(--cd-disclaimer-text)]">
          {data.text}
        </p>
      </Card>
    </section>
  );
}
