import Link from "next/link";
import Image from "next/image";

const IMAGE_1 = "/images/Img_home_01.png";
const IMAGE_2 = "/images/Img_home_02.png";
const IMAGE_3 = "/images/Img_home_03.png";
const IMAGE_TOP = "/images/Img_home_top.png";
const IMAGE_BOTTOM = "/images/Img_home_bottom.png";

export default function Home() {
  return (
    <>
      {/* 섹션 1: 히어로 (파란 배경)
      TODO: section으로 바꾸기 */}
      <div className="flex bg-[#cfe5ff]">
        <div className="mt-50 mx-auto flex max-[744px]:flex-col max-[744px]:mt-16 max-[744px]:w-full max-[744px]:px-8 max-[465px]:mt-10 max-[465px]:px-4">
          <div className="flex items-start justify-center flex-col">
            <p className="inline text-secondary-700 text-[40px] font-bold leading-[140%] mt-3 max-[744px]:text-[32px] max-[465px]:text-2xl">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </p>
            <Link
              href="/items"
              className="inline-flex h-14 px-31 py-4 justify-center items-center rounded-[50px] bg-primary text-white whitespace-nowrap text-xl font-semibold cursor-pointer leading-[160%] mt-8 mb-15 max-[744px]:px-16 max-[744px]:text-lg max-[744px]:mt-6 max-[744px]:mb-10 max-[465px]:px-10 max-[465px]:text-base max-[465px]:h-11 max-[465px]:mb-8"
            >
              구경하러 가기
            </Link>
          </div>
          <Image
            src={IMAGE_TOP}
            alt=""
            width={746}
            height={340}
            className="self-end max-[744px]:w-full max-[744px]:h-auto"
          />
        </div>
      </div>

      {/* 섹션 2: 이미지 왼쪽, 텍스트 오른쪽 */}
      <div className="flex justify-center items-center">
        <div className="flex flex-row gap-16 w-full h-auto my-34.5 max-[744px]:flex-col max-[744px]:my-18 max-[744px]:px-8 max-[744px]:gap-8 max-[465px]:my-10 max-[465px]:px-4 max-[465px]:gap-6">
          <Image
            src={IMAGE_1}
            alt=""
            width={588}
            height={444}
            className="object-cover shrink-0 max-[744px]:w-full max-[744px]:h-auto"
          />
          <div className="flex items-start justify-center flex-col">
            <span className="inline text-primary text-lg font-bold leading-6.5 max-[465px]:text-sm">
              Hot item
            </span>
            <p className="inline text-secondary-700 text-[40px] font-bold leading-[140%] mt-3 max-[744px]:text-[32px] max-[465px]:text-2xl">
              인기 상품을
              <br />
              확인해 보세요
            </p>
            <p className="inline text-secondary-700 text-2xl font-medium leading-8 mt-6 max-[744px]:text-xl max-[465px]:text-base">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </div>

      {/* 섹션 3: 텍스트 왼쪽, 이미지 오른쪽 */}
      <div className="flex justify-center items-center">
        <div className="flex flex-row gap-16 w-full h-auto my-34.5 max-[744px]:flex-col max-[744px]:my-18 max-[744px]:px-8 max-[744px]:gap-8 max-[465px]:my-10 max-[465px]:px-4 max-[465px]:gap-6">
          <div className="flex justify-center flex-col items-end max-[744px]:items-start">
            <span className="inline text-primary text-lg font-bold leading-6.5 max-[465px]:text-sm">
              Search
            </span>
            <p className="inline text-right text-secondary-700 text-[40px] font-bold leading-[140%] mt-3 max-[744px]:text-left max-[744px]:text-[32px] max-[465px]:text-2xl">
              구매를 원하는
              <br />
              상품을 검색하세요
            </p>
            <p className="inline text-right text-secondary-700 text-2xl font-medium leading-8 mt-6 max-[744px]:text-left max-[744px]:text-xl max-[465px]:text-base">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <Image
            src={IMAGE_2}
            alt=""
            width={588}
            height={444}
            className="object-cover shrink-0 max-[744px]:w-full max-[744px]:h-auto"
          />
        </div>
      </div>

      {/* 섹션 4: 이미지 왼쪽, 텍스트 오른쪽 */}
      <div className="flex justify-center items-center">
        <div className="flex flex-row gap-16 w-full h-auto my-34.5 max-[744px]:flex-col max-[744px]:my-18 max-[744px]:px-8 max-[744px]:gap-8 max-[465px]:my-10 max-[465px]:px-4 max-[465px]:gap-6">
          <Image
            src={IMAGE_3}
            alt=""
            width={588}
            height={444}
            className="object-cover shrink-0 max-[744px]:w-full max-[744px]:h-auto"
          />
          <div className="flex items-start justify-center flex-col">
            <span className="inline text-primary text-lg font-bold leading-6.5 max-[465px]:text-sm">
              Register
            </span>
            <p className="inline text-secondary-700 text-[40px] font-bold leading-[140%] mt-3 max-[744px]:text-[32px] max-[465px]:text-2xl">
              판매를 원하는
              <br />
              상품을 등록하세요
            </p>
            <p className="inline text-secondary-700 text-2xl font-medium leading-8 mt-6 max-[744px]:text-xl max-[465px]:text-base">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </div>

      {/* 섹션 5: 파란 배경, 텍스트 왼쪽, 이미지 오른쪽 (하단 붙임) */}
      <div className="max-w-380 w-full px-50 mt-34.5 bg-[#cfe5ff] flex justify-center max-[744px]:px-8 max-[744px]:mt-18 max-[465px]:px-4 max-[465px]:mt-10">
        <div className="flex mt-35.75 max-[744px]:flex-col max-[744px]:mt-16 max-[465px]:mt-10">
          <div className="flex items-start justify-center flex-col">
            <p className="inline text-secondary-700 text-[40px] font-bold leading-[140%] mt-3 max-[744px]:text-[32px] max-[465px]:text-2xl">
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </p>
          </div>
          <Image
            src={IMAGE_BOTTOM}
            alt=""
            width={746}
            height={397}
            className="self-end max-[744px]:w-full max-[744px]:h-auto"
          />
        </div>
      </div>
    </>
  );
}
