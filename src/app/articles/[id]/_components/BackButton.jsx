import Image from "next/image.js";
import Link from "next/link.js";
import ic_back from "@/asset/icon/ic_back.png";
import clsx from "clsx";

export default function BackButton({ className = "" }) {
  return (
    <Link
      href={"/articles"}
      className={clsx(
        "w-60 h-12 bg-primary-blue rounded-[40] flex flex-row items-center justify-center gap-2",
        className,
      )}
    >
      <span className="text-600-18 text-secondary-gray-100">
        목록으로 돌아가기
      </span>
      <Image
        src={ic_back}
        alt="뒤로가기 버튼"
        width={24}
        height={24}
        className="w-6 h-6"
      />
    </Link>
  );
}
