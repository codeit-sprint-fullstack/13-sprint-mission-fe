import styles from "./MarketPage.module.css";
import ProductCard from "../components/ProductCard/ProductCard.jsx";
import { useState } from "react";
import useProducts from "../hooks/useProducts.js";
import { Link } from "react-router-dom";

function MarketPage() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const pageSize = 10;

  const {
    products,
    totalCount,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const totalPages = Math.ceil(totalCount / pageSize);

  const pageGroupSize = 5;
  const currentGroup = Math.ceil(page / pageGroupSize);

  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className={styles.page}>
      <main>
        <section className={styles.productSection}>
          <div className="container">
            <div className={styles.productInner}>
              <div className={styles.productsHeader}>
                <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
                <div className={styles.productControls}>
                  <div className={styles.searchBox}>
                    <div className={styles.searchInner}>
                      <svg
                        className={styles.searchIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z"
                          fill="#9CA3AF"
                        />
                      </svg>

                      <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="검색할 상품을 입력해주세요"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setKeyword(searchInput.trim());
                            setPage(1);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <Link to="/registration" className={styles.addButton}>
                    상품 등록하기
                  </Link>
                  <div className={styles.sortDropdown}>
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => setIsSortOpen((prev) => !prev)}
                    >
                      <span className={styles.sortText}>
                        {orderBy === "recent" ? "최신순" : "좋아요순"}
                      </span>
                      <span
                        className={styles.sortMobileIcon}
                        aria-hidden="true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15 6.5V17.5M15 17.5L11.5 14M15 17.5L18.5 14"
                            stroke="#1F2937"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          <path
                            d="M7.8999 15.5L9.4999 15.5"
                            stroke="#1F2937"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />

                          <path
                            d="M5 7.5H10"
                            stroke="#1F2937"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />

                          <path
                            d="M6.30005 11.5L9.50005 11.5"
                            stroke="#1F2937"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <svg
                        className={styles.sortIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286L17.9276 8.58286C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
                          fill="#1F2937"
                        />
                      </svg>
                    </button>
                    {isSortOpen && (
                      <ul className={styles.sortMenu}>
                        <li className={styles.sortItem}>
                          <button
                            type="button"
                            className={styles.sortOption}
                            onClick={() => {
                              setOrderBy("recent");
                              setPage(1);
                              setIsSortOpen(false);
                            }}
                          >
                            최신순
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              {isProductsLoading && <p>로딩 중 ..</p>}
              {productsError && <p>에러가 발생했습니다.</p>}
              {!isProductsLoading && !productsError && (
                <div className={styles.productGrid}>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
              <nav className={styles.pagination} aria-label="페이지네이션">
                <button
                  type="button"
                  className={styles.pageArrowButton}
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="19.5"
                      fill="white"
                      stroke="#E5E7EB"
                    />

                    <path
                      d="M22 14L16 20L22 26"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`${styles.pageButton} ${
                      page === pageNumber ? styles.pageButtonActive : ""
                    }`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  className={styles.pageArrowButton}
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="19.5"
                      fill="white"
                      stroke="#E5E7EB"
                    />

                    <path
                      d="M18 14L24 20L18 26"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MarketPage;
