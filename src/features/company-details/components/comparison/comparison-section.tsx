import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "../section-shell";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type ComparisonSectionProps = {
  data: CompanyDetailsPageData["comparison"];
};

export function ComparisonSection({ data }: ComparisonSectionProps) {
  return (
    <SectionShell id="comparison" title={data.title}>
      <div className="space-y-3">
        {data.items.map((item) => (
          <article key={item.id} className="rounded-lg border border-neutral-200 bg-neutral-0 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-display-h7 font-semibold text-text-black">
                {item.name}
              </h3>
              <span className="rounded-full bg-primary-100 px-2 py-1 text-body-xs font-semibold text-primary-700">
                Score {item.trustScore}
              </span>
            </div>
            <p className="mt-2 text-body-sm text-text-dark-gray">{item.summary}</p>
          </article>
        ))}

        <Button variant="secondary" className="mt-2 w-full sm:w-auto">
          {data.ctaLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </SectionShell>
  );
}
