import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` once the element scrolls into view. One-shot — we don't
 * want sections re-fading on every pass.
 */
export function useReveal<T extends HTMLElement>(
  threshold = 0.15,
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
