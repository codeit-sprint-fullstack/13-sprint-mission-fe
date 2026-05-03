import { useState, useEffect } from "react";
import "../css/ProductPage.css";

export default function ProductPage() {
  const [bestProducts, setBestProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // 전체 상품
  const [orderBy, setOrderBy] = useState("recent");
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [page, setPage] = useState(1); // 현재 페이지
  const pageSize = 10;

  // 전체 상품 불러오기
  useEffect(() => {
    fetch(
      `https://panda-market-api.vercel.app/products?page=1&pageSize=9999&orderBy=${orderBy}`,
    )
      .then((res) => res.json())
      .then((data) => setAllProducts(data.list))
      .catch((err) => console.error("전체 상품 불러오기 실패", err));
  }, [orderBy]);

  // 베스트 상품
  useEffect(() => {
    fetch(
      "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite",
    )
      .then((res) => res.json())
      .then((data) => setBestProduct(data.list))
      .catch((err) => console.error("API 에러:", err));
  }, []);

  // 검색어로 필터링된 상품 리스트
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 페이지네이션 계산
  const totalCount = filteredProducts.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const getPageGroup = () => {
    const start = Math.floor((page - 1) / 5) * 5 + 1;
    const end = Math.min(start + 4, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <main>
      {/* 베스트 상품 */}
      <section className="bestproduct-list">
        <h1 className="bestproduct-title">베스트 상품</h1>
        <ul className="bestproduct-grid">
          {bestProducts.map((bestproduct) => (
            <li className="best-feed" key={bestproduct.id}>
              <img
                src={
                  bestproduct.images && bestproduct.images.length > 0
                    ? bestproduct.images[0]
                    : "/placeholder.png"
                }
                alt="베스트상품 이미지"
                className="best-image"
              />
              <div className="contents-box">
                <p className="best-name">{bestproduct.name}</p>
                <p className="best-price">{bestproduct.price}원</p>
                <p className="best-favorite-count">
                  ♡ {bestproduct.favoriteCount}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 전체 상품 검색 + 페이지네이션 */}
      <section className="stockproduct-list">
        <div className="best-nav">
          <h2 className="stockproduct-title">판매 중인 상품</h2>
          <div className="product-feature">
            <label htmlFor="stock-search">
              <input
                type="search"
                className="stock-search"
                placeholder="🔎검색할 상품을 입력해주세요"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1); // 검색 시 첫 페이지로 이동
                }}
              />
            </label>
            <button className="product-register">상품 등록하기</button>
            <select
              className="product-sort"
              value={orderBy}
              onChange={(e) => {
                setOrderBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="recent">최신 순</option>
              <option value="favorite">좋아요 순</option>
            </select>
          </div>
        </div>

        <ul className="stockproduct-grid">
          {paginatedProducts.map((product) => (
            <li className="stock-feed" key={product.id}>
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "/placeholder.png"
                }
                alt="상품 이미지"
                className="stock-image"
                onError={(e) => (e.target.src = "/public/warning.png")}
              />
              <div className="stock-contents-box">
                <p className="stock-name">{product.name}</p>
                <p className="stock-price">{product.price}원</p>
                <p className="stock-favorite-count">
                  ♡ {product.favoriteCount}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            &lt;
          </button>
          {getPageGroup().map((p) => (
            <button
              key={p}
              className={page === p ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </section>
    </main>
  );
}
