import { ProductCard, type Product } from "@/entities/product";

const BEST_ITEM_CLASS = ["", "hidden md:block", "hidden lg:block", "hidden lg:block"];

export default function BestProductSection({ products }: { products: Product[] }) {
  return (
    <div className="mt-7">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">베스트 상품</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <li key={product.id} className={BEST_ITEM_CLASS[index]}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
