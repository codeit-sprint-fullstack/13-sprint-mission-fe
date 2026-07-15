"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { getProduct, updateProduct } from "@/api/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const MAX_IMAGES = 3;

export default function ItemEditPage() {
  const { itemsId: itemId } = useParams();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [modalMessage, setModalMessage] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/signin");
  }, []);

  const { data: product } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProduct(itemId),
    enabled: !!itemId,
  });

  useEffect(() => {
    if (product) {
      setName(product.name ?? "");
      setPrice(product.price?.toString() ?? "");
      setDescription(product.description ?? "");
      setTags(product.tags ?? []);
      setImages(product.images ?? []);
      setPreviews(product.images ?? []);
    }
  }, [product]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > MAX_IMAGES) {
      setModalMessage(`이미지는 최대 ${MAX_IMAGES}개까지 등록 가능합니다.`);
      return;
    }

    const token = localStorage.getItem("accessToken");
    const uploadedUrls = [];
    const newPreviews = [];

    for (const file of files) {
      newPreviews.push(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(`${BASE_URL}/images/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        uploadedUrls.push(data.url);
      } catch {
        setModalMessage("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutate: editProduct } = useMutation({
    mutationFn: () =>
      updateProduct(itemId, { name, price: Number(price), description, tags, images }),
    onSuccess: () => router.push(`/items/${itemId}`),
    onError: () => setModalMessage("상품 수정에 실패했습니다.\n다시 시도해 주세요."),
  });

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tag) => setTags((prev) => prev.filter((t) => t !== tag));

  const isValid = name.trim() && price && description.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    editProduct();
  };

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 md:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">상품 수정</h2>
        <button
          form="edit-form"
          type="submit"
          disabled={!isValid}
          className="bg-primary-100 rounded-lg px-5 py-2 text-lg font-semibold text-white disabled:bg-gray-400"
        >
          수정
        </button>
      </div>

      <form id="edit-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* 이미지 업로드 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">상품 이미지</label>
          <div className="flex flex-wrap gap-4">
            {previews.map((src, i) => (
              <div key={i} className="relative h-[162px] w-[162px]">
                <Image
                  src={src}
                  alt={`이미지 ${i + 1}`}
                  fill
                  className="rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800/60 text-white"
                >
                  ✕
                </button>
              </div>
            ))}
            {images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-[162px] w-[162px] flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 text-gray-400"
              >
                <span className="text-3xl">+</span>
                <span className="text-sm">이미지 등록</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
          <p className="text-sm text-gray-400">최대 {MAX_IMAGES}개까지 등록 가능합니다.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">상품명</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해 주세요"
            className="h-14 w-full rounded-xl bg-gray-100 px-6 text-lg text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">판매 가격</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
            className="h-14 w-full rounded-xl bg-gray-100 px-6 text-lg text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">상품 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해 주세요"
            rows={6}
            className="w-full resize-none rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">태그</label>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="태그를 입력 후 Enter"
              className="h-14 flex-1 rounded-xl bg-gray-100 px-6 text-lg text-gray-800 placeholder-gray-400 outline-none"
            />
            <button type="button" onClick={addTag} className="btn_small_40 px-4">
              추가
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-[26px] bg-gray-100 px-4 py-1.5 text-lg text-gray-800"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </form>

      <div className="flex justify-center">
        <button onClick={() => router.back()} className="text-gray-500 underline">
          취소
        </button>
      </div>

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="flex h-[220px] w-[327px] flex-col items-center justify-center gap-[42px] rounded-lg bg-white px-[90px] py-[23px] md:h-[250px] md:w-[540px] md:gap-10 md:px-[187px] md:py-[40px]">
            <p className="whitespace-pre-line text-center text-lg text-gray-800">
              {modalMessage}
            </p>
            <button
              onClick={() => setModalMessage("")}
              className="bg-primary-100 h-12 w-[120px] rounded-lg px-[23px] py-3 text-lg text-white md:w-[165px]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
