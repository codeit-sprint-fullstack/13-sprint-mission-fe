import React, { useState } from "react";

import { useNavigate } from "react-router";

import { postProduct } from "@/api/products";
import Button from "@/components/common/Button/Button";
import InputBasic from "@/components/common/formControls/InputBasic";
import InputTag from "@/components/common/formControls/InputTag";
import Textarea from "@/components/common/formControls/Textarea";
import styles from "@/pages/Registration.module.css";

export default function Registration() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 (API 요청 중 중복 제출 방지 및 UI 피드백용)
  const [tags, setTags] = useState([]); // 입력된 태그 리스트 상태 (문자열 배열)
  const [inputStatus, setInputStatus] = useState({
    name: false,
    price: false,
    description: false,
    tags: false,
  }); // 각 입력 필드의 유효성(활성화) 상태를 관리하는 객체

  /** 모든 필수 입력 필드가 유효한지 여부 (버튼 활성화 결정) */
  const isFormValid = Object.values(inputStatus).every(Boolean);
  /** 숫자만 포함되어 있는지 검사하는 정규식 함수 */
  const isNumeric = (value) => /^[0-9]+$/.test(String(value || "")); // 숫자 정규화 체크

  /**
   * 자식 컴포넌트(InputTag)로부터 전달받은 태그 배열로 상태 업데이트
   * @param {string[]} newTags - 새로운 태그 배열
   */
  function handleTagChange(newTags) {
    setTags([...newTags]);
  }

  /**
   * 상품 등록 폼 제출 핸들러
   * @param {React.SubmitEvent<HTMLFormElement>} e
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return; // 로딩 중 중복 클릭 방지

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const newFormData = Object.fromEntries(formData.entries());

      // API 스펙에 맞게 데이터 타입 및 필드 가공
      newFormData.price = Number(newFormData.price);
      newFormData.tags = tags;

      const data = await postProduct("/items", newFormData);

      // 등록 성공 시 상세 페이지로 이동
      if (data && data._id) navigate(`/items/${data._id}`);

      return data;
    } catch (error) {
      throw new Error(`❌ 상품 등록 중 오류 발생 : ${error.message}`);
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

  return (
    <main className={styles.registration}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <h1 className={styles.title}>상품 등록하기</h1>
          <Button disabled={isLoading || !isFormValid}>등록</Button>
        </header>
        <article className={styles.dataField}>
          <InputBasic
            label='상품명'
            name='name'
            type='text'
            placeholder='상품명을 입력해주세요'
            onActive={updateFieldValidity}
            validators={{
              fn: (input) => input.length === 0 || input.length <= 10,
              message: "10자 이내로 입력해주세요",
            }}
            active={{
              fn: (input) => input.length > 0,
            }}
          />
          <Textarea
            label='상품 소개'
            name='description'
            placeholder='상품 소개를 입력해주세요'
            onActive={updateFieldValidity}
            validators={{
              fn: (input) => input.length === 0 || input.length >= 10,
              message: "10자 이상 입력해주세요",
            }}
            active={{
              fn: (input) => input.length > 0,
            }}
          />
          <InputBasic
            label='판매가격'
            name='price'
            placeholder='판매 가격을 입력해주세요'
            onActive={updateFieldValidity}
            validators={{
              fn: isNumeric,
              message: "숫자로 입력해주세요",
            }}
            active={{
              fn: (input) => input.length > 0,
            }}
          />
          <InputTag
            label='태그'
            name='tags'
            type='text'
            placeholder='태그를 입력해주세요'
            onUpdate={handleTagChange}
            onActive={updateFieldValidity}
            validators={{
              fn: (input) => input.length === 0 || input.length <= 5,
              message: "5글자 이내로 입력해주세요",
            }}
            active={{
              fn: (tags) => Array.isArray(tags) && tags.length > 0,
            }}
          />
        </article>
      </form>
    </main>
  );
}
