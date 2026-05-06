import { useEffect, useState } from "react";

const PRODUCT_API_URL = "https://panda-market-api.vercel.app/products";

export function useProducts({
  page,
  pageSize,
  orderBy = "recent",
  keyword = "",
}) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      orderBy,
    });
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword) {
      params.set("keyword", trimmedKeyword);
    }

    async function getProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${PRODUCT_API_URL}?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("상품 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();
        setProducts(data.list ?? []);
        setTotalCount(data.totalCount ?? 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getProducts();

    return () => controller.abort();
  }, [page, pageSize, orderBy, keyword]);

  return { products, totalCount, isLoading, error };
}

export function useProductPageSize() {
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
}

function getPageSize() {
  if (typeof window === "undefined") {
    return { best: 4, list: 10 };
  }

  if (window.innerWidth <= 600) {
    return { best: 1, list: 4 };
  }

  if (window.innerWidth <= 1024) {
    return { best: 2, list: 6 };
  }

  return { best: 4, list: 10 };
}
