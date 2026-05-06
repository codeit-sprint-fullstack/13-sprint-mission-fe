import FeaturedItems from "../FeaturedItems/FeaturedItems.jsx";
import MarketItems from "../MarketItems/MarketItems.jsx";
import "../../styles/productBoard.css";

function ProductBoard() {
  return (
    <div className="product-board-wrapper">
      <div className="featured-items-container">
        <FeaturedItems />
      </div>
      <div className="market-items-container">
        <MarketItems />
      </div>
    </div>
  );
}

export default ProductBoard;