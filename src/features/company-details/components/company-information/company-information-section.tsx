import { SectionShell } from "../section-shell";
import type { CompanyDetailsPageData } from "../../types/company-details-page";

type CompanyInformationSectionProps = {
  data: CompanyDetailsPageData["companyInformation"];
};

export function CompanyInformationSection({ data }: CompanyInformationSectionProps) {
  return (
    <SectionShell id="company-information" title={data.title}>
      <div className="space-y-5">
        <div className="space-y-3 text-body-sm text-text-dark-gray">
          {data.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral-200">
          <table className="w-full border-collapse">
            <tbody>
              {data.quickFacts.map((fact) => (
                <tr key={fact.label} className="border-b border-neutral-200 last:border-b-0">
                  <th className="bg-neutral-100 px-3 py-2 text-left text-body-sm font-semibold text-text-dark-gray">
                    {fact.label}
                  </th>
                  <td className="px-3 py-2 text-body-sm text-text-black">{fact.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionShell>
  );
}
