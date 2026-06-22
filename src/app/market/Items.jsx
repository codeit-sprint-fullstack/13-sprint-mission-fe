import React from "react";
import { NavLink, useNavigate } from "react-router";
import useProducts from "../hooks/useProducts";

import "./Items.css";
import heart from "../assets/icons/ic_heart.svg";
import search from "../assets/icons/ic_search.svg";
import arrowLeft from "../assets/icons/arrow_left.svg";
import arrowRight from "../assets/icons/arrow_right.svg";
import nullImg from "../assets/images/null_img.svg";

export default function Items() {
  const {
    // bestProducts,
    productsList,
    keyword,
    sort,
    // offset,
    // limit,
    totalPages,
    startPage,
    endPage,
    currentPage,
    changePage,
    setKeyword,
    setSort,
    // setOffset,
  } = useProducts();
  const navigate = useNavigate();
  console.log("productsList:", productsList); // 데이터가 들어있나요?
  return (
    <div className="container">
      {/* <div className="best-container">
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
      </div> */}

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
          <NavLink to="/registration">
            <button
              className="register-btn"
              onClick={() => navigate("/registration")}
            >
              상품 등록하기
            </button>
          </NavLink>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
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
            <img src={nullImg} alt={el.name} />
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
          onClick={() => changePage(startPage - 1)}
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
            onClick={() => changePage(page)}
            className={`page ${page === currentPage ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={endPage === totalPages || totalPages === 0}
          onClick={() => changePage(endPage + 1)}
          className="page"
        >
          <img src={arrowRight} alt="다음" />
        </button>
      </div>
    </div>
  );
}
