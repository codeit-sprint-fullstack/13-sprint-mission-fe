import { useEffect, useState } from "react";
import ItemCard from "./Card";
import styles from "../../css/ItemListGeneral.module.css";
import SectionTitle from "../SectionTitle";
import ListSearch from "./Search";
import Button from "../Button/Default";
import Dropdown from "../Dropdown";
import arrowLeft from "../../assets/icon/arrow-left.svg";
import arrowRight from "../../assets/icon/arrow-right.svg";

export default function ItemListGeneral() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;
  const paginationLimit = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(1, currentPage - 2) - 1;
  const [orderBy, setOrderBy] = useState("recent");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?page=${currentPage}&pageSize=${size}&orderBy=${orderBy}&keyword=${searchText}`,
        );
        const data = await response.json();
        setProducts(data.list);
        setTotalPages(Math.ceil(data.totalCount / 10));
      } catch (error) {
        console.error("error:", error);
      }
    }
    getProducts();
  }, [currentPage, searchText, orderBy]);

  return (
    <div className={styles.wrapper}>
      <SectionTitle title="판매 중인 상품">
        <ListSearch onSearch={(value) => setSearchText(value)} />
        <Button size={"small-40"}>상품 등록하기</Button>
        <Dropdown onList={(value) => setOrderBy(value)} />
      </SectionTitle>
      <div className={styles.list}>
        {products.map((product) => (
          <ItemCard
            key={product.id}
            image={product.images}
            name={product.name}
            price={product.price}
            favoriteCount={product.favoriteCount}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <img src={arrowLeft} />
        </button>
        <span className={styles.pagination}>
          {pages.slice(start, start + paginationLimit).map((page) => (
            <button
              className={`${styles.button} ${currentPage === page ? styles.current : ""}`}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </span>

        <button
          className={styles.button}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <img src={arrowRight} />
        </button>
      </div>
    </div>
  );
}
