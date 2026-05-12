import { useState, useEffect } from "react";

const useFormValidation = (value, type) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!value) {
      setError(""); // 빈 값일 때는 에러 메시지 숨김 (버튼 비활성화 조건으로만 사용)
      return;
    }

    switch (type) {
      case "name":
        if (value.length < 1 || value.length > 10) {
          setError("10자 이내로 입력해주세요");
        } else {
          setError("");
        }
        break;
      case "description":
        if (value.length < 10 || value.length > 100) {
          setError("10자 이상 입력해주세요");
        } else {
          setError("");
        }
        break;
      case "price":
        if (isNaN(value) || value.trim() === "") {
          setError("숫자로 입력해주세요");
        } else {
          setError("");
        }
        break;
      case "tag":
        if (value.length > 5) {
          setError("5글자 이내로 입력해주세요");
        } else {
          setError("");
        }
        break;
      default:
        setError("");
    }
  }, [value, type]);

  return error;
};

export default useFormValidation;
