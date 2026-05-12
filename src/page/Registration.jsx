import React from "react";

export default function Registration() {
  return (
    <div className="Registration">
      <div className="Registration-top">
        <span className="secondary-800-20px">상품 등록하기</span>
        <button className="registration-btn">
          <span className="cool-gray-100-16px">등록</span>
        </button>
      </div>
      <div className="Registration-bottom">
        <div className="Registration-bottom-frame">
          <span className="Secondary-800-18px">상품명</span>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            className="Registration-input-small"
          />
        </div>
        <div className="Registration-bottom-frame">
          <span className="Secondary-800-18px">상품 소개</span>
          <input
            type="text"
            placeholder="상품 소개를 입력해주세요"
            className="Registration-input-big"
          />
        </div>
        <div className="Registration-bottom-frame">
          <span className="Secondary-800-18px">판매가격</span>
          <input
            type="text"
            placeholder="판매 가격을 입력해주세요"
            className="Registration-input-small"
          />
        </div>
        <div className="Registration-bottom-frame">
          <span className="Secondary-800-18px">태그</span>
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            className="Registration-input-small"
          />
        </div>
      </div>
    </div>
  );
}
