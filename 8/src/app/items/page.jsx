"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GNB from "@/app/components/gnb";

export default function ItemsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://panda-market-api.vercel.app/products?page=1&pageSize=10&orderBy=favorite",
        );

        const data = await response.json();

        console.log(data);

        setProducts(data.list);
      } catch (error) {
        console.error(error);
      }
    }

    getProducts();
  }, []);
  return (
    <>
      <GNB />
      <div className="inline-flex flex-col items-start gap-[40px] mt-[94px] mx-[360px]">
        <div className="flex flex-col items-start gap-[16px]">
          <p className="font-bold text-[#111827]">베스트 상품</p>
          <div className="grid grid-cols-4 border border-black">
            {products.map((product) => (
              <div key={product.id} className="rounded-xl border p-4">
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>

                <h2 className="mt-3 font-semibold">{product.name}</h2>

                <p className="mt-2 font-bold">
                  {product.price.toLocaleString()}원
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
