"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

function getFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function Modal({ open, title, description, onClose, children, className }: ModalProps) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusables = getFocusable(panelRef.current);
    focusables[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const currentFocusable = getFocusable(panelRef.current);
      if (currentFocusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 bg-neutral-900/65"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          className={cn(
            "relative w-full max-w-5xl rounded-card border border-neutral-200 bg-neutral-0 p-4 shadow-xl sm:p-6",
            className,
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3
                id={titleId}
                className="font-display text-display-h6 font-semibold text-text-black"
              >
                {title}
              </h3>
              {description ? (
                <p id={descId} className="mt-1 text-body-sm text-text-dark-gray">
                  {description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-md border border-neutral-200 bg-neutral-0 text-text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
