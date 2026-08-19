import Image from "next/image";
import googleIcon from "@/assets/icons/social/ic_google.png";
import kakaoIcon from "@/assets/icons/social/ic_kakao.png";

export default function SocialLoginBox() {
  return (
    <div className="flex h-18.5 w-full flex-col items-start gap-2.5 rounded-lg bg-[#E6F2FF] px-5.75 py-4">
      <div className="flex w-full items-center justify-between">
        <div className="text-secondary-800 text-lg font-medium">
          간편 로그인하기
        </div>
        <div className="flex items-start gap-4">
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={googleIcon}
              alt="구글 아이콘"
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={kakaoIcon}
              alt="카카오 아이콘"
              className="cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
