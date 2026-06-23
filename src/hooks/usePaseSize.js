"use client";

import { useMediaQuery } from "react-responsive";

import { useState, useEffect } from "react";

/**
 * 화면 크기(Desktop, Tablet, Mobile)에 따라 적절한 페이지당 아이템 개수(pageSize)를 반환하는 훅
 */
export default function usePageSize(sizeType = "md", option) {
  const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 여부를 추적

  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 744, maxWidth: 1190 });

  // 브라우저 환경(Mount)이 되면 상태를 true로 변경
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const config = option[sizeType] || option.md;

  // 서버 렌더링 단계이거나 마운트 전에 Hydration 일치
  if (!isMounted) {
    return config.mobile;
  }

  // 마운트 이후
  if (isDesktop) return config.desktop;
  if (isTablet) return config.tablet;
  return config.mobile;
}
