import React, { useState, useEffect } from "react";
import "./content.css";
import Card from "../common/Card";
const BASE_URL = `https://panda-market-api.vercel.app/products`;

async function getProductList(
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
) {
  const params = new URLSearchParams({ page, pageSize, orderBy });
  if (keyword) params.append("keyword", keyword);

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) throw new Error("조회실패");
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export default function Content() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  useEffect(() => {
    async function load() {
      const data = await getProductList();
      const bestProductData = await getProductList(1, 4, "favorite");
      if (data) setProducts(data.list); // 배열만 저장
      if (bestProductData) setBestProducts(bestProductData.list);
    }
    load();
  }, []);

  return (
    <div className="content-wrap">
      <div className="best-product-wrap">
        <div className="section-title">베스트 상품</div>
        <div className="content-list">
          {bestProducts.map((product) => (
            <Card
              key={product.id}
              title={product.name}
              price={product.price}
              favoriteCount={product.favoriteCount}
              images={product.images}
            />
          ))}
        </div>
      </div>
      <div className="sellingProduct-wrap">
        <div className="selling-content">
          <span className="section-title">판매중인 상품</span>
          <div className="selling-r">
            <input
              type="text"
              className="search"
              placeholder="검색할 상품을 입력해주세요"
            />

            <button className="button">물품등록하기</button>
            <div className="drop">최신순</div>
          </div>
        </div>
        <div className="selling-content-list">
          {products.map((product) => (
            <Card
              key={product.id}
              title={product.name}
              price={product.price}
              favoriteCount={product.favoriteCount}
              images={product.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
