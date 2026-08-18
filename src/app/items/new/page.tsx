"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/app/lib/api";
import ImageUploader from "@/app/components/ui/ImageUploader";
import type { ProductPayload } from "@/app/lib/types";

export default function NewItemPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const createMutation = useMutation({
    mutationFn: (data: ProductPayload) => createProduct(data),
    onSuccess: () => {
      router.push("/items");
    },
    onError: (err: Error) =>
      setError(err.message || "등록 중 오류가 발생했습니다."),
  });

  const isValid = name.trim() && description.trim() && price !== "";

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return; // 한글 조합 중 Enter는 무시 (조합 확정용 Enter가 먼저 발생함)
      // 한글의 경우 자음과 모음의 조합으로 한 음절이 만들어지는 조합 문자이기 때문에 글자가 조합 중인지, 조합이 끝난 상태인지를 알 수 없기 때문이다.
      // 이로 인해 키보드 이벤트에는 isComposing 이라는 입력 문자가 조합 문자인지 아닌지를 boolean값으로 반환하는 프로퍼티가 있었다. -> 저번에 멘토님이 언급해주신듯
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = () => {
    if (!isValid || createMutation.isPending) return;
    setError("");
    createMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      tags,
      images,
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-secondary-900">상품 등록하기</h1>
        <button
          onClick={handleSubmit}
          disabled={!isValid || createMutation.isPending}
          className="px-6 py-2 bg-secondary-400 text-white text-sm font-semibold rounded-lg transition-colors enabled:bg-primary enabled:hover:bg-primary-200 disabled:cursor-not-allowed"
        >
          {createMutation.isPending ? "등록 중..." : "등록"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red/10 border border-red rounded-lg text-sm text-red">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-bold text-secondary-900 mb-2">
            상품 이미지
          </label>
          <ImageUploader images={images} onChange={setImages} />
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary-900 mb-2">
            *상품명
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해주세요"
            className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary-900 mb-2">
            *상품 소개
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해주세요"
            rows={6}
            className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary-900 mb-2">
            *판매 가격
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해주세요"
            min={0}
            className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary-900 mb-2">
            태그
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="태그를 입력 후 Enter 또는 추가를 눌러주세요"
              className="flex-1 px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim()}
              className="px-4 py-3 bg-primary text-white text-sm font-medium rounded-xl disabled:bg-secondary-400 transition-colors"
            >
              추가
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 bg-secondary-100 rounded-full text-sm text-secondary-800"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-secondary-400 hover:text-secondary-600 leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
