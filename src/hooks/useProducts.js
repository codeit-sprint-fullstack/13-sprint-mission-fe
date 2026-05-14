import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

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

        const response = await fetch(`${API_URL}/products?${params}`, {
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

const PRODUCT_PAGE_SIZE = {
  mobile: { best: 1, list: 4 },
  tablet: { best: 2, list: 6 },
  desktop: { best: 4, list: 10 },
};

export function useProductPageSize() {
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQueries = [
      window.matchMedia("(max-width: 600px)"),
      window.matchMedia("(max-width: 1024px)"),
    ];
    const updatePageSize = () => setPageSize(getPageSize());

    mediaQueries.forEach((mediaQuery) => {
      mediaQuery.addEventListener("change", updatePageSize);
    });

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", updatePageSize);
      });
    };
  }, []);

  return pageSize;
}

function getPageSize() {
  if (typeof window === "undefined") {
    return PRODUCT_PAGE_SIZE.desktop;
  }

  if (window.matchMedia("(max-width: 600px)").matches) {
    return PRODUCT_PAGE_SIZE.mobile;
  }

  if (window.matchMedia("(max-width: 1024px)").matches) {
    return PRODUCT_PAGE_SIZE.tablet;
  }

  return PRODUCT_PAGE_SIZE.desktop;
}
