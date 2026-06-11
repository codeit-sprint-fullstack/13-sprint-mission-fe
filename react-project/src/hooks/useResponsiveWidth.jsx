import { useMediaQuery } from "react-responsive";

export default function useResponsiveWidth() {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const isTablet = useMediaQuery({ minWidth: 721, maxWidth: 1280 });
  const isDesktop = useMediaQuery({ minWidth: 1281 });

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}
