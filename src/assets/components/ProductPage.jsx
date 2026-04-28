import { useState, useEffect } from "react";
import "../css/ProductPage.css";

export default function ProductPage() {
  const [bestProducts, setBestProduct] = useState([]);
  const [stockProducts, setStockProduct] = useState([]);
  const [orderBy, setOrderBy] = useState("recent"); // 기본은 최신순
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0); // 전체 상품 개수
  // 판매 중인 상품 (페이지네이션 + 정렬)
  useEffect(() => {
    fetch(
      `https://panda-market-api.vercel.app/products?page=${page}&pageSize=10&orderBy=${orderBy}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setStockProduct(data.list);
        setTotalCount(data.totalCount);
      })
      .catch((err) => console.error("데이터를 불러올 수 없습니다.", err));
  }, [page, orderBy]);

  const totalPages = Math.ceil(totalCount / 10);

  // 베스트 상품
  useEffect(() => {
    fetch(
      "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite",
    )
      .then((res) => res.json())
      .then((data) => setBestProduct(data.list))
      .catch((err) => console.error("API 에러:", err));
  }, []);

  // 페이지네이션 그룹 계산 (5개씩)
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

      {/* 판매 중인 상품 */}
      <section className="stockproduct-list">
        <div className="best-nav">
          <h2 className="stockproduct-title">판매 중인 상품</h2>
          <div className="product-feature">
            {/* 검색 및 정렬 */}
            <label htmlFor="stock-search">
              <input
                type="search"
                className="stock-search"
                placeholder="🔎검색할 상품을 입력해주세요"
              />{" "}
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
              <option value="recent" className="recent">
                최신 순
              </option>
              <option value="favorite" className="favorite">
                좋아요 순
              </option>
            </select>
          </div>
        </div>

        <ul className="stockproduct-grid">
          {stockProducts.map((stockproduct) => (
            <li className="stock-feed" key={stockproduct.id}>
              <img
                src={
                  stockproduct.images && stockproduct.images.length > 0
                    ? stockproduct.images[0]
                    : "/placeholder.png"
                }
                alt="판매 중인 상품 이미지"
                className="stock-image"
                onError={(e) => (e.target.src = "/public/warning.png")}
              />
              <div className="stock-contents-box">
                <p className="stock-name">{stockproduct.name}</p>
                <p className="stock-price">{stockproduct.price}원</p>

                <p className="stock-favorite-count">
                  ♡ {stockproduct.favoriteCount}
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
