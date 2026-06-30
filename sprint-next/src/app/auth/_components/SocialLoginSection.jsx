import Image from "next/image";
import GoogleLogo from "@/assets/png/img_google_logo.png";
import KakaoLogo from "@/assets/png/img_kakao_logo.png";

export default function SocialLoginSection() {
  return (
    <div className="flex items-center justify-between bg-sky-50 border border-sky-100 rounded-xl px-6 py-4">
      <p className="text-sm font-medium text-gray-700">간편 로그인하기</p>
      <div className="flex gap-4">
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
          aria-label="구글 로그인"
        >
          <Image src={GoogleLogo} alt="구글 로그인" width={24} height={24} className="w-6 h-6" />
        </a>
        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center hover:shadow-md transition-shadow"
          aria-label="카카오 로그인"
        >
          <Image src={KakaoLogo} alt="카카오 로그인" width={24} height={24} className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
