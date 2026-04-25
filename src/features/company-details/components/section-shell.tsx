import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type SectionShellProps = {
  id: string;
  title: string;
  description?: string;
  /** Right side of the card header (e.g. methodology link). */
  headerAside?: ReactNode;
  /** Renders above the bordered card (e.g. a full-bleed hero or dark summary strip). */
  leadOutsideCard?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionShell({
  id,
  title,
  description,
  headerAside,
  leadOutsideCard,
  children,
  className,
  contentClassName,
}: SectionShellProps) {
  return (
    <section
      id={id}
      data-scroll-section
      className={cn("scroll-mt-[calc(var(--header-offset)+16px)] space-y-4", className)}
    >
      {leadOutsideCard}
      <Card className="overflow-hidden">
        <header className="border-b border-neutral-200 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start  sm:gap-4">
            <div className="min-w-0">
              <h2 className="font-display text-display-h6 font-semibold text-text-black">
                {title}
              </h2>
              {description ? (
                <p className="mt-1 text-body-sm text-text-dark-gray">{description}</p>
              ) : null}
            </div>
            {headerAside ? <div className="shrink-0 sm:pt-0.5">{headerAside}</div> : null}
          </div>
        </header>
        <div className={cn("px-5 py-5 sm:px-6", contentClassName)}>{children}</div>
      </Card>
    </section>
  );
}
