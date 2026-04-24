import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type PaymentStripSectionProps = {
  data: CompanyDetailsPageData["paymentStrip"];
};

export function PaymentStripSection({ data }: PaymentStripSectionProps) {
  return (
    <section aria-labelledby="payment-strip-title" className="mt-8">
      <Card className="mx-auto w-full max-w-[1366px] px-4 py-6 sm:px-8 lg:px-[100px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              id="payment-strip-title"
              className="font-display text-display-h6 font-semibold text-text-black"
            >
              {data.title}
            </h2>
            <p className="mt-1 text-body-sm text-text-dark-gray">{data.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {data.methods.map((method) => (
              <div
                key={method.name}
                className="relative opacity-90"
                style={{ width: method.width, height: method.height }}
              >
                <Image
                  src={method.src}
                  alt={method.name}
                  fill
                  className="object-contain"
                  sizes={`${method.width}px`}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
