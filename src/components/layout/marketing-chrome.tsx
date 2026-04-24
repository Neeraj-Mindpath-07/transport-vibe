import Link from "next/link";
import { MainHeader } from "@/components/layout/main-header/main-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { TopHeader } from "@/components/layout/top-header/top-header";
import { cn } from "@/lib/cn";

type MarketingChromeProps = {
  children: React.ReactNode;
};

/**
 * Global marketing shell — sticky nav + footer (Transportvibe Figma).
 */
export function MarketingChrome({ children }: MarketingChromeProps) {
  return (
    <>
      <Link
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]",
          "focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-body-sm focus:text-text-white",
        )}
      >
        Skip to main content
      </Link>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-0">
        <TopHeader />
        <MainHeader />
      </header>
      {children}
      <SiteFooter />
    </>
  );
}
