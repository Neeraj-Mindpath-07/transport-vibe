import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { CompanyDetailsPageData, QuickFact } from "../../types/company-details-page";

type StickySidebarProps = {
  data: CompanyDetailsPageData["sidebar"];
};

function formatReviewCount(count: number): string {
  return new Intl.NumberFormat("en-US").format(count);
}

const quickFactValueClass = "text-right text-[16px] font-semibold leading-snug";

function QuickFactValue({ fact }: { fact: QuickFact }) {
  if (fact.valueHref) {
    return (
      <a
        href={fact.valueHref}
        rel="noopener noreferrer"
        className={cn(
          quickFactValueClass,
          "cursor-pointer text-primary-600 underline underline-offset-2 hover:text-primary-700",
        )}
      >
        {fact.value}
      </a>
    );
  }

  return (
    <span
      className={cn(
        quickFactValueClass,
        "cursor-default",
        fact.valueTone === "primary" ? "text-primary-600" : "text-text-black",
      )}
    >
      {fact.value}
    </span>
  );
}

const secondaryCtaClassName = cn(
  "h-auto min-h-11 justify-center rounded-[2px] border border-neutral-200 bg-neutral-0 px-2 py-2.5",
  "text-center text-[12px] font-bold uppercase tracking-wide text-primary-600",
  "hover:bg-neutral-100",
);

const primaryCtaClassName = cn(
  "h-auto min-h-11 w-full justify-center rounded-[2px] px-3 py-3",
  "text-[12px] font-bold uppercase tracking-wide",
);

export function StickySidebar({ data }: StickySidebarProps) {
  const { cta } = data;

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-[4.75rem] shrink-0 overflow-hidden rounded-md bg-neutral-100">
            <Image
              src={cta.logo.src}
              alt={cta.logo.alt}
              width={cta.logo.width}
              height={cta.logo.height}
              className="h-full w-full object-cover object-center"
              sizes="76px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[16px] font-bold leading-snug text-text-black">
              {cta.companyName}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-body-sm text-text-dark-gray">
              <Star
                className="size-4 shrink-0 fill-[#FACC15] text-[#EAB308]"
                aria-hidden
              />
              <span>
                <span className="sr-only">
                  Rating {cta.rating.toFixed(1)} out of 5, {formatReviewCount(cta.reviewCount)} reviews
                </span>
                <span aria-hidden>
                  {cta.rating.toFixed(1)} ({formatReviewCount(cta.reviewCount)})
                </span>
              </span>
            </div>
          </div>
          <div className="shrink-0 rounded-lg bg-primary-100 px-3 py-2 text-right">
            <p className="font-display text-[24px] font-bold leading-none text-primary-700">
              {cta.trustScore}
            </p>
            <p className="mt-1 text-[10px] font-normal uppercase leading-tight tracking-wide text-primary-700">
              {cta.trustBadgeLabel}
            </p>
          </div>
        </div>

        <div className="my-5 border-t border-neutral-200" />

        <div className="flex flex-col gap-4">
          <Button type="button" className={primaryCtaClassName}>
            {cta.getQuoteLabel}
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="ghost" className={secondaryCtaClassName}>
              {cta.compareWithOtherLabel}
            </Button>
            <Button type="button" variant="ghost" className={secondaryCtaClassName}>
              {cta.addToAdvisorSessionLabel}
            </Button>
          </div>
        </div>

        <div className="my-4 border-t border-neutral-200" />

        <div className="flex flex-col gap-1">
          <Button type="button" className={primaryCtaClassName}>
            {cta.useFullServiceLabel}
          </Button>
          <p className="text-center text-[14px] text-text-dark-gray mt-3">{cta.fullServiceDescription}</p>
          <a
            href={cta.learnMoreHref}
            className="block text-center text-[14px] font-normal text-primary-600 underline underline-offset-2 hover:text-primary-700"
          >
            {cta.learnMoreLabel}
          </a>
        </div>
      </Card>

      <Card className="flex flex-col rounded-card px-[20px] py-[24px]">
        <h3 className="cursor-default pb-4 font-display text-[16px] font-semibold leading-snug text-text-black">
          {data.quickFactsTitle}
        </h3>
        <dl className="divide-y divide-neutral-200">
          {data.quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-start justify-between gap-4 py-[9px] first:pt-[9px]"
            >
              <dt className="min-w-0 flex-1 cursor-default text-left text-[14px] font-normal leading-snug text-text-dark-gray">
                {fact.label}
              </dt>
              <dd className="min-w-0 shrink-0 text-right">
                <QuickFactValue fact={fact} />
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="flex flex-col gap-3 rounded-card px-[20px] py-[24px]">
        <h3 className="cursor-default font-display text-[20px] font-semibold leading-snug text-text-black">
          {data.compareTitle}
        </h3>
        <ul className="flex flex-col gap-2">
          {data.compareRows.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                className="flex w-full max-h-[45px] cursor-pointer items-center gap-3 rounded-md bg-neutral-100 px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <span className="relative size-9 shrink-0 overflow-hidden rounded bg-neutral-0">
                  <Image
                    src={row.logo.src}
                    alt={row.logo.alt}
                    width={row.logo.width}
                    height={row.logo.height}
                    className="size-9 object-contain object-center p-0.5"
                    sizes="36px"
                  />
                </span>
                <span className="min-w-0 text-[14px] font-semibold leading-snug text-text-black">
                  {row.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="ghost"
          className="h-auto min-h-11 w-full justify-center rounded-[2px] border border-neutral-200 bg-neutral-0 px-3 py-3 text-[12px] font-bold uppercase tracking-wide text-primary-600 hover:bg-neutral-100"
        >
          {data.compareCtaLabel}
        </Button>
      </Card>

      <section
        aria-labelledby="sidebar-leave-review-heading"
        className="relative isolate overflow-hidden rounded-card border border-white/15 bg-brand-deep shadow-[var(--cd-elevation-card)]"
      >
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[min(58%,280px)] min-w-[120px]"
          aria-hidden
        >
          <Image
            src={data.leaveReview.mapImage.src}
            alt=""
            fill
            className="object-cover object-right opacity-[0.35]"
            sizes="280px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-deep/40 to-brand-deep"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex min-h-[194px] flex-col justify-between p-6 gap-0">
          <h3
            id="sidebar-leave-review-heading"
            className="max-w-[18rem] cursor-default font-display text-[24px] font-semibold leading-snug text-text-white"
          >
            {data.leaveReview.title}
          </h3>
          <p className="max-w-full cursor-default text-[14px] font-normal leading-snug text-text-white/95">
            {data.leaveReview.description}
          </p>
          <Button
            type="button"
            className="h-auto max-w-[138px] justify-center rounded-[2px] bg-primary-500 px-4 text-[12px] font-bold uppercase tracking-wide text-text-white hover:bg-primary-600 max-h-10 min-h-[38px]"
          >
            {data.leaveReview.ctaLabel}
          </Button>
        </div>
      </section>

      <section
        aria-labelledby="sidebar-ready-to-ship-heading"
        className="relative isolate h-[174px] max-h-[174px] overflow-hidden rounded-card border border-white/15 shadow-[var(--cd-elevation-card)]"
      >
        <Image
          src={data.readyToShip.backgroundImage.src}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 454px"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-neutral-900/88 via-neutral-900/72 to-neutral-900/45"
          aria-hidden
        />

        <div className="relative z-10 flex h-full max-h-[174px] min-h-0 flex-col justify-between gap-2 p-6">
          <h3
            id="sidebar-ready-to-ship-heading"
            className="cursor-default font-display text-[24px] font-semibold leading-snug text-text-white"
          >
            {data.readyToShip.title}
          </h3>
          <p className="line-clamp-2 max-w-full cursor-default text-[14px] font-normal leading-snug text-text-white/95">
            {data.readyToShip.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              className="h-auto min-h-[38px] max-h-10 w-[110px] shrink-0 justify-center rounded-[2px] bg-primary-500 px-1 text-[12px] font-bold uppercase tracking-wide text-text-white hover:bg-primary-600"
            >
              {data.readyToShip.getQuoteLabel}
            </Button>
            <Button
              type="button"
              className="h-auto min-h-[38px] max-h-10 w-[148px] shrink-0 justify-center rounded-[2px] bg-neutral-0 px-1 text-[12px] font-bold uppercase tracking-wide text-primary-600 hover:bg-neutral-100"
            >
              {data.readyToShip.useFullServiceLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
