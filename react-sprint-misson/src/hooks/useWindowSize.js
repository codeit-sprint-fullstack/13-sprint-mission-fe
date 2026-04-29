import { useState, useEffect } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(document.documentElement.clientWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const type = width <= 375 ? "mobile" : width <= 744 ? "tablet" : "pc";

  return { width, type };
}
