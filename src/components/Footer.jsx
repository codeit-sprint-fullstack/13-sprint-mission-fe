export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-gray-900">
      <div className="mx-auto w-full max-w-[1200px] min-h-[120px] px-4 py-8">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 저작권 */}
          <p className="text-base text-gray-400">©codeit - 2024</p>

          {/* 가운데: 링크 */}
          <div className="flex gap-[30px]">
            <a href="/privacy" className="text-[#cfcfcf]">Privacy Policy</a>
            <a href="/faq" className="text-[#cfcfcf]">FAQ</a>
          </div>

          {/* 오른쪽: SNS 아이콘 */}
          <div className="flex gap-3">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_facebook.png" alt="facebook" className="h-5 w-5" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_twitter.png" alt="twitter" className="h-5 w-5" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_youtube.png" alt="youtube" className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_instagram.png" alt="instagram" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}