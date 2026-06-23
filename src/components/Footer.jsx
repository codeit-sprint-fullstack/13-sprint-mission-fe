export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-gray-900">
      <div className="mx-auto w-full max-w-[1200px] min-h-[120px] px-4 py-8 md:px-6">
        {/* 데스크탑: 한 줄 / 모바일: 두 줄 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* 저작권 — 모바일에선 맨 아래로, 데스크탑에선 맨 왼쪽 */}
          <p className="order-last text-base text-gray-400 md:order-first">
            ©codeit - 2024
          </p>

          {/* 링크 + SNS 묶음 — 모바일에서 한 줄(좌우 양끝), 데스크탑에선 펼침 */}
          <div className="flex items-center justify-between gap-4 md:contents">
            <div className="flex gap-[30px]">
              <a href="/privacy" className="whitespace-nowrap text-[#cfcfcf]">
                Privacy Policy
              </a>
              <a href="/faq" className="text-[#cfcfcf]">
                FAQ
              </a>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/img/main/ic_facebook.png"
                  alt="facebook"
                  className="h-5 w-5"
                />
              </a>
              <a href="https://x.com/" target="_blank" rel="noreferrer">
                <img
                  src="/img/main/ic_twitter.png"
                  alt="twitter"
                  className="h-5 w-5"
                />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/img/main/ic_youtube.png"
                  alt="youtube"
                  className="h-5 w-5"
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/img/main/ic_instagram.png"
                  alt="instagram"
                  className="h-5 w-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
