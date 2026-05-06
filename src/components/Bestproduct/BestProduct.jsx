import React, { useEffect, useState } from "react";
import "./BestProduct.css";
import favoriteIcon from "../../assets/ic_heart.svg";
import defaultImg from "../../assets/default_img.jpg";

export default function BestProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getFavoriteProduct() {
      try {
        const response = await fetch(
          "https://panda-market-api.vercel.app/products?pageSize=4&orderBy=favorite",
        );
        if (!response.ok) throw new Error("HTTP 에러", response.status);
        const data = await response.json();
        setProducts(data.list); //.배열을 받아야하는데 data만 쓰니까 객체형태라서 안되었던거 같음 그래서 data.list를 써야한다
        console.log(data);
      } catch (err) {
        console.log("에러", err);
      }
    }
    getFavoriteProduct();
  }, []);

  return (
    <section className="bestProducts-section">
      <p className="bestproducts-title">베스트 상품</p>
      <div className="bestproducts">
        {products.map((product) => {
          return (
            <div className="best-card" key={product.id}>
              <img
                src={product.images || defaultImg}
                className="bestcard-img"
              />
              <span className="card-name">{product.name}</span>
              <span className="card-price">{product.price}</span>
              <span className="favorite-state">
                <img src={favoriteIcon} />
                <p>{product.favoriteCount}</p>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
