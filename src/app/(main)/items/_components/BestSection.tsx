import ProductCard from "./ProductCard";
import type { ProductListItem } from "@/types/product";

interface BestSectionProps {
  items: ProductListItem[];
  onToggleLike: (id: number, isLiked: boolean) => void;
}

export default function BestSection({ items, onToggleLike }: BestSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[20px] font-bold">베스트 상품</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2.5 lg:grid-cols-4 lg:gap-6">
        {items?.map((item) => (
          <ProductCard key={item.id} item={item} onToggleLike={onToggleLike} />
        ))}
      </div>
    </div>
  );
}