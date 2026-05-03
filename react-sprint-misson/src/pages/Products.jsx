import styles from "../styles/Products.module.css";
import icHeart from "../assets/icons/ic_heart.png";
import searchIcon from "../assets/icons/ic_search.png";
import Dropdown from "../components/DropDowns";
import PageNation from "../components/PageNation";
import { useState } from "react";
import { useGetProduct } from "../hooks/useGetProducts";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Products() {
  return (
    <div className={styles.contentContainer}>
      <FavoriteView />
      <SellItems />
    </div>
  );
}

function FavoriteView() {
  const { width } = useWindowSize();
  const pageSize = width <= 375 ? 1 : width <= 744 ? 2 : 4;
  const { productList } = useGetProduct({ orderBy: "favorite", pageSize });

  return (
    <section>
      <h2 className={styles.title}>베스트 상품</h2>
      <ul className={styles.favoriteList}>
        {productList.map((product) => (
          <li className={styles.productItmes} key={product.id}>
            <img
              className={styles.cardView}
              src={product.images?.[0]}
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
              ></img>
              <p className={styles.favoriteCount}>{product.favoriteCount}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SellItems() {
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { width, type } = useWindowSize();
  const isMobile = width <= 375;
  const pageSize = width <= 375 ? 4 : width <= 744 ? 6 : 10;

  const { productList, totalCount } = useGetProduct({
    page: currentPage,
    orderBy,
    pageSize,
    keyword,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(inputValue);
    setCurrentPage(1);
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
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      {isMobile && <Dropdown onChange={(value) => setOrderBy(value)} />}
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
          {!isMobile && <Dropdown onChange={(value) => setOrderBy(value)} />}
        </div>
      </div>

      {isMobile && searchRow}

      <ul className={styles.sellList}>
        {productList.map((product) => (
          <li className={styles.productItmes} key={product.id}>
            <img
              className={`${styles.cardView} ${styles.sellCardView}`}
              src={product.images}
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
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
