import { notFound } from "next/navigation";
import { productApi } from "@/entities/product";
import { ProductForm } from "@/features/product-form";

export default async function EditProductPage({ params }: PageProps<"/items/[id]/edit">) {
  const { id } = await params;
  const product = await productApi.getProduct(id).catch(() => null);

  if (!product) notFound();

  return (
    <main className="mx-4 md:mx-6 lg:mx-auto lg:max-w-4xl mt-6 pb-10">
      <ProductForm
        productId={id}
        initialName={product.name}
        initialDescription={product.description}
        initialPrice={product.price}
        initialTags={product.tags}
        initialImages={product.images}
      />
    </main>
  );
}
