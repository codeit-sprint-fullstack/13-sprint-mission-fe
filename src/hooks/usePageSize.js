import { useMediaQuery } from "react-responsive";

import { PAGE_SIZE_CONFIG } from "@/constants/constants";

/**
 * 화면 크기(Desktop, Tablet, Mobile)에 따라 적절한 페이지당 아이템 개수(pageSize)를 반환하는 훅
 * @param {string} sizeType - 적용할 페이지 사이즈 설정의 키 (예: 'md', 'lg') (기본값: 'md')
 * @returns {number} 현재 브라우저 너비에 해당하는 pageSize 숫자
 * @example
 * const pageSize = usePageSize("md"); // 데스크탑일 경우 10, 모바일일 경우 4 반환 (설정값에 따라 다름)
 */
export default function usePageSize(sizeType = "md") {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  // 설정 파일에서 해당 타입을 가져오되, 없을 경우 기본값(md) 사용
  const config = PAGE_SIZE_CONFIG[sizeType] || PAGE_SIZE_CONFIG.md;

  if (isDesktop) return config.desktop;
  if (isTablet) return config.tablet;
  return config.mobile;
}
