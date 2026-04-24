import { ExternalLink, Gauge } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { SectionShell } from "../section-shell";
import type { CompanyDetailsPageData, ScoreStrength } from "../../types/company-details-page";

type CompanyScoreSectionProps = {
  data: CompanyDetailsPageData["score"];
};

function strengthClasses(strength: ScoreStrength): string {
  if (strength === "strong") {
    return "bg-primary-100 text-primary-700";
  }
  if (strength === "good") {
    return "bg-alert-light/30 text-alert";
  }
  return "bg-warning/10 text-warning";
}

export function CompanyScoreSection({ data }: CompanyScoreSectionProps) {
  return (
    <SectionShell id="trust-score" title={data.title} description={data.summary}>
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-[220px,1fr]">
          <article className="rounded-lg border border-neutral-200 bg-neutral-100 p-4">
            <p className="text-body-xs uppercase tracking-wide text-text-dark-gray">
              Overall Score
            </p>
            <p className="mt-1 font-display text-display-h2 font-semibold text-text-black">
              {data.overall}
            </p>
            <p className="text-body-sm text-text-dark-gray">out of {data.maximum}</p>
            <a
              href={data.methodologyHref}
              className="mt-3 inline-flex items-center gap-1 text-body-sm font-semibold text-primary-600 underline"
            >
              How scores are calculated
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </article>

          <article className="rounded-lg border border-neutral-200 bg-neutral-0 p-4">
            <div className="mb-3 flex items-center gap-2 text-body-sm text-text-dark-gray">
              <Gauge className="size-4 text-primary-600" aria-hidden />
              Multi-signal scoring model
            </div>
            <p className="text-body-sm text-text-dark-gray">
              Score blends review consistency, pricing reliability, dispatch speed, and service
              quality.
            </p>
          </article>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {data.pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-lg border border-neutral-200 bg-neutral-0 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-display-h7 font-semibold text-text-black">
                  {pillar.title}
                </h3>
                <span
                  className={`rounded-full px-2 py-1 text-body-xs font-semibold capitalize ${strengthClasses(pillar.strength)}`}
                >
                  {pillar.strength}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-body-sm text-text-dark-gray">
                <span>{pillar.summary}</span>
                <Tooltip content="Pillar score out of 100 based on verified datasets and customer signals.">
                  <span className="font-semibold text-text-black">{pillar.score}</span>
                </Tooltip>
              </div>
              <p className="mt-2 text-body-sm text-text-dark-gray">{pillar.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
