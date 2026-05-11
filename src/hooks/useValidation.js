function useValidation(value, type) {
  let error = "";

  if (type === "name") {
    if (value.length < 1 || value.length > 10) {
      error = "상품명은 1~10자입니다.";
    }
  }

  if (type === "description") {
    if (value.length < 10 || value.length > 100) {
      error = "상품 소개는 10~100자입니다.";
    }
  }

  if (type === "price") {
    if (!/^\d+$/.test(value)) {
      error = "숫자만 입력해주세요.";
    }
  }

  if (type === "tag") {
    if (value.length > 5) {
      error = "태그는 5글자 이하입니다.";
    }
  }

  return {
    isValid: !error,
    error,
  };
}

export default useValidation;
