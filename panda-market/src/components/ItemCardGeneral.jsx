import { useEffect, useState } from "react";
import heart from "../assets/icon/heart.svg";
// import heart-fill from '../assets/icon/heart-fill.svg'

export default function ItemCard() {
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
        <div key={product.id}>
          <img src={product.images[0]} />
          <div>
            <div>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
            <div>
              <img src={heart} />
              <p>{product.favoriteCount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
