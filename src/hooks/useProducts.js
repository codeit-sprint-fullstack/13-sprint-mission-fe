import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useProducts({ page, pageSize, orderBy, keyword = "" }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          orderBy,
        });

        if (keyword.trim()) {
          params.set("keyword", keyword.trim());
        }

        const response = await fetch(`${BASE_URL}/products?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`error! status ${response.status}`);
        }

        const data = await response.json();

        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();

    return () => controller.abort();
  }, [page, pageSize, orderBy, keyword]);
  return { products, totalCount, isLoading, error };
}

export default useProducts;
