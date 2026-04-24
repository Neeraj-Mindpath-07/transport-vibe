"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Checkbox } from "./checkbox";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  options: DropdownOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
};

export function Dropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "All",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selectedLabel = selectedValues.length ? `${selectedValues.length} selected` : placeholder;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="inline-flex h-11 min-w-[190px] items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-neutral-0 px-3 text-body-sm text-text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        onClick={() => setOpen((state) => !state)}
        aria-expanded={open}
        aria-label={label}
      >
        <span className="truncate text-left">
          <span className="mr-1 text-neutral-500">{label}:</span>
          {selectedLabel}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-neutral-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%+6px)] z-30 max-h-64 w-full overflow-auto rounded-lg border border-neutral-200 bg-neutral-0 p-2 shadow-lg"
        >
          <div className="space-y-1">
            {options.map((option) => {
              const checked = selectedValues.includes(option.value);
              return (
                <div key={option.value} className="rounded-md px-2 py-1 hover:bg-neutral-100">
                  <Checkbox
                    checked={checked}
                    label={option.label}
                    onChange={() => {
                      if (checked) {
                        onChange(selectedValues.filter((value) => value !== option.value));
                        return;
                      }
                      onChange([...selectedValues, option.value]);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
