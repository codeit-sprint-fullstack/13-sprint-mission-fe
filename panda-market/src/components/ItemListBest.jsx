import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import styles from "../css/ItemListBest.module.css";

export default function ItemListBest() {
  const [products, setProducts] = useState([]);

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
  );
}
