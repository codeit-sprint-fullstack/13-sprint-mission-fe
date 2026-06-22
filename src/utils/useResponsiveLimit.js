"use client";

import useMounted from "@/utils/useMounted.js";
import { useMediaQuery } from "react-responsive";

export default function useResponsiveLimit({ mobile, md, lg }) {
  const mounted = useMounted();

  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });

  if (!mounted) return null;

  if (isLg) return lg;
  if (isMd) return md;

  return mobile;
}
