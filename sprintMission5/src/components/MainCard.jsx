import { useState, useEffect } from "react";
import { Link } from "react-router";
import { productAPI } from "../js/productAPI";
import "/src/css/mainCard.css";
import Card from "./Card";
import Pagenation from "./Pagenation";

export default function MainCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [product, setProduct] = useState([]);
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const data = await productAPI.Get({
        page: currentPage,
        pageSize: 10,
      });
      const totalSize = Math.ceil(data.totalCnt / 10);
      setPages(Array.from({ length: totalSize }, (v, i) => i + 1));
      setProduct(data.list);
    }
    getProduct();
  }, [currentPage]);

  useEffect(() => {
    async function getProduct() {
      const data = await productAPI.GetSearch({
        page: 1,
        pageSize: 10,
        keyword: keyword,
      });
      const totalSize = Math.ceil(data.totalCnt / 10);
      setPages(Array.from({ length: totalSize }, (v, i) => i + 1));
      setProduct(data.list);
    }
    getProduct();
  }, [keyword]);

  return (
    <div className="productList">
      <div className="product-area">
        <h2 className="product-title">판매중인 상품</h2>
        <div className="product-search-area">
          <input
            className="product-search"
            type="text"
            value={keyword}
            placeholder="검색 할 상품을 입력해주세요."
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <Link to={"/registration"} className="add-button" oncl>
            상품 등록하기
          </Link>
          <div className="drop-down">
            <span>
              최신순
              <img src="./src/assets/ic_arrow_down.svg" alt="화살표 이미지" />
            </span>
          </div>
        </div>
      </div>

      <ul className="sale-products">
        <Card product={product}></Card>
      </ul>
      <Pagenation
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        pages={pages}
      ></Pagenation>
    </div>
  );
}
