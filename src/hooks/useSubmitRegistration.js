import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const useSubmitRegistration = ({
  name,
  description,
  price,
  tag,
  isTooShort,
  isTooLong,
  isNumber,
  isVeryShort,
}) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      alert("입력을 완료해주세요");
      return;
    }
    if (isTooShort) {
      alert("상품명은 10글자 이내로 입력해주세요");
      return;
    }
    if (isTooLong) {
      alert("상품 소개는 10글자 이상 입력해주세요");
      return;
    }
    if (isNumber) {
      alert("상품 가격은 숫자로 입력해주세요");
      return;
    }

    console.log("입력 유효성 검사 완료");

    async function postData() {
      try {
        const res = await fetch(
          `https://one3-sprint-mission-be.onrender.com/products`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              description: description,
              price: price,
              tag: tag,
              favoriteCount: 0,
            }),
          },
        );
        console.log("제출 완료");
        if (!res.ok) throw new Error("등록 실패");

        navigate("/products/:id"); // 유효하지 않은 페이지
      } catch (err) {
        setError(err.message);
      }
    }
    postData();
  };
  return { handleSubmit };
};

export default useSubmitRegistration;
