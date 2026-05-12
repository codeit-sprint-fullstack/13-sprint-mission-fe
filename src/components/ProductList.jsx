import ForSaleProductList from "./ForSaleProductList.jsx";
import "../styles/productList.css";

function ProductList() {
  return (
    <div className="product-list-container">
      <div className="forSale-product-list-containter">
        <ForSaleProductList />
      </div>
    </div>
  );
}

export default ProductList;
