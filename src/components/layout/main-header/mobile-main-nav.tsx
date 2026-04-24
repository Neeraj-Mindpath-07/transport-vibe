"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { figmaAssets } from "@/config/figma-assets";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { mainNavLinks } from "./nav-links";

export function MobileMainNav() {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  return (
    <div className="relative flex items-center justify-between gap-4">
      <Link href="/" className="relative block h-8 w-[120px] shrink-0 sm:w-[146px]">
        <Image
          src={figmaAssets.navLogo}
          alt="Transportvibe"
          fill
          className="object-contain object-left"
          sizes="146px"
          priority
        />
      </Link>
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-md border border-neutral-200 bg-neutral-0 text-text-black"
        aria-expanded={open}
        aria-controls="mobile-main-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open ? (
        <div
          className="fixed inset-x-0 bottom-0 z-40 bg-neutral-900/40"
          style={{ top: "var(--header-offset)" }}
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <nav
            id="mobile-main-nav"
            className="mx-4 mt-2 max-h-[min(80vh,calc(100dvh-var(--header-offset)-2rem))] overflow-y-auto rounded-card border border-neutral-200 bg-neutral-0 p-4 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Main"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-1">
              {mainNavLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-display-label text-text-light-gray"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {"badge" in item && item.badge ? (
                        <span className="rounded px-1 text-display-caption text-primary-500 bg-primary-500/20">
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 pt-4">
              <Link
                href="#"
                className="rounded-sm border border-primary-700 bg-neutral-0 py-2.5 text-center text-display-caption font-bold uppercase text-primary-700"
                onClick={() => setOpen(false)}
              >
                Leave review
              </Link>
              <Link
                href="#"
                className="rounded-sm bg-primary-500 py-2.5 text-center text-display-caption font-bold uppercase text-text-white"
                onClick={() => setOpen(false)}
              >
                Get quotes
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
