import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
// import heart-fill from '../assets/icon/heart-fill.svg'

export default function ItemListGeneral() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://panda-market-api.vercel.app/products",
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
    <div className="products-list">
      {products.map((product) => (
        <ItemCard
          id={product.id}
          image={product.images[0]}
          name={product.name}
          price={product.price}
          favoriteCount={product.favoriteCount}
        />
      ))}
    </div>
  );
}
