import React from "react";
import BestProductList from "./BestProductList";
import ForSaleProductList from "./ForSaleProductList";
import "../styles/productList.css";

const ProductList = () => {
  return (
    <div className="product-list-container">
      <BestProductList />

      <ForSaleProductList />
    </div>
  );
};

export default ProductList;
