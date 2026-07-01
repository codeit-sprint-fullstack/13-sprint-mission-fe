"use client";
import { useEffect, useState } from "react";
import ItemListCard from "./ItemListCard";
import styles from "./ItemListGeneral.module.css";
import SectionTitle from "@/components/SectionTitle";
import ItemListSearch from "./ItemListSearch";
import LinkButton from "@/components/ButtonLink";
import Dropdown from "@/components/Dropdown";
import Image from "next/image";

export default function ItemListGeneral() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [searchText, setSearchText] = useState("");
  const pageSize = 10;

  const paginationLimit = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(0, currentPage - 3);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?page=${currentPage}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${searchText}`
        );
        const data = await response.json();
        setProducts(data.list);
        setTotalPages(Math.max(1, Math.ceil(data.totalCount / pageSize)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage, orderBy, searchText]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div className={styles.wrapper}>
      <SectionTitle title="판매 중인 상품">
        <ItemListSearch
          onSearch={(value) => {
            setSearchText(value);
            setCurrentPage(1);
          }}
        />
        <LinkButton href="/items/add" size="small-40">상품 등록하기</LinkButton>
        <Dropdown onList={(value) => { setOrderBy(value); setCurrentPage(1); }} />
      </SectionTitle>
      <div className={styles.list}>
        {products.map((product) => (
          <ItemListCard
            key={product.id ?? product._id}
            id={product.id ?? product._id}
            image={product.images}
            name={product.name}
            price={product.price}
            favoriteCount={product.favoriteCount}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <Image src="/icon/arrow-left.svg" width={24} height={24} alt="이전" />
        </button>
        <span className={styles.pagination}>
          {pages.slice(start, start + paginationLimit).map((page) => (
            <button
              key={page}
              className={`${styles.button} ${currentPage === page ? styles.current : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </span>
        <button
          className={styles.button}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <Image src="/icon/arrow-right.svg" width={24} height={24} alt="다음" />
        </button>
      </div>
    </div>
  );
}
