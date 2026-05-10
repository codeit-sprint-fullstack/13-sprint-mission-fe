import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import styles from "./ ItemsPage.module.css";

const pages = [1, 2, 3, 4, 5];

function ItemsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");

        if(!response.ok) {
          throw new Error("상품 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>판매 중인 상품</h1>

          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <img
                src="/img/main/ic_search.svg"
                className={styles.searchImg}
                alt="검색"
              />

              <input
                className={styles.searchInput}
                type="search"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>

            <Link to="/registration" className={styles.registerButton}>
              상품 등록하기
            </Link>

            <button type="button" className={styles.sortButton}>
              최신순
              <img src="/img/main/ic_arrow_down.svg" alt="" 
              className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        <div className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className={styles.pagination}>
          <button type="button" className={styles.pageButton}>
            ‹
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={
                page === 1
                  ? `${styles.pageButton} ${styles.activePage}`
                  : styles.pageButton
              }
            >
              {page}
            </button>
          ))}

          <button type="button" className={styles.pageButton}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default ItemsPage;
