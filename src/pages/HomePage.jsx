import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import styles from "../style/HomePage.module.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://sprint-mission-5.onrender.com/products",
          // "http://localhost:3000/products",
        );

        const data = await response.json();

        // setProducts(data.list);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    getProducts();
  }, []);

  // 베스트 상품 4개
  // const bestProducts = products.slice(0, 4); // 베스트 상품 주석처리

  // 검색
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // 정렬
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "favorite") {
      return b.favoriteCount - a.favoriteCount;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE); // 현재 상품까지 나오게
  // const totalPages = 5; // 5페이지 까지 나오게
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <main className={styles.container}>
      {/* 베스트 상품
      <section className={styles.section}>
        <h2>베스트 상품</h2>

        <div className={styles.bestGrid}>
          {bestProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </section> */}

      {/* 판매 상품 */}
      <section className={styles.section}>
        <div className={styles.topBar}>
          <h2>판매 중인 상품</h2>

          <div className={styles.rightControls}>
            {/* 검색 */}
            <input
              className={styles.searchInput}
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* 등록 버튼 */}
            <Link to="/registration">
              <button className={styles.addButton}>상품 등록하기</button>
            </Link>

            {/* 정렬 */}
            <select
              className={styles.select}
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="recent">최신순</option>

              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>

        {/* 상품 리스트 */}
        <div className={styles.productGrid}>
          {currentProducts.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? styles.activePage : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
