import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type SectionShellProps = {
  id: string;
  title: string;
  description?: string;
  /** Renders on the right side of the header row (e.g. sort + primary CTA). */
  headerEnd?: ReactNode;
  /** Full-width row below the title row (e.g. rating filter tabs). */
  headerAccessory?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionShell({
  id,
  title,
  description,
  headerEnd,
  headerAccessory,
  children,
  className,
  contentClassName,
}: SectionShellProps) {
  return (
    <section
      id={id}
      data-scroll-section
      className={cn("scroll-mt-[calc(var(--header-offset)+16px)]", className)}
    >
      <Card className="overflow-hidden">
        <header className="border-b border-neutral-200 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0">
              <h2 className="font-display text-display-h6 font-semibold text-text-black">{title}</h2>
              {description ? (
                <p className="mt-1 text-body-sm text-text-dark-gray">{description}</p>
              ) : null}
            </div>
            {headerEnd ? (
              <div className="flex shrink-0 flex-wrap items-center gap-3">{headerEnd}</div>
            ) : null}
          </div>
          {headerAccessory ? (
            <div className="-mx-5 mt-4 border-t border-neutral-200 sm:-mx-6">
              <div className="border-b border-neutral-200 px-1 sm:px-2">{headerAccessory}</div>
            </div>
          ) : null}
        </header>
        <div className={cn("px-5 py-5 sm:px-6", contentClassName)}>{children}</div>
      </Card>
    </section>
  );
}
