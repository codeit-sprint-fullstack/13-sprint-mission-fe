import { useEffect, useState } from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import { productApi } from "../../api/productApi";
import "../../styles/featuredItems.css";
import usePageSize from "../../hooks/usePageSize";

function FeaturedItems() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const pageSize = usePageSize("best");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await productApi.getProductList(1, 4, "favorite");
        setFeaturedProducts(data.list);
      } catch (error) {
        console.error(`베스트 상품 목록 조회 실패: ${error.message}`);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const displayProducts = featuredProducts.slice(0, pageSize);

  return (
    <section className="featured-items-section">
      <h2 className="featured-items-title">베스트 상품</h2>
      <div className="featured-items-grid">
        {displayProducts.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedItems;