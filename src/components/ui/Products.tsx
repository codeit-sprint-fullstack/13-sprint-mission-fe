"use client";

import { Product } from "@/lib/ProductApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Products({ post }: { post: Product }) {
  const { id, images, name, price, favoriteCount } = post;
  const [imgSrc, setImgSrc] = useState(images?.[0] || "/images/alt_image.png");
  return (
    <Link href={`/items/${id}`}>
      <div className="rounded-2xl transition hover:shadow-md hover:-translate-y-1 duration-200">
        <header>
          <figure className="relative w-full aspect-square mb-4">
            <Image
              className="rounded-3xl object-cover"
              src={imgSrc}
              alt={name}
              fill
              sizes="20vw"
              onError={() => setImgSrc("/images/alt_image.png")}
            />
          </figure>
        </header>
        <main>
          <article className="flex flex-col text-sm gap-1.5 font-medium">
            <span>{name}</span>
            <span>{price.toLocaleString()}원</span>
            <p className="flex gap-1">
              <span>♡</span>
              {favoriteCount}
            </p>
          </article>
        </main>
      </div>
    </Link>
  );
}
