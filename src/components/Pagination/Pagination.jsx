import { useEffect, useState } from "react";
import defaultImg from "../../assets/images/img_default.svg";
import heartIc from "../../assets/icon/ic_heart.svg";
import "./Pagination.css";

export default function Pagination() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        "https://one3-sprint-mission-be-62ar.onrender.com/products",
      );

      const productData = await res.json();

      setProducts(productData);
    };

    fetchProduct();
  }, []);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <section className="productListArea">
      <ul className="productList">
        {currentProducts.map((product) => {
          return (
            <li className="productCard" key={product.id}>
              <img className="productImg" src={defaultImg} alt="기본 이미지" />

              <div className="productInfoBox">
                <div className="productInfo">
                  <p className="productName">{product.name}</p>

                  <p className="productPrice">
                    {product.price.toLocaleString()}원
                  </p>
                </div>

                <div className="favoriteBox">
                  <img src={heartIc} alt="하트아이콘" />

                  <p className="favoriteCount">{product.favoriteCount}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button
          className="pageBtn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <button
              className={`pageBtn ${currentPage === index + 1 ? "isActive" : ""}`}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}

        <button
          className="pageBtn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </section>
  );
}
