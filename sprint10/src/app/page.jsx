import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-[100px] gap-8">
      <h1 className="font-['Pretendard'] text-[40px] font-bold text-[#1F2937]">
        판다마켓에 오신 것을 환영합니다!
      </h1>
      <p className="font-['Pretendard'] text-[18px] text-[#6B7280]">

      </p>
      <Link href="/items" className="rounded-xl bg-[#3692FF] px-6 py-3 text-white font-bold hover:bg-blue-600 transition-colors">
        상품 구경하러 가기
      </Link>
    </div>
  );
}