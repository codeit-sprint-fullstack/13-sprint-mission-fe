import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

import "../styles/items.css";

function ItemsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const LIMIT = 10;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const offset = (page - 1) * LIMIT;

        const data = await getProducts(offset, LIMIT);

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, [page]);

  return (
    <main className="items-page">
      <div className="items-header">
        <h2>판매 중인 상품</h2>

        <div className="items-actions">
          <input type="text" placeholder="검색할 상품을 입력해주세요" />

          <button
            className="register-btn"
            onClick={() => navigate("/registration")}
          >
            상품 등록하기
          </button>

          <select>
            <option>최신순</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          이전
        </button>

        <span>{page}</span>

        <button onClick={() => setPage((prev) => prev + 1)}>다음</button>
      </div>
    </main>
  );
}

export default ItemsPage;
