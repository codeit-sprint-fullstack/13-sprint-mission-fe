import Image from "next/image";
import Shimmer from "./Shimmer";

export default function ItemSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-[16px]">
      <Shimmer className="aspect-square w-full rounded-[16px] bg-secondary-200" />

      <div className="flex flex-col gap-[8px]">
        <div className="h-[24px] w-[80%] rounded-[16px] bg-secondary-200" />

        <div className="h-[26px] w-[50%] rounded-[16px] bg-secondary-200" />

        <div className="flex items-center gap-[2px]">
          <Image
            src="/icons/ic_heart_empty.svg"
            alt="좋아요 아이콘"
            width={16}
            height={16}
          />
          <div className="h-[18px] w-[15%] rounded-[16px] bg-secondary-200" />
        </div>
      </div>
    </div>
  );
}
