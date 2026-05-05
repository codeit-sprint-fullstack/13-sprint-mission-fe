import React from "react";
import { useState } from "react";
import { productAPI } from "../js/productAPI";
import { useEffect } from "react";

export default function Card({ prob, classname }) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function getProduct() {
      const data = await productAPI.Get(prob);
      setProduct(data.list);
    }
    getProduct();
  }, [prob]);

  return product.map((p) => {
    return (
      <li key={p.id} className={classname}>
        {console.log(classname)}
        <img src={p.images} alt="제품 이미지" className="main-img" />
        <p className="description">{p.description}</p>
        <p className="price">{p.price}원</p>

        <div className="favorite">
          <img src="./src/assets/ic_heart.svg" alt="하트" />
          <p>{p.favoriteCount}</p>
        </div>
      </li>
    );
  });
}
