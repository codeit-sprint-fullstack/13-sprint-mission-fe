"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export type ResponsiveWidth = "desktop" | "mobile" | "tablet";

export default function useResponsiveWidth(): ResponsiveWidth {
  const [mounted, setMounted] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: 720 });
  const isTablet = useMediaQuery({
    minWidth: 721,
    maxWidth: 1280,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return "desktop";

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}
