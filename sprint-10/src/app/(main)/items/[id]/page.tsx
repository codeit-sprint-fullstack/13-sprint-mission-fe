import Link from "next/link";
import ProductSection from "./_components/ProductSection";
import ProductCommentSection from "./_components/ProductCommentSection";

export default async function ProductDetailPage({ params }: PageProps<"/items/[id]">) {
  const { id } = await params;

  return (
    <main className="mx-4 md:mx-6 lg:mx-auto lg:max-w-4xl mt-6 flex flex-col gap-6 pb-10">
      <ProductSection productId={id} />
      <ProductCommentSection productId={id} />

      <div className="flex justify-center">
        <Link
          href="/items"
          className="flex items-center gap-2 bg-primary-100 hover:bg-primary-200 text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          목록으로 돌아가기
          <span>↩</span>
        </Link>
      </div>
    </main>
  );
}
