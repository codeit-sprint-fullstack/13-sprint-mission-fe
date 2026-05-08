import { useState, useEffect } from 'react';

function getPageSize() {
  const w = window.innerWidth;
  if (w < 768) return 4;   // Mobile: 2열 × 2행
  if (w < 1024) return 6;  // Tablet: 3열 × 2행
  return 10;               // Desktop: 5열 × 2행
}

export function usePageSize() {
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return pageSize;
}
