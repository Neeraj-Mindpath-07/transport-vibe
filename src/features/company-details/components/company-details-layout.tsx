import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CompanyDetailsLayoutProps = {
  children: ReactNode;
  sidebar: ReactNode;
  className?: string;
};

/**
 * Main column (~712px) + sticky sidebar — Figma “Detail company” content width 1166px, horizontal padding 100px.
 */
export function CompanyDetailsLayout({ children, sidebar, className }: CompanyDetailsLayoutProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1366px] px-4 py-8 sm:px-8 lg:px-[100px]", className)}>
      <div className="flex w-full max-w-[1166px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <main
          id="main-content"
          className="min-w-0 w-full max-w-[712px] scroll-mt-[calc(var(--header-offset)+12px)]"
        >
          {children}
        </main>
        <aside className="w-full shrink-0 lg:w-[min(454px,100%)] lg:max-w-[454px]">
          <div className="space-y-6 lg:sticky lg:top-[var(--header-offset)]">{sidebar}</div>
        </aside>
      </div>
    </div>
  );
}
