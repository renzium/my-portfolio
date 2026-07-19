/**
 * useScrollAnimation
 *
 * Replaces usePinnedSection entirely.
 * No position:fixed toggling — zero jumping.
 *
 * For regular sections: fires onEnter/onLeave via IntersectionObserver.
 * The component uses CSS transitions triggered by intersection.
 *
 * For TechStack: uses position:sticky on the wrapper div (not the section),
 * and drives the skill strip offset from scrollY delta while sticky is active.
 */

import { useEffect, useRef, useCallback } from "react";

/**
 * useIntersectionAnimation
 * Fires a callback when element enters/leaves viewport.
 * No position manipulation — pure observation.
 *
 * @param {function} onEnter - called when element enters viewport
 * @param {function} onLeave - called when element leaves viewport
 * @param {number}   threshold - 0-1, how much of element must be visible
 */
export function useIntersectionAnimation({ onEnter, onLeave, threshold = 0.15 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter?.(entry);
        } else {
          onLeave?.(entry);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onEnter, onLeave, threshold]);

  return ref;
}

/**
 * useStickyScrollStrip
 *
 * Used exclusively by TechStack.
 * The WRAPPER div gets position:sticky so the section
 * sticks while in view — no fixed positioning, no jumps.
 * Scroll delta inside the sticky window drives the strip offset.
 *
 * @param {function} onProgress  - called with 0→1 as strip scrolls
 * @param {number}   scrollRange - how many px of scroll = full strip travel
 */
export function useStickyScrollStrip({ onProgress, scrollRange = 700 } = {}) {
  const wrapperRef = useRef(null);   // sticky wrapper — gets position:sticky
  const stripRef = useRef(null);     // the horizontal strip
  const progressRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip = stripRef.current;
    if (!wrapper || !strip) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const windowH = window.innerHeight;

      // While wrapper is sticking (top === 0 or close to it)
      // rect.top will be 0 when sticky kicks in
      // rect.bottom will decrease as we scroll through the sticky range
      // We measure how far through the sticky window we are

      // The wrapper's offsetTop tells us where it starts in the document
      const wrapperTop = wrapper.offsetTop;
      const scrolled = window.scrollY - wrapperTop;

      // Clamp to 0→scrollRange
      const rawProgress = scrolled / scrollRange;
      const p = Math.max(0, Math.min(1, rawProgress));

      if (p !== progressRef.current) {
        progressRef.current = p;
        onProgress?.(p);

        // Drive strip transform directly for performance
        if (strip) {
          const parent = strip.parentElement;
          if (parent) {
            const maxTravel = strip.scrollWidth - parent.offsetWidth;
            strip.style.transform = `translateX(${-p * maxTravel}px)`;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to set initial state
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [onProgress, scrollRange]);

  return { wrapperRef, stripRef };
}