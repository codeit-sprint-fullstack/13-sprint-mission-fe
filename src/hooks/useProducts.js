import { useEffect, useState } from "react";

const BASE_URL = "https://panda-market-api.vercel.app";

function useProducts({ page, pageSize, orderBy, keyword = "" }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
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

        const response = await fetch(`${BASE_URL}/products?${params}`);

        if (!response.ok) {
          throw new Error(`error! status ${response.status}`);
        }

        const data = await response.json();

        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [page, pageSize, orderBy, keyword]);
  return { products, totalCount, isLoading, error };
}

export default useProducts;
