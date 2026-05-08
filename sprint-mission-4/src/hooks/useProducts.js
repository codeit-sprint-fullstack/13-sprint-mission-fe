import { useState, useEffect } from "react";

// async function getBestProducts(pageSize = 4) {
//   try {
//     const res = await fetch(
//       `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`,
//     );
//     if (!res.ok) throw new Error(`에러 발생: ${res.status}`);
//     return await res.json();
//   } catch (error) {
//     console.error(error.message);
//     return null;
//   }
// }

async function getProducts(
  offset = 0,
  limit = 10,
  keyword = "",
  sort = "recent",
) {
  try {
    // const res = await fetch(
    //   `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`,
    // );
    // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    // const params = new URLSearchParams();
    // if (keyword) params.append("keyword", keyword);
    // params.append("offset", offset);
    // params.append("limit", limit);
    // params.append("sort", sort);

    // const res = await fetch(`${API_URL}/product?${params}`);
    const res = await fetch(
      `http://localhost:3000/product?keyword=${keyword}&offset=${offset}&limit=${limit}&sort=${sort}`,
    );

    if (!res.ok) throw new Error(`에러 발생: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export default function useProducts() {
  // const [bestProducts, setBestProducts] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("recent");

  // const [currentOffset, setCurrentOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // const [bestLimit, setBestLimit] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newLimit = 10;
      // let newBestLimit = 4;
      if (width <= 375) {
        newLimit = 4;
        // newBestLimit = 1;
      } else if (width <= 767) {
        newLimit = 6;
        // newBestLimit = 2;
      }
      // setBestLimit(newBestLimit);
      setLimit(newLimit);
      setOffset(0); //?
      // setLimit((preLimit) => {
      //   if (preLimit !== newLimit) {
      //     setCurrentOffset(0);
      //     return newLimit;
      //   }
      //   return preLimit;
      // });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const fetchBest = async () => {
  //     const data = await getBestProducts(bestLimit);
  //     setBestProducts(data?.list || []);
  //   };
  //   fetchBest();
  // }, [bestLimit]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts(offset, limit, keyword, sort); // offset?
      setProductsList(res?.data || []);
      setTotalCount(res?.pagination?.total || 0);
    };
    fetchProducts();
  }, [offset, limit, keyword, sort]);
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);
  const currentGroup = Math.ceil(currentPage / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const changePage = (pageNumber) => {
    const newOffset = (pageNumber - 1) * limit;
    setOffset(newOffset);
  };

  return {
    // bestProducts,
    productsList,
    keyword,
    sort,
    // offset,
    // currentOffset,
    // limit,
    totalPages,
    startPage,
    endPage,
    currentPage,
    changePage,
    setKeyword,
    setSort,
    // setCurrentOffset,
    // setOffset,
  };
}
