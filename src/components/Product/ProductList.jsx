import React, { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import { getProducts } from "@/api/products";
import NoResults from "@/components/common/NoResults/NoResults";
import Pagination from "@/components/common/Pagination/Pagination";
import ProductFilterBar from "@/components/Product/ProductFilterBar";

import ProductItem from "@/components/Product/ProductItem";

import styles from "@/components/Product/ProductList.module.css";

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
    const controller = new AbortController(); // 컨트롤러 생성

    const loadProducts = async () => {
      setIsLoading(true); // 시작할 때 로딩 시작

      try {
        const data = await getProducts({
          pageSize: pageSize,
          page: currentPage,
          keyword: searchKeyword,
          orderBy: order,
          signal: controller.signal,
        });

        setProducts(data);
      } catch (error) {
        if (error.name === "AbortError") return; // AbortController는 요청 취소 했을 때 무시
        console.error("상품 로딩 실패:", error);
      } finally {
        // 컨트롤러가 취소되지 않았을 때만 로딩 종료
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => controller.abort(); // 실제 네트워크 요청 중단
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
