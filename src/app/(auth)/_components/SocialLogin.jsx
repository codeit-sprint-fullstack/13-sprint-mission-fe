import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className="flex h-[74px] w-full items-center justify-between rounded-lg bg-brand-blue-light px-6 py-4">
      <p className="text-body-md font-medium text-gray-800">간편 로그인하기</p>

      <div className="flex gap-4">
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="구글 로그인"
        >
          <Image src="/images/ic_google.svg" alt="" width={42} height={42} />
        </a>

        <a
          href="https://www.kakaocorp.com/page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오 로그인"
        >
          <Image src="/images/ic_kakao.svg" alt="" width={42} height={42} />
        </a>
      </div>
    </div>
  );
}
