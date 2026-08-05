'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

const INPUT_CLS =
  'w-full rounded-xl border-0 bg-[#F3F4F6] px-6 text-base text-[#1F2937] placeholder:text-[#9CA3AF] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]';

export interface PostFormValues {
  title: string;
  content: string;
}

interface PostFormProps {
  initial?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => void | Promise<void>;
  heading?: string;
  submitLabel?: string;
}

// 작성/수정 공통 폼. initial에 id가 있으면 수정 모드 (작성자 입력 숨김)
export default function PostForm({
  initial = {},
  onSubmit,
  heading = '게시글 쓰기',
  submitLabel = '등록',
}: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>({
    title: initial.title ?? '',
    content: initial.content ?? '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValid = values.title.trim() && values.content.trim();

  function update(field: keyof PostFormValues) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit({
        title: values.title.trim(),
        content: values.content.trim(),
      });
    } catch (submitError) {
      console.error(submitError);
      setError('저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1F2937]">{heading}</h1>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex h-12 w-[74px] items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
        >
          {isSubmitting ? '저장 중 ...' : submitLabel}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-xl font-bold text-[#1F2937]">*제목</label>
        <input
          className={`${INPUT_CLS} h-14`}
          placeholder="제목을 입력해주세요"
          maxLength={100}
          value={values.title}
          onChange={update('title')}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-xl font-bold text-[#1F2937]">*내용</label>
        <textarea
          className={`${INPUT_CLS} min-h-[260px] resize-none py-5`}
          placeholder="내용을 입력해주세요"
          value={values.content}
          onChange={update('content')}
        />
      </div>

      <p role="alert" className="min-h-5 text-sm text-rose-500">{error}</p>
    </form>
  );
}
