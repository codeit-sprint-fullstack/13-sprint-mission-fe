"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchInstance } from "@/lib/fetchInstance";

const MAX_IMAGES = 3;

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) router.push("/signin");
  }, []);

  const isValid = title.trim() && content.trim();

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remaining = MAX_IMAGES - images.length;
    const selected = files.slice(0, remaining);

    const newPreviews = selected.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const token = localStorage.getItem("accessToken");
    const uploaded = await Promise.all(
      selected.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(`${BASE_URL}/images/upload`, {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        });
        const data = await res.json();
        return data.url;
      })
    );

    setImages((prev) => [...prev, ...uploaded]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const data = await fetchInstance("/articles", {
      method: "POST",
      body: JSON.stringify({ title, content, images }),
    });
    router.push(`/freeboard/${data.id}`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">게시글 등록하기</h2>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`btn_small_40 ${!isValid ? "cursor-not-allowed opacity-50" : ""}`}
        >
          등록
        </button>
      </div>

      <div className="mb-4 flex flex-col">
        <label className="text-md font-bold text-gray-800 md:text-2lg">*제목</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-3 w-full rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-bold text-gray-800 md:text-2lg">*내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-3 h-70.5 w-full rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-bold text-gray-800 md:text-2lg">이미지</label>
        <div className="mt-3 flex flex-wrap gap-4">
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[168px] w-[168px] flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 text-gray-400 lg:h-[282px] lg:w-[282px]"
            >
              <span className="text-4xl">+</span>
              <span className="text-base">이미지 등록</span>
            </button>
          )}
          {previews.map((src, i) => (
            <div key={i} className="relative h-[168px] w-[168px] lg:h-[282px] lg:w-[282px]">
              <Image
                src={src}
                alt={`preview-${i}`}
                fill
                className="rounded-xl object-cover"
                unoptimized
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}
