import styles from "./ProductPage.module.css";
import icHeart from "@/assets/icons/ic_heart.png";
import searchIcon from "@/assets/icons/ic_search.png";
import Dropdown from "@/components/DropDowns";
import PageNation from "@/components/PageNation";
import { useState } from "react";
import { useGetProduct } from "@/hooks/useGetProducts";
import { useWindowSize } from "@/hooks/useWindowSize";
import SellItems from "@/components/SellItems/SellItems";

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
