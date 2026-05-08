import { useEffect, useState } from "react";

export default function useProducts(
  currentPage,
  totalPages,
  size,
  orderBy,
  searchText,
) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://one3-sprint-mission-be.onrender.com/products?page=${currentPage}&pageSize=${size}&orderBy=${orderBy}&keyword=${searchText}`,
        );

        if (!res.ok) {
          throw new Error("데이터 로딩 실패");
        }

        const result = await res.json();
        setProducts(result.list);
        setTotalPages(Math.ceil(result.totalCount / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage, searchText, orderBy]);

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    size,
    orderBy,
    searchText,
  };
}
