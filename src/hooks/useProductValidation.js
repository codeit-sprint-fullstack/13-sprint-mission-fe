import { useMemo } from "react";

// values: {name, description, price, tags}
// tagInput: 입력 중인 태그 문자열 (별도 state)
export default function useProductValidation(values, tagInput) {
  // 1. errors - 사용자가 "값을 입력했는데" 조건 위배일 때 메시지
  //      (빈 값일 땐 메시지 안 보여줌 - UX)
  const errors = useMemo(() => {
    // 검증 결과를 values/tagInput가 바뀔때만 다시 계산
    const errs = {}; // 매 렌더마다 검증 함수를 다시 돌릴 필요 없음 (성능)
    // 의존성 배열 [values,tagInput] - 이 값들이 변할 때만 재계산
    // 상품명: 1자 이상이면서 10자 초과면 에러
    if (values.name && values.name.length > 10) {
      errs.name = "상품명은 10자 이내로 입력해주세요.";
    }

    // 상품 소개: 입력했는데 10자 미만이거나 100자 초과
    if (values.description) {
      if (values.description.length < 10) {
        errs.description = "상품 소개는 10자 이상 입력해주세요.";
      } else if (values.description.length > 100) {
        errs.description = "상품 소개는 100자 이내로 입력해주세요.";
      }
    }

    // 판매 가격: 입력햇는데 숫자 아니거나 음수
    if (values.price !== "") {
      if (isNaN(Number(values.price)) || Number(values.price) < 0) {
        errs.price = "숫자를 입력해주세요.";
      }
    }

    // 태그 : 입력 중인 태그가 5자 초과
    if (tagInput && tagInput.length > 5) {
      errs.tag = "태그는 5글자 이내로 입력해주세요.";
    }

    return errs;
  }, [values, tagInput]);

  // 2. isValid - 모든 필드가 유효한 값으로 채워져있는지
  //    (등록 버튼 비활성화 판단용. 빈 값도 invalid로 간주)
  const isValid = useMemo(() => {
    return (
      values.name.length >= 1 &&
      values.name.length <= 10 &&
      values.description.length >= 10 &&
      values.description.length <= 100 &&
      values.price !== "" &&
      !isNaN(Number(values.price)) &&
      Number(values.price) >= 0
    );
    // tags는 옵션이라 isValid에 포함 안 함  (요구사항에 "빈 값일 때"엔 필수 항목만")
  }, [values]);

  return { errors, isValid };
}
