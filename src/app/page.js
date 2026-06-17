import Image from "next/image";
import Link from "next/link";

const features = [
  {
    eyebrow: "Hot Item",
    title: (
      <>
        인기 상품을
        <br />
        확인해 보세요
      </>
    ),
    description: (
      <>
        가장 HOT한 중고거래 물품을
        <br />
        판다 마켓에서 확인해 보세요.
      </>
    ),
    image: "/images/Img_home_01.svg",
    alt: "인기 상품을 바라보는 판다",
    imagePosition: "left",
  },
  {
    eyebrow: "Search",
    title: (
      <>
        구매를 원하는
        <br />
        상품을 검색하세요
      </>
    ),
    description: (
      <>
        구매하고 싶은 물품은 검색해서
        <br />
        쉽게 찾아보세요.
      </>
    ),
    image: "/images/Img_home_02.svg",
    alt: "상품을 찾는 돋보기",
    imagePosition: "right",
  },
  {
    eyebrow: "Register",
    title: (
      <>
        판매를 원하는
        <br />
        상품을 등록하세요
      </>
    ),
    description: (
      <>
        어떤 물건이든 판매하고 싶은 상품을
        <br />
        쉽게 등록하세요.
      </>
    ),
    image: "/images/Img_home_03.svg",
    alt: "판매 상품을 등록하는 화면",
    imagePosition: "left",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1f2937]">
      <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/panda-logo.svg"
              alt="판다마켓 로고"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-bold text-[#3692ff]">판다마켓</span>
          </Link>

          <Link
            href="/login"
            className="flex h-12 w-32 items-center justify-center rounded-lg bg-[#3692ff] text-base font-semibold text-white transition-colors hover:bg-[#1967d2]"
          >
            로그인
          </Link>
        </div>
      </header>

      <section className="overflow-hidden bg-[#cfe6fa]">
        <div className="relative mx-auto flex h-[540px] max-w-[1200px] items-center px-6">
          <div className="relative z-10 mb-2">
            <h1 className="text-[40px] font-bold leading-[1.4] tracking-[-0.03em] text-[#1f2937]">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link
              href="/items"
              className="mt-8 flex h-14 w-[292px] items-center justify-center rounded-xl bg-[#3692ff] text-lg font-semibold text-white transition-colors hover:bg-[#1967d2]"
            >
              구경하러 가기
            </Link>
          </div>

          <Image
            src="/images/Img_home_top.svg"
            alt="판다마켓을 소개하는 판다"
            width={746}
            height={340}
            priority
            className="absolute bottom-0 right-0 h-auto w-[746px] max-md:right-[-300px] max-md:w-[600px]"
          />
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6">
        {features.map((feature) => {
          const image = (
            <div className="overflow-hidden bg-[#fcfcfc]">
              <Image
                src={feature.image}
                alt={feature.alt}
                width={588}
                height={444}
                className="h-auto w-full"
              />
            </div>
          );

          const copy = (
            <div
              className={
                feature.imagePosition === "right"
                  ? "text-right"
                  : "text-left"
              }
            >
              <p className="text-lg font-bold text-[#3692ff]">
                {feature.eyebrow}
              </p>
              <h2 className="mt-3 text-[40px] font-bold leading-[1.35] tracking-[-0.03em] text-[#1f2937]">
                {feature.title}
              </h2>
              <p className="mt-6 text-xl leading-[1.6] text-[#4b5563]">
                {feature.description}
              </p>
            </div>
          );

          return (
            <section
              key={feature.eyebrow}
              className="grid min-h-[720px] grid-cols-[1.15fr_0.85fr] items-center gap-16"
            >
              {feature.imagePosition === "left" ? (
                <>
                  {image}
                  {copy}
                </>
              ) : (
                <>
                  {copy}
                  {image}
                </>
              )}
            </section>
          );
        })}
      </main>

      <section className="overflow-hidden bg-[#cfe6fa]">
        <div className="relative mx-auto flex h-[540px] max-w-[1200px] items-center px-6">
          <h2 className="relative z-10 text-[40px] font-bold leading-[1.4] tracking-[-0.03em] text-[#1f2937]">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>
          <Image
            src="/images/Img_home_bottom.svg"
            alt="판다마켓에서 함께 거래하는 판다들"
            width={746}
            height={397}
            loading="eager"
            className="absolute bottom-0 right-0 h-auto w-[746px] max-md:right-[-360px] max-md:w-[650px]"
          />
        </div>
      </section>

      <footer className="bg-[#111827]">
        <div className="mx-auto flex h-40 max-w-[1200px] items-start justify-between px-6 pt-8 text-base text-[#9ca3af]">
          <span>©codeit - 2026</span>
          <nav className="flex gap-8">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white">
              FAQ
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
