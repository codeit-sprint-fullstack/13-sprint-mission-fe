import React from "react";
import useProducts from "../hooks/useProducts";

import "./Article.css";
import heart from "../assets/ic_heart.svg";
import search from "../assets/ic_search.svg";
import arrowLeft from "../assets/arrow_left.svg";
import arrowRight from "../assets/arrow_right.svg";

export default function Article() {
  const {
    bestProducts,
    productsList,
    keyword,
    orderBy,
    currentPage,
    // pageSize,
    totalPages,
    startPage,
    endPage,
    setKeyword,
    setOrderBy,
    setCurrentPage,
  } = useProducts();

  return (
    <div className="container">
      <div className="best-container">
        <div className="left">
          <h2>베스트 상품</h2>
        </div>
        <div className="best-products-container">
          {bestProducts.map((el) => (
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
          <button className="register-btn">상품 등록하기</button>
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
          <img src={arrowLeft} alt="이전" />
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
          disabled={endPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(endPage + 1)}
          className="page"
        >
          <img src={arrowRight} alt="다음" />
        </button>
      </div>
    </div>
  );
}
