"use client";

import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProduct, favoriteProduct, unfavoriteProduct } from "@/app/lib/api";
import type { Product } from "@/app/lib/types";

const HEART_ICON = "/icons/ic_heart.svg";
const HEART_FILLED_ICON = "/icons/ic_heart_filled.svg";

interface FavoriteButtonProps {
  productId: number;
  initialIsFavorite?: boolean;
  initialFavoriteCount?: number;
}

export default function FavoriteButton({
  productId,
  initialIsFavorite,
  initialFavoriteCount,
}: FavoriteButtonProps) {
  const queryClient = useQueryClient();

  const { data: product } = useQuery<Pick<Product, "isLiked" | "_count">>({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    initialData: {
      isLiked: initialIsFavorite,
      _count: { likes: initialFavoriteCount ?? 0 },
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      product?.isLiked
        ? unfavoriteProduct(productId)
        : favoriteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["best-products"] });
    },
  });

  return (
    <button
      onClick={() => favoriteMutation.mutate()}
      className="flex items-center gap-1 px-3 py-1 border border-secondary-200 rounded-4xl text-secondary-500"
    >
      <Image
        src={product?.isLiked ? HEART_FILLED_ICON : HEART_ICON}
        alt=""
        width={16}
        height={16}
      />
      <span>{product?._count?.likes}</span>
    </button>
  );
}