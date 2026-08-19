import Link from "next/link";
import Image from "next/image";

export default function SocialLoginSection() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#E6F2FF] px-6 py-4">
      <span className="roun text-lg text-gray-800">간편 로그인하기</span>
      <div className="flex gap-4 rounded-xl">
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
          <Image src="/image/ic_google.png" alt="구글 로그인" width={42} height={42} />
        </Link>
        <Link href="https://www.kakaocorp.com/page" target="_blank">
          <Image src="/image/ic_kakao.png" alt="카카오 로그인" width={42} height={42} />
        </Link>
      </div>
    </div>
  );
}