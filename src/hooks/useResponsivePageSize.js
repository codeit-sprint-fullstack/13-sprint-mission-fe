import { useEffect, useState } from "react";

const DESKTOP_QUERY = "(min-width: 1200px)";
const TABLET_QUERY = "(min-width: 744px)";

function getPageSize() {
  if (window.matchMedia(DESKTOP_QUERY).matches) return 10; // Desktop: 5x2
  if (window.matchMedia(TABLET_QUERY).matches) return 6; // Tablet: 3x2
  return 4; // Mobile: 2x2
}

export default function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    // 두 개의 MediaQueryList 객채. 각자 매핑 상태를 추적.
    const desktopMql = window.matchMedia(DESKTOP_QUERY);
    const tableMql = window.matchMedia(TABLET_QUERY);

    // 어느 한쪽 브레이크포인트를 넘나들 때 호출됨.
    // (예: 1200px -> 1199px로 줄였을 때 desktopMql의 change 발동)
    function handleChange() {
      setPageSize(getPageSize());
    }

    desktopMql.addEventListener("change", handleChange);
    tableMql.addEventListener("change", handleChange);

    return () => {
      desktopMql.removeEventListener("change", handleChange);
      tableMql.removeEventListener("change", handleChange);
    };
  }, []); // 빈 배열: 마운트 시 한 번만 등록

  return pageSize;
}
