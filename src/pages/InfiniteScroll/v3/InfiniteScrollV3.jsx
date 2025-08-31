import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Drop this component anywhere in your app.
 * Requirements:
 * - TailwindCSS is assumed for styling.
 * - Framer Motion is optional (used for subtle fade/slide-in on items).
 */
export default function InfiniteScrollerV3() {
  const [items, setItems] = useState(() => Array.from({ length: 20 }, (_, i) => `Item #${i + 1}`));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // The scrollable container
  const scrollerRef = useRef(null);

  // Simulated API — replace with your real fetch
  const fetchMore = useCallback(async (nextPage) => {
    setLoading(true);

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 700));

    // Simulate finite pages; change 5 to Infinity for never-ending
    const MAX_PAGES = 5;
    if (nextPage > MAX_PAGES) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    const pageSize = 20;
    const start = nextPage * pageSize;
    const newItems = Array.from({ length: pageSize }, (_, i) => `Item #${start + i + 1}`);

    setItems((prev) => [...prev, ...newItems]);
    setPage(nextPage);
    setLoading(false);
  }, []);

  // rAF-throttled scroll handler for better perf than plain onScroll
  const tickingRef = useRef(false);
  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || loading || !hasMore) return;

    const nearBottomPx = 120; // how close to the bottom before we load more

    const check = () => {
      if (!el) return;
      const { scrollTop, clientHeight, scrollHeight } = el;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      if (distanceFromBottom <= nearBottomPx) {
        // trigger next page load
        fetchMore(page + 1);
      }
      tickingRef.current = false;
    };

    if (!tickingRef.current) {
      window.requestAnimationFrame(check);
      tickingRef.current = true;
    }
  }, [fetchMore, hasMore, loading, page]);

  // Attach scroll listener to the container (not window)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => handleScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    // Trigger once on mount in case content doesn't overflow initially
    handleScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll]);

  const Loader = useMemo(() => (
    <div className="w-full py-4 flex items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <span className="ml-2 text-sm text-muted-foreground">Loading…</span>
    </div>
  ), []);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Centered Infinite Scroller</h1>
          <p className="text-sm text-gray-500">Uses <code>scroll</code> event on a container.</p>
        </div>

        <div
          ref={scrollerRef}
          className="relative w-full h-[70vh] overflow-y-auto rounded-2xl bg-white shadow-sm border border-gray-200"
        >
          <ul className="divide-y divide-gray-100">
            {items.map((it, idx) => (
              <motion.li
                key={it}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.005, 0.15) }}
                className="p-4"
              >
                <div className="font-medium">{it}</div>
                <div className="text-sm text-gray-500">Some description for {it.toLowerCase()}…</div>
              </motion.li>
            ))}
          </ul>

          {loading && Loader}

          {!hasMore && (
            <div className="sticky bottom-0 w-full bg-white/80 backdrop-blur border-t border-gray-200">
              <div className="p-4 text-center text-sm text-gray-500">You’re all caught up ✨</div>
            </div>
          )}
        </div>

        <Tips />
      </div>
    </div>
  );
}

function Tips() {
  return (
    <div className="mt-4 text-xs text-gray-500 space-y-1">
      <p>
        • Replace the simulated <code>fetchMore</code> with your API call, then append results to <code>items</code> and update <code>hasMore</code>.
      </p>
      <p>
        • This listens to the container’s <code>scroll</code> event (not <code>window</code>), and uses <code>requestAnimationFrame</code> to throttle.
      </p>
      <p>
        • Adjust the <code>nearBottomPx</code> threshold to load earlier/later.
      </p>
      <p>
        • The container is centered via <code>min-h-screen</code> + <code>flex items-center justify-center</code> on the page wrapper.
      </p>
    </div>
  );
}
