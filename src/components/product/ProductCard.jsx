"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/lib/api";
import { queryKeys } from "@/lib/queries";

export default function ProductCard({ product }) {
  const queryClient = useQueryClient();
  const image =
    product.images?.[0] || "https://picsum.photos/seed/panda-market/640/480";

  const prefetchDetail = () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.product(product.id),
      queryFn: () => productApi.detail(product.id),
      staleTime: 1000 * 60,
    });
  };

  return (
    <Link
      className="grid min-w-0 gap-2"
      href={`/items/${product.id}`}
      onMouseEnter={prefetchDetail}
      onFocus={prefetchDetail}
    >
      <span className="block aspect-square overflow-hidden rounded-lg bg-[#f3f4f6]">
        <img
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-[1.03]"
          src={image}
          alt={product.name}
        />
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
        {product.name}
      </span>
      <strong>{product.price.toLocaleString("ko-KR")}원</strong>
      <span className="inline-flex items-center gap-1 text-[13px] text-[#6b7280]">
        <Heart size={14} />
        {(product.favoriteCount ?? 0).toLocaleString("ko-KR")}
      </span>
    </Link>
  );
}
