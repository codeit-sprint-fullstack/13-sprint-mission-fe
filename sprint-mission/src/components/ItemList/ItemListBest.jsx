"use client";
import { useEffect, useState } from "react";
import ItemListCard from "./ItemListCard";
import SectionTitle from "@/components/SectionTitle";
import styles from "./ItemListBest.module.css";

export default function ItemListBest() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite"
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
      <SectionTitle title="베스트 상품" />
      <div className={styles.list}>
        {products.map((product) => (
          <ItemListCard
            key={product.id ?? product._id}
            id={product.id ?? product._id}
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
