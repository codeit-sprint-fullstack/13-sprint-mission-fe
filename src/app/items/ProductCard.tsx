import Link from 'next/link';
import ArticleImage from '@/app/components/ArticleImage';
import { getProductImageUrl } from '@/lib/products';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  preload?: boolean;
  sizes?: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

export default function ProductCard({ product, preload, sizes }: ProductCardProps) {
  const favoriteCount = product.likeCount ?? product.favoriteCount ?? 0;

  return (
    <Link href={`/items/${product.id}`} className="group block">
      <ArticleImage
        src={getProductImageUrl(product)}
        alt={product.name}
        width={240}
        height={240}
        sizes={sizes}
        preload={preload}
        className="aspect-square w-full rounded-xl object-cover ring-1 ring-slate-100"
      />
      <h2 className="mt-3 line-clamp-1 text-base font-semibold text-[#1F2937]">
        {product.name}
      </h2>
      <p className="mt-1 text-sm font-bold text-[#1F2937]">{formatPrice(product.price)}원</p>
      <p className="mt-1 text-sm text-[#6B7280]" aria-label={`좋아요 ${favoriteCount}개`}>
        <span aria-hidden="true">♡ </span>
        {favoriteCount}
      </p>
    </Link>
  );
}
