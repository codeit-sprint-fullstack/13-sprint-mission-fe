import React, { useState, useEffect } from "react";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "../services/ProductService.js";
import "../index.css";
const ProductGrid = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // 1. 베스트 상품 가져오기 (좋아요순 2개)
  // 제공된 API 구조상 별도의 orderBy가 없다면 전체 목록에서 상위 항목 활용
  const loadBestProducts = async () => {
    const data = await getProductList(1, 2);
    if (data) setBestProducts(data.list || []);
  };

  // 2. 일반 상품 목록 가져오기 (검색어 포함)
  const loadProducts = async (page = 1, searchKeyword = "") => {
    const data = await getProductList(page, pageSize, searchKeyword);
    if (data) setProducts(data.list || []);
  };

  useEffect(() => {
    loadBestProducts();
    loadProducts(currentPage, keyword);
  }, [currentPage]);

  // 검색 실행
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 1페이지로 리셋
    loadProducts(1, keyword);
  };

  return (
    <div className="container">
      {/* 베스트 상품 섹션 */}
      <section className="section">
        <h2 className="section-title">베스트 상품</h2>
        <div className="product-grid best-grid">
          {bestProducts.map((item) => (
            <ProductCard key={item.id} item={item} isBest={true} />
          ))}
        </div>
      </section>

      {/* 판매 중인 상품 섹션 */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">판매 중인 상품</h2>
          <div className="controls">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
            <button className="upload-button">상품 등록하기</button>
            <select className="sort-select">
              <option>최신순</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
          &lt;
        </button>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={currentPage === num ? "active" : ""}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
        <button onClick={() => setCurrentPage((p) => p + 1)}>&gt;</button>
      </div>
    </div>
  );
};

// 상품 카드 컴포넌트
const ProductCard = ({ item, isBest }) => {
  return (
    <div className={`product-card ${isBest ? "best" : ""}`}>
      <div className="image-box">
        <img src={item.images?.[0] || "default-image.png"} alt={item.name} />
      </div>
      <div className="product-info">
        <p className="product-name">{item.name}</p>
        <p className="product-price">{item.price?.toLocaleString()}원</p>
        <div className="product-footer">
          <span className="likes">❤️ {item.favoriteCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// const SIZE = 10;
// const TOTAL_POSTS = 100;

// export default function ProductGrid() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   useEffect(() => {
//     async function load() {
//       const data = await fetch(``);
//       if (data) {
//         setProducts(data.list);
//         setTotalCount(data.totalCount);
//       }
//     }
//     load();
//   }, [currentPage]);
//   const TOTAL_PAGES = Math.ceil(totalCount / SIZE);
//   return (
//     <>
//       <div className="product-grid-container">
//         {/* 1. 상품 그리드 영역 */}
//         <div className="product-grid">
//           {products.map((product) => (
//             <div key={product.id} className="product-card">
//               <div className="thumb">
//                 {/* 이미지 배열의 첫 번째 요소를 사용 */}
//                 <img
//                   src={product.images[0] || product.image}
//                   alt={product.name}
//                 />
//               </div>
//               <div className="product-info">
//                 <div className="name">{product.name}</div>
//                 <div className="price">{product.price.toLocaleString()}원</div>
//                 <div className="likes">♡ {product.favoriteCount}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 2. 페이지네이션 (간단한 예시) */}
//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//             (pageNum) => (
//               <button
//                 key={pageNum}
//                 className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
//                 onClick={() => setCurrentPage(pageNum)}
//               >
//                 {pageNum}
//               </button>
//             ),
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// TestCheck.jsx

// import React from "react";

// const ProductGrid = () => {
//   return (
//     <div
//       style={{
//         backgroundColor: "yellow",
//         color: "black",
//         padding: "20px",
//         border: "5px solid red",
//         textAlign: "center",
//         fontSize: "24px",
//         fontWeight: "bold",
//         margin: "20px",
//       }}
//     >
//       ✅ 임포트 성공! 이 화면이 보이면 연결이 잘 된 것입니다.
//     </div>
//   );
// };
// export default ProductGrid;
