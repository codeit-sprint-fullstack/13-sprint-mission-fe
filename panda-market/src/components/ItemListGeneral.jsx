import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import styles from "../css/ItemListGeneral.module.css";
import SectionTitle from "./SectionTitle";
import ListSearch from "./ListSearch";
import Button from "./Button";
import Dropdown from "./Dropdown";

export default function ItemListGeneral() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;
  const paginationLimit = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(1, currentPage - 2) - 1;
  const [orderBy, setorderBy] = useState("recent");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?page=${currentPage}&pageSize=${size}&orderBy=${orderBy}&keyword=${searchText}`,
        );
        const data = await response.json();
        setProducts(data.list);
        setTotalPages(Math.floor(data.totalCount / 10));
      } catch (error) {
        console.error("error:", error);
      }
    }
    getProducts();
  }, [currentPage, searchText]);

  return (
    <>
      {/* 인풋박스 컴포넌트 만들기
    드롭다운 컴포넌트 만들기 */}
      <SectionTitle title="판매 중인 상품">
        <ListSearch onSearch={(value) => setSearchText(value)} />
        <Button>상품 등록하기</Button>
        <Dropdown />
      </SectionTitle>
      <div className={styles.list}>
        {products.map((product) => (
          <ItemCard
            key={product.id}
            image={product.images}
            name={product.name}
            price={product.price}
            favoriteCount={product.favoriteCount}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          이전
        </button>
        <span>
          {pages.slice(start, start + paginationLimit).map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          다음
        </button>
      </div>
    </>
  );
}
