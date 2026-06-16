"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import InputBasic from "@/components/common/InputBasic";
import Textarea from "@/components/common/Textarea";
import { useRouter } from "next/navigation";
import LoadingDisplay from "@/components/ui/LoadingDisplay";

export default function ArticleForm({ defaultValue = null, articleId = null }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 (API 요청 중 중복 제출 방지 및 UI 피드백용)
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 완료 상태

  // 필드별 유효성 통과 여부. defaultValue가 있으면 초기값부터 valid로 간주
  const [inputStatus, setInputStatus] = useState({
    title: !!defaultValue?.title,
    content: !!defaultValue?.content,
  });

  // 현재 입력값 (수정 모드에서 변경 여부 체크용)
  const [formValues, setFormValues] = useState({
    title: defaultValue?.title ?? "",
    content: defaultValue?.content ?? "",
  });

  const isEditMode = !!defaultValue; // 수정 모드

  // 모든 필수 입력 필드가 유효한지 여부 (버튼 활성화 결정)
  const isFormValid = Object.values(inputStatus).every(Boolean);

  // 수정 모드: 기존 값과 달라야 true / 신규 작성: 항상 true
  const isChanged = isEditMode
    ? formValues.title !== (defaultValue?.title ?? "") ||
      formValues.content !== (defaultValue?.content ?? "")
    : true; // 신규 작성은 항상 true (isFormValid로만 판단

  const isButtonDisabled =
    isLoading || isSubmitted || !isFormValid || (isEditMode && !isChanged);

  /**
   * 상품 등록 폼 제출 핸들러
   * @param {React.SubmitEvent<articlesHTMLFormElement>} e
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return; // 로딩 중 중복 클릭 방지
    setError(null); // 재시도 시 이전 에러 초기화

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const newFormData = Object.fromEntries(formData.entries());

      const url = isEditMode ? `/api/articles/${articleId}` : "/api/articles";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFormData),
      });

      if (!res.ok)
        throw new Error(
          `게시글 ${isEditMode ? "수정" : "등록"}에 실패했습니다.`,
        );

      const data = await res.json();
      const id = data?.data?.id ?? articleId;

      // 등록 성공 시 상세 페이지로 이동
      if (id) {
        setIsSubmitted(true); // 성공 후 finally에서도 다시 풀리지 않도록 고정
        router.push(`/articles/${id}`);
      }

      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // 컴포넌트가 마운트된 상태라면 로딩 종료
    }
  }

  /**
   * 개별 인풋의 활성화 상태를 병합하여 업데이트
   * @param {Object} statusUpdate - 업데이트할 필드의 상태 객체 (예: { name: true })
   */
  function updateFieldValidity(statusUpdate) {
    setInputStatus((prev) => ({ ...prev, ...statusUpdate }));
  }

  /**
   * 입력값 변경 시 formValues 상태를 업데이트
   * @param {string} name - 변경된 필드명 (예: "title", "content")
   * @param {string} value - 변경된 입력값
   */
  function handleInputChange(name, value) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 타이틀 + 등록 버튼 */}
      <div className='flex justify-between items-center mb-[24px] md:mb-[32px] '>
        <h1 className='text-[20px]/[calc(24/20)] font-bold text-secondary-800'>
          {isEditMode ? "게시글 수정" : "게시글 쓰기"}
        </h1>
        <Button disabled={isButtonDisabled}>
          {isLoading ? (
            <LoadingDisplay size='20' fullHeight={false} />
          ) : isEditMode ? (
            "수정"
          ) : (
            "등록"
          )}
        </Button>
      </div>

      {/* 인풋 섹션 */}
      <article className='flex flex-col space-y-[16px] md:space-y-[24px]'>
        <InputBasic
          label='제목'
          name='title'
          type='text'
          placeholder='제목을 입력해주세요'
          defaultValue={defaultValue?.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input.length === 0 || input.length <= 50,
            message: "50자 이내로 입력해주세요",
          }}
          active={{
            fn: (input) => input.length > 0,
          }}
        />
        <Textarea
          label='내용'
          name='content'
          type='text'
          placeholder='내용을 입력해주세요'
          defaultValue={defaultValue?.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input.length === 0 || input.length <= 500,
            message: "500자 이내로 입력해주세요",
          }}
          active={{
            fn: (input) => input.length > 0,
          }}
        />
      </article>

      {/* TODO: 추후 토스트로 수정하기 */}
      {error && (
        <p className='text-error-red text-[14px] mt-[50px] text-center'>
          {error}
        </p>
      )}
    </form>
  );
}
