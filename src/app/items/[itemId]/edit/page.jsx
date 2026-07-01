"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/app/lib/api";
import Modal from "@/app/components/common/Modal";

const getProduct = async (itemId) => {
  const response = await api.get(`/products/${itemId}`, {
    requiresAuth: true,
  });

  return response.data;
};

const updateProduct = async ({ itemId, productData }) => {
  const response = await api.patch(`/products/${itemId}`, productData, {
    requiresAuth: true,
  });

  return response.data;
};

const parseTags = (tagsText) =>
  tagsText
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean);

function ProductEditForm({ itemId, product }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(String(product.price || ""));
  const [description, setDescription] = useState(product.description || "");
  const [tagsText, setTagsText] = useState((product.tags || []).join(", "));
  const [imageUrl, setImageUrl] = useState(product.images?.[0] || "");
  const [formError, setFormError] = useState("");

  const isFormValid = useMemo(() => {
    return (
      name.trim().length > 0 &&
      description.trim().length > 0 &&
      Number(price) > 0
    );
  }, [description, name, price]);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateProduct({
        itemId,
        productData: {
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          tags: parseTags(tagsText),
          images: imageUrl.trim() ? [imageUrl.trim()] : [],
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", itemId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push(`/items/${itemId}`);
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.message;
      setFormError(serverMessage || "상품 수정에 실패했습니다.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!isFormValid || updateMutation.isPending) {
      return;
    }

    updateMutation.mutate();
  };

  return (
    <div className="w-full pb-20 pt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-panda-900">상품 수정하기</h1>
          <div className="flex gap-3">
            <Link
              href={`/items/${itemId}`}
              className="flex h-12 items-center justify-center rounded-xl bg-panda-200 px-6 text-base font-semibold text-panda-600 transition-colors hover:bg-panda-300"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={!isFormValid || updateMutation.isPending}
              className={`h-12 rounded-xl px-8 text-base font-semibold transition-colors ${
                isFormValid && !updateMutation.isPending
                  ? "bg-brand-blue text-white hover:bg-brand-hover"
                  : "cursor-not-allowed bg-panda-300 text-white"
              }`}
            >
              {updateMutation.isPending ? "수정 중..." : "수정"}
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-panda-200" />

        <div className="grid gap-6">
          <div>
            <label
              htmlFor="name"
              className="mb-3 block text-lg font-semibold text-panda-900"
            >
              *상품명
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="상품명을 입력해주세요"
              className="w-full rounded-2xl border border-transparent bg-panda-100 px-6 py-4 text-panda-900 outline-none transition-all placeholder:text-panda-400 focus:border-brand-blue focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-3 block text-lg font-semibold text-panda-900"
            >
              *가격
            </label>
            <input
              id="price"
              type="number"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="가격을 입력해주세요"
              className="w-full rounded-2xl border border-transparent bg-panda-100 px-6 py-4 text-panda-900 outline-none transition-all placeholder:text-panda-400 focus:border-brand-blue focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-3 block text-lg font-semibold text-panda-900"
            >
              *상품 소개
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="상품 소개를 입력해주세요"
              className="h-[260px] w-full resize-none rounded-2xl border border-transparent bg-panda-100 px-6 py-4 leading-relaxed text-panda-900 outline-none transition-all placeholder:text-panda-400 focus:border-brand-blue focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="mb-3 block text-lg font-semibold text-panda-900"
            >
              태그
            </label>
            <input
              id="tags"
              type="text"
              value={tagsText}
              onChange={(event) => setTagsText(event.target.value)}
              placeholder="쉼표로 태그를 구분해주세요"
              className="w-full rounded-2xl border border-transparent bg-panda-100 px-6 py-4 text-panda-900 outline-none transition-all placeholder:text-panda-400 focus:border-brand-blue focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="mb-3 block text-lg font-semibold text-panda-900"
            >
              이미지 URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="이미지 URL을 입력해주세요"
              className="w-full rounded-2xl border border-transparent bg-panda-100 px-6 py-4 text-panda-900 outline-none transition-all placeholder:text-panda-400 focus:border-brand-blue focus:bg-white"
            />
          </div>
        </div>
      </form>

      <Modal
        open={Boolean(formError)}
        title="수정 실패"
        message={formError}
        onClose={() => setFormError("")}
        labelledBy="update-product-error-title"
      />
    </div>
  );
}

export default function ItemEditPage() {
  const params = useParams();
  const itemId = params.itemId;

  const productQuery = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProduct(itemId),
    enabled: Boolean(itemId),
    staleTime: 1000 * 30,
  });

  if (productQuery.isLoading) {
    return (
      <div className="w-full py-32 text-center text-base font-medium text-panda-400">
        상품 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (productQuery.isError) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-lg bg-white px-4 text-center">
        <p className="text-lg font-bold text-panda-900">
          상품 정보를 불러오지 못했습니다.
        </p>
        <Link
          href={`/items/${itemId}`}
          className="mt-6 rounded-lg bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          상세 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  return <ProductEditForm itemId={itemId} product={productQuery.data} />;
}
