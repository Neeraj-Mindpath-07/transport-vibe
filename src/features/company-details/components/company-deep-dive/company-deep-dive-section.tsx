import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type CompanyDeepDiveSectionProps = Readonly<{
  data: CompanyDetailsPageData["companyDeepDive"];
}>;

const scrollSectionClass = "scroll-mt-[calc(var(--header-offset)+16px)]";

/**
 * Match SectionShell / main column: same horizontal padding as other cards.
 * See company-details-layout (outer px) + this inner pad (do not add extra px-4 on mobile).
 */
const innerX = "px-5 sm:px-6";

const proseClass =
  "space-y-3 text-body-sm font-normal leading-[1.48] text-text-dark-gray";

/**
 * Long-form “Company Deep Dive” — same bordered `Card` surface as `SectionShell` and other main-column sections (all viewports).
 */
export function CompanyDeepDiveSection({ data }: CompanyDeepDiveSectionProps) {
  return (
    <section
      id="company-deep-dive"
      data-scroll-section
      className={cn(scrollSectionClass)}
    >
      <Card className="overflow-hidden p-0">
        <header className={cn("border-b border-neutral-200 py-4", innerX)}>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h2 className="font-display text-display-h6 font-semibold text-text-black">
              {data.title}
            </h2>
            <p className="shrink-0 text-body-sm font-normal text-slate-500 sm:pt-0.5 sm:text-right">
              {data.attribution}
            </p>
          </div>
        </header>

        <div className={cn("border-b border-neutral-200 py-3.5", innerX)}>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {data.badges.map((badge) => (
              <li key={badge}>
                <span
                  className="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-0 px-2.5 py-1.5 text-body-sm text-text-black"
                >
                  {badge}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="divide-y divide-neutral-200">
          {data.sections.map((section) => (
            <div
              key={section.id}
              className={cn("py-5 sm:py-6", innerX)}
            >
              <h3
                id={`deepdive-${section.id}`}
                className="font-display text-body-md font-semibold leading-snug text-text-black"
              >
                {section.heading}
              </h3>

              {section.paragraphs.length > 0 ? (
                <div className={cn(proseClass, "mt-3")}>
                  {section.paragraphs.map((p, i) => (
                    <p key={`${section.id}-p-${i}`}>{p}</p>
                  ))}
                </div>
              ) : null}

              {section.callout ? (
                <div
                  className={cn(
                    "mt-4 border-l-4 border-deepdive-callout-border bg-deepdive-callout px-4 py-3.5 sm:px-5",
                    "rounded-r-md",
                  )}
                >
                  <p className="font-display text-body-sm font-semibold text-deepdive-callout-foreground">
                    {section.callout.label}
                  </p>
                  <div className="mt-2 space-y-2 text-body-sm text-deepdive-callout-foreground">
                    {section.callout.lines.map((line, i) => (
                      <p key={`${section.id}-c-${i}`} className="m-0 leading-[1.48]">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}

              {section.labeledBlocks && section.labeledBlocks.length > 0 ? (
                <div
                  className={cn(
                    "space-y-4 text-body-sm font-normal leading-[1.48] text-text-dark-gray",
                    section.paragraphs.length > 0 || section.callout ? "mt-4" : "mt-3",
                  )}
                >
                  {section.labeledBlocks.map((block) => (
                    <p key={block.label} className="m-0">
                      <span className="font-bold text-text-black">{block.label}</span>{" "}
                      {block.text}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
