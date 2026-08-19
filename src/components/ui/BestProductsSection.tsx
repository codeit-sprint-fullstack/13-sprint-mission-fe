"use client";

import { getBestProduct } from "@/lib/ProductApi";
import { useQuery } from "@tanstack/react-query";
import BestProducts from "./BestProducts";

export default function BestProductsSection() {
  const { data: bestProducts = [] } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: getBestProduct,
  });

  return bestProducts.map((product) => (
    <BestProducts key={product.id} post={product} />
  ));
}
