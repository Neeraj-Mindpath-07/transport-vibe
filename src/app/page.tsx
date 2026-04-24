import { Card } from "@/components/ui/card";
import { CompanyDetailsLayout } from "@/features/company-details/components/company-details-layout";

export default function Home() {
  return (
    <CompanyDetailsLayout
      sidebar={
        <Card className="p-4">
          <p className="font-display text-display-h7 font-semibold text-text-black">
            Sticky sidebar
          </p>
          <p className="mt-2 text-body-sm text-text-dark-gray">
            Phase 1 shell — replace with quotes / score card in later phases.
          </p>
        </Card>
      }
    >
      <h1 className="font-display text-display-h4 font-semibold text-text-black">
        Company Details Page
      </h1>
      <p className="mt-3 max-w-prose text-body-md text-text-dark-gray">
        Layout shell matches Transportvibe Figma navigation and footer. Route{" "}
        <code className="rounded bg-neutral-100 px-1 text-body-sm">/company-details</code> ships in
        Phase 2.
      </p>
    </CompanyDetailsLayout>
  );
}
