"use client";

import { useRef, useCallback } from "react";

export function useDebounce(fn, delay) {
  const timer = useRef(null);

  return useCallback(
    (...args) => {
      if (timer.current) clearTimeout(timer.current);
      
      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
}
