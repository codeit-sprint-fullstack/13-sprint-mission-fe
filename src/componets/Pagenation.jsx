import { useEffect, useState } from "react";
import "/src/css/pagenation.css";
import { productAPI } from "../js/productAPI";

export default function Pagenation({ currentPage, onPageChange }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const data = await productAPI.Get({
        page: 1,
        pageSize: 10,
        orderBy: "recent",
      });
      const totalSize = Math.ceil(data.totalCount / 10);
      setPages(Array.from({ length: totalSize }, (v, i) => i + 1));
    }
    getProduct();
  }, []);

  return (
    <div className="pagination-area">
      <button
        className="nav-btn"
        onClick={() => onPageChange((prev) => Math.max(1, prev - 1))}
      >
        <img src="./src/assets/arrow_left.svg" alt="" />
      </button>
      <div className="page-numbers">
        {pages.map((page) => (
          <button
            key={page}
            className={`nav-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="nav-btn"
        onClick={() => onPageChange((prev) => Math.min(pages.length, prev + 1))}
      >
        <img src="./src/assets/arrow_right.svg" alt="" />
      </button>
    </div>
  );
}
