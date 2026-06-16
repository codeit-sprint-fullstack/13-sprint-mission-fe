import Image from "next/image";

export function BestArticleCard({ title, createdAt }) {
  return (
    <div className="flex gap-4 px-6 pb-4 w-[340px] flex-col bg-gray-50 rounded-lg">
      <div className="flex px-6 py-0.5 justify-center items-center gap-1 bg-primary-100 w-[102px] h-[30px] rounded-b-2xl">
        <Image
          src="/ic_medal.svg"
          alt="베스트 상품"
          width={48}
          height={48}
          className="w-4 h-4 max-w-none" /* 💡 max-width 설정을 강제로 해제 */
        />

        <p className="text-lg font-semibold text-white">Best</p>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex gap-10 justify-between">
          <p className="text-gray-800 text-2lg font-semibold max-w-[180px]">
            {title}
          </p>
          <div className="flex justify-center items-center w-[72px] h-[72px] border-[0.75px] border-gray-200 rounded-lg">
            <Image src="/mac.png" alt="상품 사진" width={48} height={48} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-md text-gray-600">user</p>

            <div className="flex gap-1 h-6">
              <Image
                src="/ic_heart.svg"
                alt="좋아요 수"
                width={16}
                height={16}
              />
              <p className="text-md text-gray-500">9999+</p>
            </div>
          </div>
          <p className="text-md text-gray-400">{createdAt}</p>
        </div>
      </div>
    </div>
  );
}
