"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type NewsletterSectionProps = {
  data: CompanyDetailsPageData["newsletter"];
};

export function NewsletterSection({ data }: NewsletterSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section aria-labelledby="newsletter-title" className="mt-8">
      <Card className="mx-auto w-full max-w-[1366px] border-neutral-200 bg-brand-deep px-4 py-8 text-text-white sm:px-8 lg:px-[100px]">
        <div className="max-w-4xl">
          <h2 id="newsletter-title" className="font-display text-display-h4 font-semibold">
            {data.title}
          </h2>
          <p className="mt-2 text-body-md text-text-white/90">{data.description}</p>

          {submitted ? (
            <p className="mt-6 rounded-md border border-primary-200 bg-primary-500/20 px-4 py-3 text-body-sm">
              Thanks. You are subscribed. You can unsubscribe any time.
            </p>
          ) : (
            <form
              className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <Input required placeholder="Your Name" className="bg-neutral-0 text-text-black" />
              <Input
                required
                type="tel"
                placeholder="Your Phone"
                className="bg-neutral-0 text-text-black"
              />
              <Input
                required
                type="email"
                placeholder="Your Email"
                className="bg-neutral-0 text-text-black"
              />
              <Button className="h-11">{data.ctaLabel}</Button>
            </form>
          )}

          <p className="mt-3 text-body-sm italic text-text-white/80">{data.footnote}</p>
        </div>
      </Card>
    </section>
  );
}
