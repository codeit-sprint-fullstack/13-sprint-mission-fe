import getQueryClient from "@/lib/getQueryClient";
import { getProductsById } from "@/lib/ProductApi";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import Inquiry from "./_components/Inquiry";
import ProductsDetail from "./_components/ProductsDetail";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // 진입 차단은 middleware가 하고, 여기선 토큰을 실어 프리페치한다.
  const token = (await cookies()).get("accessToken")?.value ?? null;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => getProductsById(id, token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="page-container">
        <ProductsDetail productId={id} />
        <Inquiry productId={id} />
      </div>
    </HydrationBoundary>
  );
}
