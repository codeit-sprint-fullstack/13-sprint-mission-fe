import BestProductList from "./BestProductList.jsx";
import ForSaleProductList from "./ForSaleProductList.jsx";
import "../styles/components/productList.css";

function ProductListCard() {
  return (
    <div className="product-list-container">
      <div className="best-product-list-containter">
        <BestProductList />
      </div>
      <div className="forSale-product-list-containter">
        <ForSaleProductList />
      </div>
    </div>
  );
}

export default ProductListCard;
