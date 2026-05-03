import { useState, useEffect } from "react";

async function getBestProducts(pageSize = 4) {
  try {
    const res = await fetch(
      `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`,
    );
    if (!res.ok) throw new Error(`에러 발생: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getProducts(
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
) {
  try {
    const res = await fetch(
      `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`,
    );
    if (!res.ok) throw new Error(`에러 발생: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export default function useProducts() {
  const [bestProducts, setBestProducts] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 반응형
  const [pageSize, setPageSize] = useState(10);
  const [bestLimit, setBestLimit] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newPageSize = 10;
      let newBestLimit = 4;

      if (width <= 375) {
        newPageSize = 4;
        newBestLimit = 1;
      } else if (width <= 767) {
        newPageSize = 6;
        newBestLimit = 2;
      }

      setBestLimit(newBestLimit);
      setPageSize((prevSize) => {
        if (prevSize !== newPageSize) {
          setCurrentPage(1);
          return newPageSize;
        }
        return prevSize;
      });
    };

    handleResize(); //
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBest = async () => {
      const data = await getBestProducts(bestLimit);
      setBestProducts(data?.list || []);
    };
    fetchBest();
  }, [bestLimit]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts(currentPage, pageSize, keyword, orderBy);
      setProductsList(res?.list || []);
      setTotalCount(res?.totalCount || 0);
    };
    fetchProducts();
  }, [currentPage, pageSize, keyword, orderBy]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const currentGroup = Math.ceil(currentPage / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return {
    bestProducts,
    productsList,
    keyword,
    orderBy,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    setKeyword,
    setOrderBy,
    setCurrentPage,
  };
}
