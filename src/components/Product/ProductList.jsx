import React, { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import NoResults from "@/components/NoResults";
import Pagination from "@/components/Pagination";
import ProductFilterBar from "@/components/Product/ProductFilterBar";

import ProductItem from "@/components/Product/ProductItem";

import styles from "@/components/Product/ProductList.module.css";

import fetchProducts from "@/hooks/fetchProducts";

export default function ProductList({
  title,
  gridSize,
  pageSize,
  orderBy = "recent",
  hasFilterBar = false,
}) {
  const [products, setProducts] = useState([]); // 상품 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 (keyword)
  const [order, setOrder] = useState(orderBy); // 정렬 (최신순/좋아요순)
  const [isLoading, setIsLoading] = useState(true);

  // 상품 데이터 조회 및 로딩 스피너
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true); // 시작할 때 로딩 시작

      try {
        const data = await fetchProducts({
          pageSize: pageSize,
          page: currentPage,
          keyword: searchKeyword,
          orderBy: order,
        });

        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("상품 로딩 실패:", error);
      } finally {
        setIsLoading(false); // 성공하든 실패하든 로딩 종료
      }
    };

    loadProducts();
  }, [currentPage, pageSize, searchKeyword, order]);

  return (
    <section className={styles.productList}>
      <div className={styles.onSaleHeader}>
        {hasFilterBar ? (
          // Filter Bar 사용 시, ProductFilterBar 컴포넌트 내에서 Title 처리
          <ProductFilterBar
            title={title}
            setSearchKeyword={setSearchKeyword}
            setOrder={setOrder}
            onChangePage={setCurrentPage}
          />
        ) : (
          <h1 className={styles.title}>{title}</h1>
        )}
      </div>

      {isLoading ? (
        // Loading Spinner
        <div className={styles.loading}>
          <TailSpin
            visible={true}
            height='60'
            width='60'
            color='var(--Primary-200)'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
          />
        </div>
      ) : products?.list?.length > 0 ? (
        // 상품이 있을 때 (gridSize 분기)
        gridSize === "md" ? (
          <>
            <div className={`${styles.itemContainer} ${styles.mdGridStyle}`}>
              <ProductItem products={products} />
            </div>
            {!!products?.list?.length && (
              <Pagination
                products={products}
                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className={`${styles.itemContainer} ${styles.lgGridStyle}`}>
            <ProductItem products={products} />
          </div>
        )
      ) : (
        // 상품이 없을 때
        <NoResults text='등록된 상품이 없습니다.' />
      )}
    </section>
  );
}
