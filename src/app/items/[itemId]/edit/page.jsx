"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";
import { getProduct, updateProduct } from "@/app/lib/api";

export default function ItemEditPage({ params }) {
  const { itemId } = use(params);
  const productId = Number(itemId);

  const router = useRouter();
  const { user, isInitialized } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [prefilled, setPrefilled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace(`/login?redirect=/items/${itemId}/edit`);
    }
  }, [isInitialized, user, router, itemId]);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  useEffect(() => {
    if (product && !prefilled) {
      setName(product.name ?? "");
      setDescription(product.description ?? "");
      setPrice(String(product.price ?? ""));
      setTags(product.tags ?? []);
      setPrefilled(true);
    }
  }, [product, prefilled]);

  useEffect(() => {
    if (product && user && user.id !== product.ownerId) {
      router.replace(`/items/${itemId}`);
    }
  }, [product, user, router, itemId]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateProduct(productId, data),
    onSuccess: () => router.push(`/items/${itemId}`),
    onError: (err) => setError(err.message || "수정 중 오류가 발생했습니다."),
  });

  const isValid = name.trim() && description.trim() && price !== "";

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = () => {
    if (!isValid || updateMutation.isPending) return;
    setError("");
    updateMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      tags,
      images: product?.images ?? [],
    });
  };

  if (!isInitialized || isLoading)
    return <p className="text-center py-20 text-secondary-500">로딩 중...</p>;
  if (!user || !product) return null;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-secondary-900">상품 수정</h1>
        <button
          onClick={handleSubmit}
          disabled={!isValid || updateMutation.isPending}
          className="px-6 py-2 bg-secondary-400 text-white text-sm font-semibold rounded-lg transition-colors enabled:bg-primary enabled:hover:bg-primary-200 disabled:cursor-not-allowed"
        >
          {updateMutation.isPending ? "수정 중..." : "수정"}
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
