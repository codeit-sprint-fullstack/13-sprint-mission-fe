"use client";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { createProduct, uploadProductImage } from "@/lib/ProductApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = !name.trim() || !description.trim() || !price || isLoading;
  const router = useRouter();
  const [images, setImages] = useState<{ file: File; previewUrl: string }[]>(
    [],
  );
  const MAX_IMAGES = 3;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = tagInput.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setTagInput("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`);
      e.target.value = "";
      return;
    }

    const toAdd = selected.slice(0, remaining).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const uploadedImages = await Promise.all(
        images.map((img) => uploadProductImage(img.file)),
      );
      await createProduct({
        name,
        description,
        price: Number(price),
        tags,
        images: uploadedImages,
      });
      router.push("/items");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : String(error));
      setIsLoading(false); // 실패 시에만 풀어줌 (성공 시엔 페이지 이동되므로 불필요)
    }
  };

  if (isLoading) {
    return <Loading message="상품 등록 중..." />;
  }

  return (
    // 상품 등록 헤더
    <div className="page-container mt-6 mb-38">
      <div className="flex flex-col">
        <div className=" mb-8 flex justify-between">
          <h1 className="font-bold text-[20px] py-1.25">상품 등록하기</h1>
          <Button onClick={handleSubmit} disabled={isDisabled}>
            등록
          </Button>
        </div>
        {/* 상품 이미지 등록 */}
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="font-bold text-[18px]">상품 이미지</h2>
          <div className="flex gap-3">
            {images.length < MAX_IMAGES && (
              <label className="shrink-0 flex flex-col items-center justify-center gap-1 border border-gray-300 rounded-xl bg-gray-100 text-gray-400 cursor-pointer size-50">
                <span className="text-2xl">+</span>
                <span className="text-sm">
                  이미지 등록 ({images.length}/{MAX_IMAGES})
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
            {images.map((img, i) => (
              <div key={img.previewUrl} className="relative shrink-0 size-50">
                <Image
                  src={img.previewUrl}
                  alt={`미리보기 ${i + 1}`}
                  fill
                  unoptimized
                  className="rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow cursor-pointer text-gray-500 size-6"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* 상품 등록 인풋 필드 */}
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="font-bold text-[18px]">*상품명</h2>
          <input
            placeholder="상품명을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg px-6 py-4 bg-gray-100"
          />
        </div>
        <div className="mb-6 flex flex-col gap-3">
          <h3 className="font-bold text-[18px]">*상품 소개</h3>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" w-full h-70.5 rounded-lg bg-gray-100
            px-6 py-4 resize-none"
          />
        </div>
        <div className="mb-6 flex flex-col gap-3">
          <h3 className="font-bold text-[18px]">*판매가격</h3>
          <input
            type="number"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg px-6 py-4 bg-gray-100"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[18px]">태그</h3>
          <input
            placeholder="태그를 입력하고 Enter를 눌러주세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full rounded-lg px-6 py-4 bg-gray-100"
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-4 py-1.5 bg-gray-100 rounded-3xl"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="cursor-pointer text-gray-500"
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
