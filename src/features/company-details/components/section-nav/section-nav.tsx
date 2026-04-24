"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";
import type { ScrollSectionId } from "../../lib/scroll-registry";

type SectionNavItem = {
  id: ScrollSectionId;
  label: string;
};

type SectionNavProps = {
  sections: readonly SectionNavItem[];
};

const HEADER_OFFSET = 140;

export function SectionNav({ sections }: SectionNavProps) {
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<ScrollSectionId>(sections[0]?.id);

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id as ScrollSectionId);
        }
      },
      {
        root: null,
        rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  function onNavigate(id: ScrollSectionId) {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav aria-label="Section navigation" className="sticky top-[var(--header-offset)] z-20 bg-background">
      <div className="mb-6 overflow-x-auto border-b border-neutral-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="-mb-px flex min-w-max items-stretch gap-6 sm:gap-8 lg:gap-10">
          {sections.map((section) => (
            <li key={section.id} className="flex shrink-0">
              <button
                type="button"
                onClick={() => onNavigate(section.id)}
                aria-current={activeSection === section.id ? "location" : undefined}
                className={cn(
                  "border-b-2 px-0.5 py-3 text-[16px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
                  activeSection === section.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-text-dark-gray hover:text-text-black",
                )}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
