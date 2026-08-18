import { productAPI } from "@/lib/services/productApi";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function ProductCard({
  prob,
  classname,
}: {
  prob: {
    page: number;
    pageSize: number;
    orderBy: string;
  };
  classname: string;
}) {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function getProduct() {
      const data = await productAPI.getProduct(prob);
      setProduct(data.list);
    }
    getProduct();
  }, [prob]);

  return product.map((p) => {
    return (
      <li key={p.id} className={classname}>
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
