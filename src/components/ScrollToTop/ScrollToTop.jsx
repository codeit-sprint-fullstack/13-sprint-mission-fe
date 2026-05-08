import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NO_SCROLL_PATHS = ["/community"];

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!NO_SCROLL_PATHS.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}
