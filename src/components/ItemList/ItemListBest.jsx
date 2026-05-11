import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ItemListCard from "./ItemListCard";
import styles from "../../css/ItemListBest.module.css";
import SectionTitle from "../SectionTitle";

export default function ItemListBest() {
  const isTablet = useMediaQuery({ maxWidth: 744 });
  const isMobile = useMediaQuery({ maxWidth: 375 });

  const [products, setProducts] = useState([]);

  const itemCount = isTablet ? 3 : isMobile ? 2 : 4;

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://panda-market-api.vercel.app/products?page=1&pageSize=10&orderBy=favorite",
        );
        const data = await response.json();
        setProducts(data.list);
      } catch (error) {
        console.error("error:", error);
      }
    }
    getProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <SectionTitle title="베스트 상품"></SectionTitle>
      <div className={styles.list}>
        {products.slice(0, itemCount).map((product) => (
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
    </div>
  );
}
