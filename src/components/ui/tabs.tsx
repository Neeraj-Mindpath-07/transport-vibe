"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultTabId?: string;
  className?: string;
};

export function Tabs({ items, defaultTabId, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId ?? items[0]?.id);

  const selected = items.find((item) => item.id === activeTab) ?? items[0];

  if (!selected) {
    return null;
  }

  return (
    <div className={className}>
      <div role="tablist" className="mb-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === selected.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "rounded-md border px-3 py-2 text-body-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
              item.id === selected.id
                ? "border-primary-600 bg-primary-500 text-text-white"
                : "border-neutral-200 bg-neutral-0 text-text-black",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{selected.content}</div>
    </div>
  );
}
