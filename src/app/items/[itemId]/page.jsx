import Image from "next/image";
import { getProduct, getProductComments } from "@/app/lib/api";
import BackToListButton from "@/app/components/ui/BackToListButton";
import ProductActions from "./ProductActions";
import FavoriteButton from "./FavoriteButton";
import CommentSection from "./CommentSection";

const PROFILE_ICON = "/icons/ic_profile.svg";
const VECTOR_IMG = "/images/Img_Vector_683.svg";

export default async function ItemDetailPage({ params }) {
  const { itemId } = await params;
  const productId = Number(itemId);

  let product = null;
  let initialComments = [];

  try {
    const [productData, commentsData] = await Promise.all([
      getProduct(productId),
      getProductComments(productId),
    ]);
    product = productData;
    initialComments = commentsData?.list ?? [];
  } catch {
    // handled below
  }

  if (!product) {
    return (
      <p className="text-center py-20 text-red-500">
        상품을 불러올 수 없습니다.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-col pb-6 border-b border-secondary-100 mb-8 gap-6 md:flex-row">
        <div>
          {product.images?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-2xl object-cover w-85.75 h-85.75 xl:w-121.25 xl:h-121.25"
            />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h1 className="text-lg sm:text-xl font-bold text-secondary-800 leading-snug flex-1">
              {product.name}
            </h1>
            <ProductActions productId={productId} ownerId={product.ownerId} />
          </div>
          <span className="text-3xl font-bold text-secondary-800 mb-4">
            {product.price.toLocaleString()}원
          </span>
          <hr className="border-secondary-100 mb-6" />
          <div className="mb-4">
            <h3 className="text-sm font-medium text-secondary-600 mb-4">
              상품 소개
            </h3>
            <span className="text-secondary-600 mb-6">
              {product.description}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-secondary-600 mb-4">
              상품 태그
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-secondary-100 rounded-full text-sm text-secondary-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm text-secondary-500 mt-auto">
            <div className="flex flex-row gap-4">
              <Image
                src={PROFILE_ICON}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-secondary-600">
                  {product.ownerNickname}
                </span>
                <span className="text-secondary-400">
                  {new Date(product.createdAt)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\. /g, ". ")}
                </span>
              </div>
            </div>
            <div className="flex gap-6">
              <Image src={VECTOR_IMG} alt="" width={1} height={34} />
              <FavoriteButton
                productId={productId}
                initialIsFavorite={product.isFavorite}
                initialFavoriteCount={product.favoriteCount}
              />
            </div>
          </div>
        </div>
      </div>

      <CommentSection productId={productId} initialComments={initialComments} />
      <BackToListButton href="/items" />
    </div>
  );
}