import { AlertCircle, Check } from "lucide-react";
import type { ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { CompanyDetailsPageData, ProsConsListItem } from "../../types/company-details-page";

type ComparisonSectionProps = Readonly<{
  data: CompanyDetailsPageData["comparison"];
}>;

const scrollSectionClass = "scroll-mt-[calc(var(--header-offset)+16px)]";

const badgeIconSize = "size-3.5 sm:size-4";

function ListColumn({
  type,
  heading,
  items,
  headingId,
}: Readonly<{
  type: "pro" | "con";
  heading: string;
  items: ProsConsListItem[];
  headingId: string;
}>): ReactElement {
  return (
    <section aria-labelledby={headingId} className="min-w-0 flex-1">
      <div className="flex items-center gap-2.5 sm:gap-3 mt-5">
        <span
          className={cn(
            "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8",
            type === "pro" ? "bg-pros-badge" : "bg-watch-badge",
          )}
          aria-hidden
        >
          {type === "pro" ? (
            <Check
              className={cn(
                badgeIconSize,
                "shrink-0 text-pros-accent",
              )}
              strokeWidth={2.5}
            />
          ) : (
            <AlertCircle
              className={cn(
                badgeIconSize,
                "shrink-0 text-watch-accent",
              )}
              strokeWidth={2.5}
            />
          )}
        </span>
        <h3
          id={headingId}
          className="font-display text-body-md font-semibold leading-tight text-text-black sm:text-lg sm:leading-tight"
        >
          {heading}
        </h3>
      </div>

      <ul className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
        {items.map((item) => (
          <li key={item.id}>
            <div
              className={cn(
                "min-w-0 border-l-[3px] pl-3 sm:pl-4",
                type === "pro" ? "border-pros-accent" : "border-watch-accent",
              )}
            >
              <p className="text-body-md font-semibold leading-snug text-text-black sm:leading-normal">
                {item.title}
              </p>
              <p className="mt-1.5 text-body-sm font-normal leading-[1.48] text-slate-500">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * “What they’re good at & what to watch” — two-column on large screens, stacked on small.
 */
export function ComparisonSection({ data }: ComparisonSectionProps) {
  return (
    <section
      id="comparison"
      data-scroll-section
      className={scrollSectionClass}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-lg border border-border-default p-4 shadow-[var(--cd-elevation-card)] sm:p-6 lg:p-8",
        )}
      >
        <div className="border-b border-neutral-200 pb-4 sm:pb-5">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h2 className="font-display text-display-h5 font-semibold leading-[1.2] tracking-tight text-text-black">
              {data.title}
            </h2>
            <p className="shrink-0 text-body-sm font-normal text-slate-500 sm:pt-0.5 sm:text-right">
              {data.reviewAttribution}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-0">
          <div className="min-w-0 lg:border-r lg:border-neutral-200 lg:pr-6">
            <ListColumn
              type="pro"
              headingId="comparison-pros-heading"
              heading={data.prosHeading}
              items={data.pros}
            />
          </div>

          <div className="min-w-0 lg:pl-6">
            <ListColumn
              type="con"
              headingId="comparison-cons-heading"
              heading={data.consHeading}
              items={data.cons}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
