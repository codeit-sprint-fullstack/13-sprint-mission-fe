import { useState } from "react";
import { useProductPageSize, useProducts } from "../../hooks/useProducts";
import "../css/ProductPage.css";

const PAGE_GROUP_SIZE = 5;

export default function ProductPage() {
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = useProductPageSize();
  const {
    products,
    totalCount,
    isLoading: isProductLoading,
    error: productError,
  } = useProducts({
    page,
    pageSize: pageSize.list,
    orderBy,
    keyword,
  });
  const {
    products: bestProducts,
    isLoading: isBestProductLoading,
    error: bestProductError,
  } = useProducts({
    page: 1,
    pageSize: pageSize.best,
    orderBy: "favorite",
  });

  const totalPages = Math.ceil(totalCount / pageSize.list);

  const getPageGroup = () => {
    const start = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const end = Math.min(start + PAGE_GROUP_SIZE - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
    setPage(1);
  };

  const hasNoProducts =
    !isProductLoading && !productError && products.length === 0;

  return (
    <main className="market-page">
      <section className="bestproduct-list">
        <h1 className="bestproduct-title">베스트 상품</h1>
        <ul className="bestproduct-grid">
          {isBestProductLoading && (
            <li className="empty-message">불러오는 중...</li>
          )}
          {bestProductError && (
            <li className="empty-message">상품을 불러오지 못했습니다.</li>
          )}
          {bestProducts.map((bestproduct) => (
            <li className="best-feed" key={bestproduct.id}>
              <img
                src={
                  bestproduct.images && bestproduct.images.length > 0
                    ? bestproduct.images[0]
                    : "/warning.png"
                }
                alt="베스트상품 이미지"
                className="best-image"
              />
              <div className="contents-box">
                <p className="best-name">{bestproduct.name}</p>
                <p className="best-price">
                  {bestproduct.price.toLocaleString()}원
                </p>
                <p className="best-favorite-count">
                  ♡ {bestproduct.favoriteCount}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="stockproduct-list">
        <div className="best-nav">
          <h2 className="stockproduct-title">판매 중인 상품</h2>
          <div className="product-feature">
            <label htmlFor="stock-search">
              <input
                id="stock-search"
                type="search"
                className="stock-search"
                placeholder="🔎검색할 상품을 입력해주세요"
                value={keyword}
                onChange={handleKeywordChange}
              />
            </label>
            <button className="product-register">상품 등록하기</button>
            <select
              className="product-sort"
              value={orderBy}
              onChange={handleOrderChange}
            >
              <option value="recent">최신 순</option>
              <option value="favorite">좋아요 순</option>
            </select>
          </div>
        </div>

        <ul className="stockproduct-grid">
          {isProductLoading && (
            <li className="empty-message">불러오는 중...</li>
          )}
          {productError && (
            <li className="empty-message">상품을 불러오지 못했습니다.</li>
          )}
          {hasNoProducts && (
            <li className="empty-message">검색 결과가 없습니다.</li>
          )}
          {products.map((product) => (
            <li className="stock-feed" key={product.id}>
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "/warning.png"
                }
                alt="상품 이미지"
                className="stock-image"
                onError={(e) => (e.target.src = "/warning.png")}
              />
              <div className="stock-contents-box">
                <p className="stock-name">{product.name}</p>
                <p className="stock-price">
                  {product.price.toLocaleString()}원
                </p>
                <p className="stock-favorite-count">
                  ♡ {product.favoriteCount}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {totalPages > 0 && (
          <div className="pagination">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
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
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
