import React, { useEffect, useState } from "react";
import "./OnsaleProduct.css";
import favoriteIcon from "../../assets/ic_heart.svg";
import defaultImg from "../../assets/default_img.jpg";
import { Link } from "react-router-dom";

export default function OnsaleProduct() {
  const [sortproducts, setSortProducts] = useState([]);
  // const [products, setProducts] = useState([]);
  const [isdropdown, setIsdropdown] = useState(false);
  const [sort, setSort] = useState("recent");
  const [totalproduct, setTotalproduct] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const pagebtnsize = 5;
  const totalpage = Math.ceil(totalproduct / 10); //전체페이지는 전체상품수에서 10을 나눈 것 왜냐면 10개 요소를 pageSize를 통해 받아와서 grid로 배치해놨으니까
  const startPage =
    Math.floor((currentpage - 1) / pagebtnsize) * pagebtnsize + 1;
  //페이지 버튼의 시작페이지 번호
  const endPage = Math.min(startPage + pagebtnsize - 1, totalpage);
  //페이지 버튼에서 끝 페이지 번호 min으로 total페이지를 넘기지 않도록 제한
  useEffect(() => {
    async function GetSortProduct() {
      try {
        const response = await fetch(
          // `https://panda-market-api.vercel.app/products?page=${currentpage}&pageSize=10&sort=${sort}&keyword=${keyword}`
          `https://sprint5-api.onrender.com/products?offset=${currentpage * 10 - 10}&limit=10&sort=${sort}&keyword=${keyword}`,
        );
        if (!response.ok) throw new Error("HTTP 에러 타입 : ", response.status);
        const data = await response.json();
        setSortProducts(data.list);
        setTotalproduct(data.totalCount);
      } catch (err) {
        console.log("에러 ", err);
      } //제발 await 붙이는거 잊지말자
      // console.log(data);
    }
    GetSortProduct();
  }, [sort, currentpage, keyword]);

  return (
    <section className="onsale-section">
      <div className="onsale-title-box">
        <p className="onsale-title-text">판매 중인 상품</p>
        <div className="onsale-toolbar">
          <input
            type="search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setCurrentpage(1);
            }}
            placeholder="🍳검색할 상품을 입력해주세요"
          ></input>
          <Link to="/registration" className="link-register">
            <button className="toolbar-btn">상품 등록하기</button>
          </Link>
          <div className="dropdown-box">
            <button className="toolbar-dropdown">
              {sort === "recent" ? <p>최신순</p> : <p>좋아요순</p>}
              <p onClick={() => setIsdropdown((prev) => !prev)}>▼</p>
            </button>
            {isdropdown ? (
              <div className="dropdown-menu">
                <button
                  onClick={() => {
                    setSort("recent");
                    setCurrentpage(1);
                  }}
                >
                  최신순
                </button>
                {/* 좋아요 아직 미구현 */}
                <button
                  onClick={() => {
                    setSort(null);
                    setCurrentpage(1);
                  }}
                >
                  좋아요순
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="onsaleproducts">
        {sortproducts.map((sortproduct) => (
          <div className="onsale-card" key={sortproduct.id}>
            <img
              src={sortproduct.images || defaultImg}
              className="onsale-card-img"
            />
            <span className="onsale-card-name">{sortproduct.name}</span>
            <span className="onsale-card-price">{sortproduct.price}</span>
            <span className="onsale-favorite-state">
              <img src={favoriteIcon} />
              <p>{sortproduct.favoriteCount}</p>
            </span>
          </div>
        ))}
      </div>
      <div className="pagination-box">
        <button
          className="prev-btn"
          onClick={() => {
            if (startPage > 1) {
              setCurrentpage(startPage - 1);
            }
          }}
        >
          ◀
        </button>
        {/*실제 있는 페이지 만큼만 버튼 생성*/}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentpage(page)}
            // 누른버튼 구분하게 active 스타일 입히는거
            className={page === currentpage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          className="next-btn"
          onClick={() => {
            if (endPage < totalpage) {
              setCurrentpage(endPage + 1);
            }
          }}
        >
          ▶
        </button>
      </div>
    </section>
  );
}
