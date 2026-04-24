"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2 text-body-sm text-text-black",
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="size-4 rounded border-neutral-300 text-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        {...props}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
