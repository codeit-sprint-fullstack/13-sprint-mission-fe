"use client";
import { useEffect, useState } from "react";

export default function useDebouncing(keyword, delay = 500) {
  const [debounced, setDebounced] = useState(keyword);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(keyword), delay);
    return () => clearTimeout(timer);
  }, [keyword, delay]);

  return debounced;
}
