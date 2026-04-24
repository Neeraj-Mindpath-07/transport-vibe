import { BadgeCheck, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type BannerSectionProps = {
  company: CompanyDetailsPageData["company"];
  banner: CompanyDetailsPageData["banner"];
};

export function BannerSection({ company, banner }: BannerSectionProps) {
  return (
    <section
      aria-labelledby="company-banner-title"
      className="border-b border-neutral-200 bg-neutral-0"
    >
      <div className="mx-auto w-full max-w-[1366px] px-4 py-10 sm:px-8 lg:px-[100px]">
        <div className="rounded-card border border-neutral-200 bg-gradient-to-r from-primary-100 to-neutral-0 p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-body-xs text-primary-700">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-500/15 px-2 py-1 font-semibold">
                <ShieldCheck className="size-3.5" aria-hidden />
                Verified Profile
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-text-dark-gray">
                <MapPin className="size-3.5" aria-hidden />
                {company.location}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-text-dark-gray">
                <BadgeCheck className="size-3.5" aria-hidden />
                {siteConfig.shortTitle}
              </span>
            </div>

            <div>
              <h1
                id="company-banner-title"
                className="font-display text-display-h4 font-semibold text-text-black sm:text-display-h2"
              >
                {banner.title}
              </h1>
              <p className="mt-3 max-w-3xl text-body-md text-text-dark-gray">{banner.subtitle}</p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {banner.badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-primary-200 bg-primary-100 px-3 py-1 text-body-xs font-semibold text-primary-700"
                >
                  {badge}
                </li>
              ))}
            </ul>

            <div className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              {banner.stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-lg border border-neutral-200 bg-neutral-0 px-4 py-3"
                >
                  <p className="font-display text-display-h5 font-semibold text-text-black">
                    {stat.value}
                  </p>
                  <p className="text-body-sm text-text-dark-gray">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
