import { useEffect, useState } from "react";

const PRODUCT_API_URL = "https://backend-deploy-d1um.onrender.com/";

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
        const filteredProducts = filterProducts(data.list ?? [], trimmedKeyword);
        const sortedProducts = sortProducts(filteredProducts, orderBy);
        const pagedProducts = paginateProducts(sortedProducts, page, pageSize);

        setProducts(pagedProducts);
        setTotalCount(sortedProducts.length);
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

function filterProducts(products, keyword) {
  if (!keyword) {
    return products;
  }

  const lowerKeyword = keyword.toLowerCase();

  return products.filter((product) => {
    const tags = product.tags ?? [];

    return (
      product.name?.toLowerCase().includes(lowerKeyword) ||
      product.description?.toLowerCase().includes(lowerKeyword) ||
      tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
    );
  });
}

function sortProducts(products, orderBy) {
  const sortedProducts = [...products];

  if (orderBy === "favorite") {
    return sortedProducts.sort(
      (a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0),
    );
  }

  return sortedProducts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}

function paginateProducts(products, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return products.slice(start, end);
}
