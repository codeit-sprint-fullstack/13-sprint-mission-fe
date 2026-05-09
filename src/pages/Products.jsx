import React from "react";

import ProductList from "@/components/Product/ProductList";
import usePageSize from "@/hooks/usePageSize";
import style from "@/pages/Products.module.css";

export default function Products() {
  // 기기별(데스크탑/태블릿/모바일) 반응형 페이지 사이즈 설정
  const pageSizeMd = usePageSize("md"); // 베스트 상품 리스트 페이지 사이즈
  // const pageSizeLg = usePageSize("lg"); // 판매 중인 상품 리스트 페이지 사이즈

  return (
    <section className={style.products}>
      <div className={style.productsInner}>
        {/* <ProductList
          title='베스트 상품'
          gridSize='lg'
          pageSize={pageSizeLg}
          orderBy='favorite'
        /> */}

        <ProductList
          title='판매 중인 상품'
          gridSize='md'
          pageSize={pageSizeMd}
          hasFilterBar={true}
        />
      </div>
    </section>
  );
}
