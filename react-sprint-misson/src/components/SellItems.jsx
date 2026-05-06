import { useState } from "react";
import styles from "../styles/Products.module.css";
import searchIcon from "../assets/icons/ic_search.png";
import icHeart from "../assets/icons/ic_heart.png";
import Dropdown from "./DropDowns";
import PageNation from "./PageNation";
import { useWindowSize } from "../hooks/useWindowSize.js";
import { useGetProduct } from "../hooks/useGetProducts.js";

const BREAKPOINTS = {
  MOBILE: 375,
  TABLET: 744,
};

const PAGE_SIZE = {
  MOBILE: 4,
  TABLET: 6,
  DESKTOP: 10,
};

const ORDER_BY = {
  RECENT: "recent",
  FAVORITE: "favorite",
};

const INITIAL_FILTER = {
  orderBy: ORDER_BY.RECENT,
  keyword: "",
  inputValue: "",
  currentPage: 1,
};

function getPageSize(width) {
  switch (true) {
    case width <= BREAKPOINTS.MOBILE:
      return PAGE_SIZE.MOBILE;
    case width <= BREAKPOINTS.TABLET:
      return PAGE_SIZE.TABLET;
    default:
      return PAGE_SIZE.DESKTOP;
  }
}

export default function SellItems() {
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const { orderBy, keyword, inputValue, currentPage } = filter;

  const { width } = useWindowSize();
  const isMobile = width <= BREAKPOINTS.MOBILE;
  const pageSize = getPageSize(width);

  const { productList, totalCount } = useGetProduct({
    page: currentPage,
    orderBy,
    pageSize,
    keyword,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter((prev) => ({ ...prev, keyword: inputValue, currentPage: 1 }));
  };

  const searchRow = (
    <div className={styles.searchRow}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchBtn}>
          <img src={searchIcon} alt="검색" className={styles.searchIcon} />
        </button>
        <input
          className={styles.searchInput}
          placeholder="검색할 상품을 입력해주세요"
          type="text"
          value={inputValue}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, inputValue: e.target.value }))
          }
        />
      </form>
      {isMobile && (
        <Dropdown
          onChange={(value) =>
            setFilter((prev) => ({ ...prev, orderBy: value }))
          }
        />
      )}
    </div>
  );

  return (
    <section>
      <div className={styles.sellHeader}>
        <div className={styles.sellHeaderLeft}>
          <h2 className={styles.title}>판매 중인 상품</h2>
        </div>

        <div className={styles.sellHeaderRight}>
          {!isMobile && searchRow}
          <button className={styles.registerBtn}>상품 등록하기</button>
          {!isMobile && (
            <Dropdown
              onChange={(value) =>
                setFilter((prev) => ({ ...prev, orderBy: value }))
              }
            />
          )}
        </div>
      </div>

      {isMobile && searchRow}

      <ul className={styles.sellList}>
        {productList.map((product) => (
          <li className={styles.productItmes} key={product.id}>
            <img
              className={`${styles.cardView} ${styles.sellCardView}`}
              src={product.images}
              alt={product.name}
            />
            <p className={styles.productTitle}>{product.name}</p>
            <p className={styles.productPrice}>
              {product.price.toLocaleString()}원
            </p>
            <div className={styles.favoriteContainer}>
              <img
                className={styles.favoriteImg}
                src={icHeart}
                alt="하트 이미지"
              />
              <p className={styles.favoriteCount}>{product.favoriteCount}</p>
            </div>
          </li>
        ))}
      </ul>

      <PageNation
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={(page) =>
          setFilter((prev) => ({ ...prev, currentPage: page }))
        }
      />
    </section>
  );
}
