import React, { useState, useEffect } from "react";
import "./style/ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [orderBy, setOrderBy] = useState("recent");

  const pageSize = 10;
  const pageGroupSize = 5;

  // API에서 데이터 가져오기
  const fetchProducts = async (page, sortOrder) => {
    try {
      const response = await fetch(
        `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${sortOrder}`,
      );
      const data = await response.json();

      setProducts(data.list || []);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, orderBy);
  }, [currentPage, orderBy]);

  const handleSortChange = (e) => {
    const newOrder = e.target.value;
    if (orderBy !== newOrder) {
      setOrderBy(newOrder);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (e, newPage) => {
    e.preventDefault();
    setCurrentPage(newPage);
  };

  const totalPage = Math.ceil(totalCount / pageSize);
  const pageGroup = Math.ceil(currentPage / pageGroupSize);

  let last = pageGroup * pageGroupSize;
  if (last > totalPage) last = totalPage;

  let first = (pageGroup - 1) * pageGroupSize + 1;
  if (first <= 0) first = 1;

  const nextGroupPage = last + 1;
  const prevGroupPage = first - 1;

  const pageNumbers = [];
  for (let i = first; i <= last; i++) {
    pageNumbers.push(i);
  }

  const showPagination = totalCount > pageSize;

  const bestProducts = Array(4).fill({
    id: 1,
    image: "https://picsum.photos/200",
    title: "아이패드 미니 팝니다",
    price: 50000,
    likes: 120,
  });

  return (
    <div className="market-container">
      <section className="section">
        <h2 className="section-title">베스트 상품</h2>
        <div className="grid-container best-grid">
          {bestProducts.map((item, idx) => (
            <ProductCard key={`best-${idx}`} item={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="product-control-bar">
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            판매 중인 상품
          </h2>

          <div className="control-actions">
            <div className="search-wrapper">
              <span className="search-icon">🔍️</span>

              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                className="search-input"
              />
            </div>
            <button className="btn-register">상품 등록하기</button>

            <select
              className="sort-select"
              value={orderBy}
              onChange={handleSortChange}
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px" }}>
            데이터를 불러오는 중이거나 상품이 없습니다.
          </p>
        ) : (
          <div className="grid-container all-grid">
            {products.map((item) => (
              <ProductCard key={`all-${item.id}`} item={item} />
            ))}
          </div>
        )}

        {showPagination && (
          <ul
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              listStyle: "none",
              marginTop: "50px",
              padding: 0,
            }}
          >
            {prevGroupPage > 0 && (
              <>
                <li>
                  <a
                    href="#js-bottom"
                    onClick={(e) => handlePageChange(e, 1)}
                    style={pageLinkStyle}
                  >
                    &lt;&lt;
                  </a>
                </li>
                <li>
                  <a
                    href="#js-bottom"
                    onClick={(e) => handlePageChange(e, prevGroupPage)}
                    style={pageLinkStyle}
                  >
                    &lt;
                  </a>
                </li>
              </>
            )}

            {pageNumbers.map((num) => (
              <li key={num}>
                <a
                  href="#js-bottom"
                  onClick={(e) => handlePageChange(e, num)}
                  style={{
                    ...pageLinkStyle,
                    fontWeight: currentPage === num ? "bold" : "normal",
                    color: currentPage === num ? "#3b82f6" : "#333",
                    textDecoration: currentPage === num ? "underline" : "none",
                  }}
                >
                  {num}
                </a>
              </li>
            ))}

            {last < totalPage && (
              <>
                <li>
                  <a
                    href="#js-bottom"
                    onClick={(e) => handlePageChange(e, nextGroupPage)}
                    style={pageLinkStyle}
                  >
                    &gt;
                  </a>
                </li>
                <li>
                  <a
                    href="#js-bottom"
                    onClick={(e) => handlePageChange(e, totalPage)}
                    style={pageLinkStyle}
                  >
                    &gt;&gt;
                  </a>
                </li>
              </>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}

function ProductCard({ item }) {
  const imageSrc =
    item.images?.[0] || item.image || "https://picsum.photos/200";
  const title = item.name || item.title || "상품명 없음";
  const likes =
    item.favoriteCount !== undefined ? item.favoriteCount : item.likes || 0;

  const price =
    typeof item.price === "number"
      ? `${item.price.toLocaleString()}원`
      : item.price || "가격 정보 없음";

  return (
    <div className="product-card">
      <div className="card-image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="card-bottom-info">
        <h3 className="item-title">{title}</h3>
        <p className="item-price">{price}</p>
        <div className="item-meta">
          <span>❤️ {likes}</span>
        </div>
      </div>
    </div>
  );
}

const pageLinkStyle = {
  textDecoration: "none",
  color: "#333",
  cursor: "pointer",
  fontSize: "1.1rem",
};

export default ProductList;
