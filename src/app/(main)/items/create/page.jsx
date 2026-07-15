"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/api/config";

export default function Page() {
  const router = useRouter();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const isReady =
    productData.name.trim() &&
    productData.description.trim() &&
    productData.price &&
    images.length > 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isReady || isPending) return;

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    tags.forEach((tag) => formData.append("tags", tag));
    images.forEach((file) => formData.append("images", file));

    setIsPending(true);
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      router.push("/items");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsPending(false);
    }
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const value = tagInput.trim();
    if (!value || tags.includes(value)) {
      setTagInput("");
      return;
    }
    if (tags.length >= 5) {
      alert("태그는 최대 5개까지 등록 가능합니다.");
      return;
    }

    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const deleteTag = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const urls = images.map((image) => URL.createObjectURL(image));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewImages(urls);
    console.log(images);
    //클린업 함수
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <form className="mt-[20px]" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-secondary-800 text-[20px] font-bold">
          상품 등록하기
        </h1>
        <button
          className="text-cool-gray-100 bg-brand-blue disabled:bg-secondary-400 rounded-[8px] px-[23px] py-[12px] text-[16px] font-[600] disabled:cursor-not-allowed"
          disabled={!isReady || isPending}
        >
          등록
        </button>
      </div>

      <div className="mt-[32px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <label className="text-[18px] font-bold">상품 이미지</label>
          <div className="flex gap-[12px]">
            <label className="bg-cool-gray-100 flex h-[168px] w-[168px] cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[12px]">
              <span className="text-secondary-400 text-[32px]">+</span>
              <span className="text-secondary-400 text-[14px]">
                {images.length}/3
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (images.length + files.length > 3)
                    return alert("이미지는 최대 3개만 가능합니다.");
                  setImages((prev) => [...prev, ...files]);
                  e.target.value = "";
                }}
              />
            </label>

            {previewImages.map((url, index) => (
              <div
                key={url}
                className="relative h-[168px] w-[168px] overflow-hidden rounded-[12px]"
              >
                <img
                  src={url}
                  alt={`상품 이미지 미리보기 ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 w-4 cursor-pointer rounded-[8px] border-none bg-white"
                  onClick={() => deleteImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <label htmlFor="name" className="text-[18px] font-bold">
            상품명
          </label>
          <input
            id="name"
            className="bg-cool-gray-100 rounded-[12px] border border-none px-[24px] py-[16px] focus:outline-none"
            placeholder="상품명을 입력해주세요"
            value={productData.name}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-[12px]">
          <label htmlFor="description" className="text-[18px] font-bold">
            상품 소개
          </label>
          <textarea
            id="description"
            className="bg-cool-gray-100 h-[282px] resize-none rounded-[12px] border-none px-[24px] py-[16px] focus:outline-none"
            placeholder="상품 소개를 입력해주세요"
            value={productData.description}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-[12px]">
          <label htmlFor="price" className="text-[18px] font-bold">
            판매가격
          </label>
          <input
            id="price"
            type="number"
            className="bg-cool-gray-100 rounded-[12px] border border-none px-[24px] py-[16px] focus:outline-none"
            placeholder="판매가격을 입력해주세요"
            value={productData.price}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-[12px]">
          <label htmlFor="tags" className="text-[18px] font-bold">
            태그
          </label>
          <input
            id="tags"
            className="bg-cool-gray-100 rounded-[12px] border border-none px-[24px] py-[16px] focus:outline-none"
            placeholder="태그를 입력 후 Enter를 눌러주세요"
            maxLength={10}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-[8px]">
              {tags.map((tag, index) => (
                <span
                  key={tag}
                  className="bg-cool-gray-100 text-secondary-800 flex items-center gap-[6px] rounded-[8px] px-[12px] py-[6px] text-[14px]"
                >
                  {tag}
                  <button
                    type="button"
                    className="text-secondary-400 cursor-pointer border-none bg-transparent"
                    onClick={() => deleteTag(index)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
