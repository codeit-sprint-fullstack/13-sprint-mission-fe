export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid min-h-[100px] max-w-[1040px] grid-cols-1 items-center gap-6 px-5 py-6 text-[13px] sm:grid-cols-[1fr_auto_1fr] sm:px-6 sm:py-0">
        <span>@codeit - 2026</span>
        <div className="flex gap-7">
          <a href="#">Privacy Policy</a>
          <a href="#">FAQ</a>
        </div>
        <div
          className="flex gap-3 font-bold text-white sm:justify-end"
          aria-label="소셜 링크"
        >
          <span>f</span>
          <span>𝕏</span>
          <span>▶</span>
          <span>◎</span>
        </div>
      </div>
    </footer>
  );
}
