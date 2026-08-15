"use client";

import { useRef, useCallback } from "react";

export function useDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Args) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
}
