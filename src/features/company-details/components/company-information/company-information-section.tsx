import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { CompanyDetailsPageData } from "../../types/company-details-page";
import {
  companyInformationDashboardAssets,
  companyInformationDashboardCopy,
} from "./static-company-information-dashboard";

type CompanyInformationSectionProps = {
  data: CompanyDetailsPageData["companyInformation"];
};

const labelClass =
  "text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:text-body-xs sm:normal-case sm:tracking-normal sm:text-gray-600";

/**
 * FMCSA-style company information dashboard (desktop 2-column grid; mobile single column).
 */
export function CompanyInformationSection({ data }: CompanyInformationSectionProps) {
  const copy = companyInformationDashboardCopy;
  const assets = companyInformationDashboardAssets;

  return (
    <section
      id="company-information"
      data-scroll-section
      className="scroll-mt-[calc(var(--header-offset)+16px)]"
    >
      <Card className="overflow-hidden rounded-lg border-neutral-200">
        <header className="flex flex-col gap-2 border-b border-neutral-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <h2 className="font-display text-[17px] font-semibold leading-snug text-text-black sm:text-display-h6">
            {data.title}
          </h2>
          <p className="flex items-center gap-2 text-body-xs font-medium text-primary-700">
            <span className="size-2 shrink-0 rounded-full bg-primary-500" aria-hidden />
            {copy.liveStatus}
          </p>
        </header>

        <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-6 sm:py-6">
          {/* Verified banner — row on all breakpoints so the badge stays leading-left (not stretched / centered). */}
          <div className="flex flex-row flex-wrap items-start gap-x-3 gap-y-2 rounded-lg bg-primary-100 px-3 py-3.5 sm:items-center sm:gap-4 sm:px-4 sm:py-4">
            <span className="inline-flex shrink-0">
              <Image
                src={assets.verifiedBadge}
                alt=""
                width={46}
                height={45}
                className="h-10 w-[46px] object-contain object-left sm:h-11"
                unoptimized
              />
            </span>
            <div className="min-w-0 flex-1 basis-[min(100%,12rem)] sm:basis-auto">
              <p className="font-display text-body-sm font-semibold text-text-black sm:text-[15px]">
                {copy.verification.title}
              </p>
              <p className="mt-1 text-body-xs leading-snug text-text-dark-gray">
                {copy.verification.subtitle}
              </p>
            </div>
            <a
              href={copy.verification.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-body-xs font-semibold text-primary-700 underline-offset-2 hover:underline max-sm:ml-auto sm:shrink-0"
            >
              {copy.verification.ctaLabel}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>

          {/* Fact grid — mobile: stacked + dividers; sm+: 2×3 with internal borders */}
          <div className="overflow-hidden rounded-lg border border-neutral-200">
            <div className="grid grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-2 sm:divide-y-0">
              {copy.grid.map((cell, index) => (
                <div
                  key={cell.label}
                  className={cn(
                    "px-4 py-4 sm:px-5 sm:py-4",
                    index < 4 && "sm:border-b sm:border-neutral-200",
                    index % 2 === 0 && "sm:border-r sm:border-neutral-200",
                  )}
                >
                  <p className={labelClass}>{cell.label}</p>
                  <p
                    className={cn(
                      "mt-1.5 font-display text-body-sm font-semibold sm:text-[15px]",
                      cell.valueEmphasis === "primary" ? "text-primary-700" : "text-text-black",
                    )}
                  >
                    {cell.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-text-dark-gray sm:text-body-xs">
                    {cell.subtext}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance + estimates */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <article className="rounded-lg border border-neutral-200 bg-neutral-0 px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="font-display text-body-sm font-semibold text-text-black sm:text-[15px]">
                {copy.cargoInsurance.title}
              </h3>
              <p className="mt-2 text-body-xs leading-relaxed text-text-dark-gray sm:text-[13px]">
                {copy.cargoInsurance.body}
              </p>
            </article>
            <article className="flex gap-3 rounded-lg border border-alert/25 bg-alert-light/25 px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-5">
              <Image
                src={assets.warningIcon}
                alt=""
                width={22}
                height={19}
                className="mt-0.5 h-[19px] w-[22px] shrink-0"
                unoptimized
              />
              <div className="min-w-0">
                <h3 className="font-display text-body-sm font-semibold text-text-black sm:text-[15px]">
                  {copy.quotesWarning.title}
                </h3>
                <p className="mt-2 text-body-xs leading-relaxed text-text-dark-gray sm:text-[13px]">
                  {copy.quotesWarning.body}
                </p>
              </div>
            </article>
          </div>

          {/* TransportVibe role */}
          <footer className="rounded-lg bg-primary-100/80 px-4 py-4 sm:px-5 sm:py-5">
            <h3 className="font-display text-body-sm font-semibold text-primary-700 sm:text-[15px]">
              {copy.transportVibeRole.title}
            </h3>
            <p className="mt-2 text-body-xs leading-relaxed text-text-dark-gray sm:text-[13px]">
              {copy.transportVibeRole.body}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Image
                src={assets.complianceAvatars}
                alt=""
                width={84}
                height={36}
                className="h-9 w-auto shrink-0"
                unoptimized
              />
              <p className="font-display text-body-sm font-semibold text-primary-700">
                {copy.transportVibeRole.socialProof}
              </p>
            </div>
          </footer>
        </div>
      </Card>
    </section>
  );
}
