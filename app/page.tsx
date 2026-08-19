import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full">
      <section className="flex h-auto w-full items-end justify-center overflow-hidden bg-panda-hero py-10 md:h-[540px] md:py-0">
        <div className="flex w-[1110px] max-w-full flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-6 md:items-start md:pb-20">
            <h1 className="text-[28px] font-bold leading-[1.4] text-gray-700 md:text-[40px]">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link
              href="/items"
              className="inline-flex h-14 w-[357px] max-w-full items-center justify-center rounded-[40px] bg-panda-primary text-base font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active"
            >
              구경하러 가기
            </Link>
          </div>
          <div className="max-w-[80%] md:max-w-[50%]">
            <img className="block h-auto w-full" src="/image/Img_home_top.png" alt="판다마켓 홈" />
          </div>
        </div>
      </section>

      <section className="flex min-h-[540px] w-full items-center justify-center px-6 py-20">
        <div className="flex w-[988px] max-w-full flex-col items-center gap-6 text-center md:flex-row md:gap-16 md:text-left">
          <div className="flex-1">
            <img className="block h-auto w-full object-contain" src="/image/Img_home_01.png" alt="인기 상품" />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-lg font-bold text-panda-primary">Hot item</p>
            <p className="text-[28px] font-bold leading-[1.4] text-gray-700 md:text-[40px]">
              인기 상품을
              <br />
              확인해 보세요
            </p>
            <p className="text-lg font-medium leading-[1.33] text-gray-700 md:text-2xl">
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-[540px] w-full items-center justify-center px-6 py-20">
        <div className="flex w-[988px] max-w-full flex-col items-center gap-6 text-center md:flex-row-reverse md:gap-16 md:text-right">
          <div className="flex-1">
            <img className="block h-auto w-full object-contain" src="/image/Img_home_02.png" alt="상품 검색" />
          </div>
          <div className="flex flex-1 flex-col gap-3 md:items-end">
            <p className="text-lg font-bold text-panda-primary">Search</p>
            <p className="text-[28px] font-bold leading-[1.4] text-gray-700 md:text-[40px]">
              구매를 원하는
              <br />
              상품을 검색하세요
            </p>
            <p className="text-lg font-medium leading-[1.33] text-gray-700 md:text-2xl">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-[540px] w-full items-center justify-center px-6 py-20">
        <div className="flex w-[988px] max-w-full flex-col items-center gap-6 text-center md:flex-row md:gap-16 md:text-left">
          <div className="flex-1">
            <img className="block h-auto w-full object-contain" src="/image/Img_home_03.png" alt="상품 등록" />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-lg font-bold text-panda-primary">Register</p>
            <p className="text-[28px] font-bold leading-[1.4] text-gray-700 md:text-[40px]">
              판매를 원하는
              <br />
              상품을 등록하세요
            </p>
            <p className="text-lg font-medium leading-[1.33] text-gray-700 md:text-2xl">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className="flex h-auto w-full items-end justify-center overflow-hidden bg-panda-hero py-10 md:h-[540px] md:py-0">
        <div className="flex w-[1110px] max-w-full flex-col items-center justify-between gap-10 px-6 text-center md:flex-row md:text-left">
          <div className="text-[28px] font-bold leading-[1.4] text-gray-700 md:pb-20 md:text-[40px]">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </div>
          <div className="max-w-[80%] md:max-w-[50%]">
            <img className="block h-auto w-full" src="/image/Img_home_bottom.png" alt="판다마켓 중고 거래" />
          </div>
        </div>
      </section>
    </div>
  );
}
