import React from "react";
import "../css/Register.css";

export default function Register() {
  return (
    <section className="regi-container">
      <div className="regi-head">
        <h1 className="regi-title"> 상품 등록하기 </h1>
        <button className="regi-btn" type="submit">
          등록
        </button>
      </div>
      <div className="item-name-pt">
        <h2 className="item-name">상품명</h2>
        <input
          className="item-name-input"
          type="text"
          placeholder="상품명을 입력해주세요"
        ></input>
      </div>
      <div className="item-desc-pt">
        <h3 className="item-desc">상품 소개</h3>
        <textarea
          className="item-desc-input"
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
      </div>
      <div className="item-price-pt">
        <h4 className="item-price">판매 가격</h4>
        <input
          className="item-price-input"
          type="price"
          placeholder="판매 가격을 입력해주세요"
        ></input>
      </div>
      <div className="item-tag-pt">
        <h5 className="item-tag-title">태그</h5>
        <input
          className="item-tag-input"
          type="text"
          placeholder="태그를 입력해주세요"
        ></input>
        <div className="tag-container">
          <button className="item-tag">#티셔츠</button>
          <button className="item-tag">#상의</button>
        </div>
      </div>
    </section>
  );
}
