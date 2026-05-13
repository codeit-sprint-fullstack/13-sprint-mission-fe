import React, { useState } from "react";
import style from "./Registraion.module.css";

export default function Registration() {
  const [form, setFrom] = useState({});

  return (
    <div>
      <form className={style["form-wrap"]}>
        <div className={style["form-top"]}>
          <span className={style.title}>상품 등록하기</span>
          <button type="submit" className={style.button}>
            등록
          </button>
        </div>

        <div>
          <label htmlFor="name" className={style.label}>
            상품명
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="상품명을 입력해주세요"
            className={style.name}
          />
        </div>
        <div>
          <label htmlFor="description" className={style.label}>
            상품 소개
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="상품 소개를 입력해주세요"
            className={style.description}
          />
        </div>
        <div>
          <label htmlFor="price" className={style.label}>
            판매 가격
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="판매 가격을 입력해주세요"
            className={style.price}
          />
        </div>
        <div>
          <label htmlFor="tags" className={style.label}>
            태그
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="태그를 입력해주세요"
            className={style.tag}
          />
        </div>
      </form>
    </div>
  );
}
