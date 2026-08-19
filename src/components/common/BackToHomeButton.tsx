import Link from "next/link";
import Image from "next/image";
import backIcon from "@/assets/icons/ic_back.svg";

export default function BackToHomeButton({ type = "item" }) {
  return (
    <Link
      href={type === "item" ? "/items" : "/"}
      type="button"
      className="btn flex h-12 w-60 items-center justify-center gap-2 rounded-[2.5rem] px-6"
    >
      <span className="text-cool-gray-100 text-[1.125rem] font-semibold whitespace-nowrap">
        목록으로 돌아가기
      </span>

      <div className="relative h-6 w-6 shrink-0">
        <Image src={backIcon} alt="뒤로가기 아이콘" fill />
      </div>
    </Link>
  );
}
