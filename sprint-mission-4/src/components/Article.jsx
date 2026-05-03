import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import "./Article.css";
import heart from "../assets/ic_heart.svg";
import search from "../assets/ic_search.svg";
import arrowLeft from "../assets/arrow_left.svg";
import arrowRight from "../assets/arrow_right.svg";

// page, pageSize, orderBy = "favortie"
// 상품 베스트 4개 뽑는 용
async function getBestProducts(pageSize = 4) {
  try {
    const res = await fetch(
      `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`,
    );
    if (!res.ok) throw new Error(`에러 발생: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error.message);
  }
}

// 상품 정렬, 검색용
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
  }
}

export default function Article() {
  const [BestProducts, setBest] = useState([]);
  const [productsList, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  // 반응형
  const [pageSize, setPageSize] = useState(10);
  const [bestLimit, setBestLimit] = useState(4);

  // 반응형
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

    const fetchData = async () => {
      const data = await getBestProducts(bestLimit);
      setBest(data?.list || []);
    };

    fetchData();

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [bestLimit]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getBestProducts(bestLimit);
  //     setBest(data?.list || []);
  //   };

  //   fetchData();
  // }, [bestLimit]); 왠진 모르겠지... 만 .. 이걸 안에 넣으니 되네..?

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts(currentPage, pageSize, keyword, orderBy);

      setProducts(res?.list || []);
      setTotalCount(res?.totalCount || 0);
    };

    fetchProducts();
  }, [currentPage, pageSize, keyword, orderBy]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const currentGroup = Math.ceil(currentPage / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <>
      <div className="container">
        <div className="best-container">
          <div className="left">
            <h2>베스트 상품</h2>
          </div>
          <div className="best-products-container">
            {BestProducts.map((el) => (
              <div key={el.id} className="card">
                <img src={el.images[0]} alt={el.name} />
                <p className="name">{el.name}</p>
                <p className="price">{el.price}원</p>
                <div className="favorite-container">
                  <img src={heart} alt="favorite" className="heart" />
                  <span className="favorite-text">{el.favoriteCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="selling-product-bar">
          <h2>판매중인 상품</h2>
          <div className="right">
            <div className="search-box-container">
              <div className="search-box">
                <img src={search} alt="검색" />
                <input
                  type="text"
                  placeholder="검색어 입력"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
            <button
              // onClick={() => navigate("/add-product")}
              className="register-btn"
            >
              상품 등록하기
            </button>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="recent">최신순</option>
              <option value="favorite">인기순</option>
            </select>
          </div>
        </div>
        <div className="selling-container">
          {productsList.map((el) => (
            <div key={el.id} className="card">
              <img src={el.images[0]} alt={el.name} />
              <p className="name">{el.name}</p>
              <p className="price">{el.price}원</p>
              <div className="favorite-container">
                <img src={heart} alt="favorite" className="heart" />
                <span className="favorite-text">{el.favoriteCount}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pages">
          <button
            disabled={startPage === 1}
            onClick={() => setCurrentPage(startPage - 1)}
            className="page"
          >
            <img src={arrowLeft} />
          </button>

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => i + startPage,
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page ${page === currentPage ? "active" : ""}`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={endPage === totalPages}
            onClick={() => setCurrentPage(endPage + 1)}
            className="page"
          >
            <img src={arrowRight} />
          </button>
        </div>
      </div>
    </>
  );
}
