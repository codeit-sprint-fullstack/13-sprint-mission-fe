import { useState } from "react";

/**
 * 입력값의 유효성을 검사하고 관련 상태를 관리하는 커스텀 훅
 *
 * @param {Object} params - 훅 매개변수 객체
 * @param {string} params.name - 입력 필드의 고유 이름 (formData 키 값)
 * @param {Function} params.onActive - 부모 컴포넌트의 활성화 상태를 업데이트하는 콜백 함수
 * @param {Object} params.validators - 유효성 검사 규칙 객체
 * @param {Function} params.validators.fn - 유효성 검사 로직 함수 (true 반환 시 통과)
 * @param {string} params.validators.message - 유효성 검사 실패 시 표시할 에러 메시지
 * @param {Object} params.active - 버튼 활성화 조건 객체
 * @param {Function} params.active.fn - 활성화 조건 검사 함수
 * @param {Array<string>} [params.tags=[]] - 태그 입력 필드일 경우 관리되는 태그 목록
 *
 * @returns {Object} 훅 결과 객체
 * @returns {string} returns.error - 현재 발생한 에러 메시지
 * @returns {function(string): boolean} returns.handleValidation - 입력값 검증 함수 (통과 여부 반환)
 */
export function useInputValidation({
  name,
  onActive,
  validators,
  active,
  tags = [],
}) {
  const [error, setError] = useState("");

  function handleValidation(value) {
    // 버튼 활성 조건 검사
    const isValid = active.fn(name === "tags" ? tags : value);

    // 유효성 검사 (에러 메시지 및 타이핑 차단 판단)
    let errorMessage = "";
    const isPassed = validators.fn(value); // 유효하면 true, 아니면 false

    if (!isPassed) {
      errorMessage = validators.message;
    }

    // 상태 업데이트
    setError(errorMessage);
    onActive({ [name]: isValid });

    // 검증 통과 여부를 반환하여 컴포넌트가 입력을 막을 수 있게 함
    return isPassed;
  }

  return { error, handleValidation };
}
