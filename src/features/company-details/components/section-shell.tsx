import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type SectionShellProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionShell({
  id,
  title,
  description,
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
          <h2 className="font-display text-display-h6 font-semibold text-text-black">{title}</h2>
          {description ? (
            <p className="mt-1 text-body-sm text-text-dark-gray">{description}</p>
          ) : null}
        </header>
        <div className={cn("px-5 py-5 sm:px-6", contentClassName)}>{children}</div>
      </Card>
    </section>
  );
}
