import Image from "next/image";
import Link from "next/link";
import { figmaAssets } from "@/config/figma-assets";
import { cn } from "@/lib/cn";
import { mainNavLinks } from "./nav-links";
import { MobileMainNav } from "./mobile-main-nav";

/**
 * Primary nav — logo, links, CTAs (Figma Navigation row 2).
 */
export function MainHeader() {
  return (
    <div
      className={cn(
        "border-b border-white/20 bg-white backdrop-blur-[12px]",
        "px-4 py-5 sm:px-8",
        "min-h-[82px] sm:pb-[21px] sm:pt-5",
      )}
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="lg:hidden">
          <MobileMainNav />
        </div>
        <div className="hidden items-center justify-between gap-8 lg:flex">
          <div className="flex min-w-0 flex-1 items-center gap-8">
            <Link href="/" className="relative h-8 w-[146px] shrink-0">
              <Image
                src={figmaAssets.navLogo}
                alt="Transportvibe — We Drive the Truth in Auto Transport Reviews"
                fill
                className="object-contain object-left"
                sizes="146px"
                priority
              />
            </Link>
            <nav aria-label="Primary" className="min-w-0">
              <ul className="flex flex-wrap items-center gap-5">
                {mainNavLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 text-display-label text-text-light-gray hover:text-text-dark-gray"
                    >
                      {item.label === "ShipAdvisor AI" ? (
                        <Image
                          src={figmaAssets.navShipAdvisorIcon}
                          alt=""
                          width={15}
                          height={13}
                          className="shrink-0"
                        />
                      ) : null}
                      <span>{item.label}</span>
                      {"badge" in item && item.badge ? (
                        <span className="ml-1 rounded-sm bg-primary-500/20 px-1 text-display-caption font-semibold text-primary-500">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Link
              href="#"
              className="rounded-sm bg-neutral-0 px-5 py-2.5 text-display-caption font-bold uppercase text-primary-700 shadow-sm ring-1 ring-neutral-200"
            >
              Leave review
            </Link>
            <Link
              href="#"
              className="rounded-sm bg-primary-500 px-5 py-2.5 text-display-caption font-bold uppercase text-text-white"
            >
              Get quotes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
