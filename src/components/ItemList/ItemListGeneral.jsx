import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ItemListCard from "./ItemListCard.jsx";
import styles from "../../css/ItemListGeneral.module.css";
import SectionTitle from "../SectionTitle.jsx";
import ListSearch from "./ItemListSearch.jsx";
import Button from "../Button/Button.jsx";
import Dropdown from "../Dropdown.jsx";
import LinkButton from "../Button/ButtonLink.jsx";
import arrowLeft from "../../assets/icon/arrow-left.svg";
import arrowRight from "../../assets/icon/arrow-right.svg";
import useProducts from "../../hooks/useProducts.js";

export default function ItemListGeneral() {
  const isTablet = useMediaQuery({ maxWidth: 744 });
  const isMobile = useMediaQuery({ maxWidth: 375 });

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [searchText, setSearchText] = useState("");
  const size = isTablet ? 6 : isMobile ? 4 : 10;
  const paginationLimit = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(1, currentPage - 2) - 1;

  const { products, loading, error } = useProducts(
    currentPage,
    totalPages,
    size,
    orderBy,
    searchText,
  );

  if (loading) return <div>로딩중</div>;
  if (error) console.log("error::", error.message);
  if (products.length === 0) return <div>데이터없음</div>;

  return (
    <div className={styles.wrapper}>
      <SectionTitle title="판매 중인 상품">
        <ListSearch onSearch={(value) => setSearchText(value)} />
        <LinkButton href="/registration" size={"small-40"}>
          상품 등록하기
        </LinkButton>
        <Dropdown onList={(value) => setOrderBy(value)} />
      </SectionTitle>
      <div className={styles.list}>
        {products.map((product) => (
          <ItemListCard
            key={product._id}
            id={product._id}
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
              key={page}
              className={`${styles.button} ${currentPage === page ? styles.current : ""}`}
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
