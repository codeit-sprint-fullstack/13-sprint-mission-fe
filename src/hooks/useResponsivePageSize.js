import { useEffect, useState } from "react";

function getPageSize() {
  if (window.innerWidth >= 1200) return 10;
  if (window.innerWidth >= 744) return 9;
  return 10;
}

export default function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
}
