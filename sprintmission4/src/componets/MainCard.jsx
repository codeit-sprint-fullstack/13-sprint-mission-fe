import { useState } from "react";
import Card from "./Card";
import "/src/css/mainCard.css";
import Pagenation from "./Pagenation";

export default function MainCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="productList">
      <h2 className="product-title">베스트 상품</h2>
      <ul className="best-products">
        <Card
          prob={{
            page: 1,
            pageSize: 4,
            orderBy: "favorite",
          }}
          classname="best-product"
        ></Card>
      </ul>

      <div className="product-area">
        <h2 className="product-title">판매중인 상품</h2>
        <div className="product-search-area">
          <input
            className="product-search"
            type="text"
            placeholder="검색 할 상품을 입력해주세요."
          />
          <button className="add-button">상품 등록하기</button>
          <div className="drop-down" onClick={() => setIsOpen(!isOpen)}>
            <span>
              {selected}
              <img src="./src/assets/ic_arrow_down.svg" alt="화살표 이미지" />
            </span>

            {isOpen && (
              <ul className="drop-down-menu">
                <li
                  className="top"
                  onClick={() => {
                    setSelected("최신순");
                    setIsOpen(false);
                  }}
                >
                  최신순
                </li>
                <li
                  className="bottom"
                  onClick={() => {
                    setSelected("좋아요순");
                    setIsOpen(false);
                  }}
                >
                  좋아요순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <ul className="sale-products">
        <Card
          prob={{
            page: currentPage,
            pageSize: 10,
            orderBy: selected === "최신순" ? "recent" : "favorite",
          }}
          classname="sale-product"
        ></Card>
      </ul>
      <Pagenation
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      ></Pagenation>
    </div>
  );
}
