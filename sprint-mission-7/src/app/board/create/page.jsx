"use client";

import Button from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddBoardPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});

  // 유효성 검사
  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }

    if (!form.content.trim()) {
      newErrors.content = "콘텐츠 내용을 입력해주세요";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(`http://localhost:4000/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      alert("게시글이 등록되었습니다.");
      router.push(`/board/${data.id}`);
    } catch (error) {
      console.error(error);
      alert("게시글 등록에 실패했습니다.");
      router.push(`/board`);
    }
  };

  return (
    <div className="max-w-[1200px] m-auto p-4 tablet:pt-4 px-6">
      <div className="flex justify-between items-center">
        <span className="text-gray-800 text-xl font-bold">게시글 쓰기</span>
        <Button size={"small"} variant={"secondary"} onClick={handleSubmit}>
          등록
        </Button>
      </div>
      <div className="mt-8">
        <p className="mb-3">*제목</p>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder={"제목을 입력해주세요"}
          error={errors.title}
        ></Input>
      </div>
      <div className="mt-6">
        <p className="mb-3">*내용</p>
        <TextArea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder={"내용을 입력해주세요"}
          error={errors.content}
        ></TextArea>
      </div>
    </div>
  );
}
