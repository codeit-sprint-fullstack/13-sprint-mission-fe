"use client";
// hooks/usePageSize.js
import { useState, useEffect } from "react";

// 너의 Tailwind 브레이크포인트(tablet/pc)에 맞춰 조정
const QUERIES = {
  pc: "(min-width: 1280px)",
  tablet: "(min-width: 768px)",
};

function getPageSize() {
  // 서버 렌더 시점엔 window가 없음 → 기본값(SSR 안전)
  if (typeof window === "undefined") return 4;

  if (window.matchMedia(QUERIES.pc).matches) return 10; // PC: 4열 → 16개
  if (window.matchMedia(QUERIES.tablet).matches) return 6; // 태블릿: 2열 → 6개
  return 4; // 모바일: 1열 → 4개
}

export function usePageSize() {
  // 첫 렌더는 SSR과 동일하게 기본값으로 시작(하이드레이션 불일치 방지)
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    // 마운트 직후 실제 뷰포트 기준으로 한 번 보정
    setPageSize(getPageSize());

    const update = () => setPageSize(getPageSize());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return pageSize;
}
