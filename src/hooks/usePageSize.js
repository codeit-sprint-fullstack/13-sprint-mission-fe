import { useMediaQuery } from "react-responsive";
import { PAGE_SIZE } from "../constants/product";
import { BREAKPOINTS } from "../constants/common";

function usePageSize(type = "best") {
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.DESKTOP_MIN });
  const isTablet = useMediaQuery({ minWidth: BREAKPOINTS.TABLET_MIN });
  const sizes = PAGE_SIZE[type];

  if (isDesktop) return sizes.desktop;
  if (isTablet) return sizes.tablet;

  return sizes.mobile;
}

export default usePageSize;
