import { useMediaQuery } from "react-responsive";

function usePageSize(type = "best") {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768 });

  if (type === "best") {
    if (isDesktop) return 4;
    if (isTablet) return 2;
    return 1;
  }

  if (type === "forSale") {
    if (isDesktop) return 10;
    if (isTablet) return 6;
    return 4;
  }
}

export default usePageSize;
