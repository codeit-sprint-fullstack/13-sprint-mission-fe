"use client";

import Link from "next/link";
import type { ProductListItem } from "../types/product";

const DEFAULT_IMAGE = "https://placehold.co/300x300/f0f0f0/999?text=No+Image";

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="2"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function ProductCard({ product }: { product: ProductListItem }) {
  const price = (product.price || 0).toLocaleString("ko-KR") + "원";
  const favoriteCount = product.favoriteCount ?? 0;

  return (
    <Link href={`/items/${product.id}`} className="block">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
        <img
          className="aspect-square w-full bg-gray-100 object-cover"
          src={product.images?.[0] || DEFAULT_IMAGE}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
        <div className="p-3">
          <p className="mb-1.5 truncate text-sm text-gray-700">
            {product.name}
          </p>
          <p className="mb-2 text-base font-bold text-gray-800">{price}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <HeartIcon />
            <span>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
