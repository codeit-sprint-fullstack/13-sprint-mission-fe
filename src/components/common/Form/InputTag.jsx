import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";

import deleteImage from "@/app/assets/ic_delete_tag.svg";
import FormLabel from "@/components/common/Form/FormLabel";

import { useInputValidation } from "@/hooks/useValidators";


export default function InputTag({
  label = "",
  onUpdate,
  className,
  onActive,
  defaultValue = [],
  ...props
}) {
  const inputRef = useRef(); // 인풋창 초기화 및 포커스를 위한 Ref

  const [tags, setTags] = useState(defaultValue); // 현재 등록된 태그들의 문자열 배열
  const [inputText, setInputText] = useState(""); // 사용자가 현재 입력 중인 텍스트
  // 한글 조합(Composition) 중 엔터 입력 시 중복 실행 방지를 위한 상태
  const [isComposing, setIsComposing] = useState(false);

  // 유효성 검사 커스텀 훅: 에러 메시지와 검증 함수를 반환
  const { error, handleValidation } = useInputValidation({
    name: props.name,
    onActive,
    validators: props.validators,
    active: props.active,
    tags: tags,
  });

  /**
   * 태그 추가 핸들러: 엔터 키 입력 시 태그를 배열에 추가
   * @param {React.KeyboardEvent} e
   */
  function handleAdd(e) {
    // 한글 조합 중에는 엔터 이벤트가 중복 발생할 수 있으므로 차단
    if (isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();

      if (inputText.trim() === "") return;

      // 중복 태그 입력 방지: 이미 있다면 인풋만 비우고 종료
      if (tags.includes(inputText)) {
        inputRef.current.value = "";
        return;
      }

      const newTags = [inputText.trim(), ...tags];
      setTags(newTags);
      onUpdate(newTags);

      // 인풋 상태 초기화
      inputRef.current.value = "";
      setInputText("");
    }
  }

  /**
   * 태그 삭제 핸들러: 특정 태그를 배열에서 제거
   * @param {string} tag - 삭제할 태그 문자열
   */
  function handleDelete(tag) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    // 삭제 후에도 부모 컴포넌트의 상태를 동기화
    if (onUpdate) onUpdate(newTags);
  }

  /**
   * 인풋 값 변경 핸들러: 유효성 검사 통과 시에만 상태 업데이트
   * @param {string} value - 입력된 문자열
   */
  function handleChange(value) {
    // 검증을 통과한 경우에만 화면에 입력값을 반영
    const isPassed = handleValidation(value);

    if (!isPassed) return;

    if (isPassed) {
      setInputText(value);
    }
  }

  /**
   * 태그 리스트(tags)가 변경될 때마다 현재 입력 중인 텍스트의 유효성 재검사
   * (예: 태그 개수 제한이나 중복 여부를 실시간으로 반영하기 위함)
   */
  useEffect(() => {
    handleValidation(inputText);
  }, [tags]);

  return (
    <label
      className={clsx(error && "[&_input]:border [&_input]:border-error-red")}
    >
      {label && <FormLabel label={label} />}
      <input
        className={clsx(
          "flex items-start w-full h-[56px] px-[24px] py-[16px] gap-[10px] rounded-[12px] leading-[calc(26/16)] text-secondary-800 bg-cool-gray-100 placeholder:text-secondary-400",
          className,
        )}
        {...props}
        value={inputText}
        onKeyDown={handleAdd}
        ref={inputRef}
        onChange={(e) => handleChange(e.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
      {error && (
        <span className='inline-block ml-[16px] mt-[8px] text-[14px] leading-[calc(24/14)] text-error-red'>
          {error}
        </span>
      )}

      <div className='flex flex-wrap content-center gap-[12px] mt-[14px]'>
        {tags.map((tag, i) => (
          <p
            className='relative inline-flex items-center h-[36px] py-[6px] pr-[42px] pl-[16px] rounded-[26px] leading-[calc(26/16)] text-secondary-800 bg-cool-gray-100 cursor-pointer'
            key={i}
          >
            {`#${tag}`}
            <button
              className='absolute w-[22px] h-[24px] top-1/2 right-[12px] -translate-y-1/2 cursor-pointer'
              type='button'
              onClick={() => handleDelete(tag)}
              aria-label={`${tag} 태그 삭제`}
            >
              <Image
                className='w-full h-full object-cover'
                src={deleteImage}
                width={22}
                height={24}
                aria-hidden='true'
                alt='태그 삭제 아이콘 이미지'
              />
            </button>
          </p>
        ))}
      </div>
    </label>
  );
}
