"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type UseIntersectionObserverOptions = IntersectionObserverInit;

/**
 * Tracks whether `ref` intersects the viewport (scroll spy, lazy mounts).
 */
export function useIntersectionObserver<T extends Element>(
  options?: UseIntersectionObserverOptions,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  const root = options?.root;
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { root, rootMargin, threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [root, rootMargin, threshold]);

  return [ref, inView];
}
