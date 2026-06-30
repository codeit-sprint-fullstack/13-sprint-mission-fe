"use client";
import Button from "@/components/ui/Button";
import { TextAreaWithLabel } from "@/components/ui/Input";
import { Profile, ProfileForItem } from "@/components/ui/Profile";
import Reply from "@/components/ui/Reply";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import React from "react";

const mockProduct = {
  name: "테스트 상품",
  price: 12000,
  description:
    "법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여 심판한다. 공무원의 신분과 정치적 중립성은" +
    "법률이 정하는 바에 의하여 보장된다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다.",
  image: "", // 빈 값 → DEFAULT_IMAGE로 폴백되는지 같이 확인
};

const DEFAULT_IMAGE = "/img/default.png";

export default function ItemDetail() {
  const { user } = useAuth();

  return (
    <div className="p-4 max-w-300 mx-auto">
      <div className="flex flex-col border-b border-gray-200 pb-6 tablet:flex-row tablet:gap-4">
        <Image
          src={DEFAULT_IMAGE}
          width={340}
          height={340}
          alt="ss"
          priority
          className="h-auto w-full rounded-lg tablet:max-w-85 tablet:max-h-85 pc:max-w-121.5 pc:max-h-121.5"
        />
        <div className="mt-4 tablet:max-w-85 pc:max-w-172.5">
          <div className="flex justify-between pb-4 border-b border-gray-200">
            <div className="flex flex-col gap-2 pc:gap-4">
              <div className="text-base text-gray-800 font-semibold tablet:text-xl pc:text-2xl">
                {mockProduct.name}
              </div>
              <div className="mt-2 text-2xl text-gray-800 font-semibold tablet:text-[32px] pc:text-[40px]">
                {mockProduct.price}원
              </div>
            </div>
            <div>드롭아웃</div>
          </div>
          <div className="flex flex-col mt-4 pc:mt-6">
            <div className="font-semibold text-sm text-gray-800">상품 소개</div>
            <div>{mockProduct.description}</div>
            <div className="mt-6 font-semibold text-sm text-gray-800">
              상품 태그
            </div>
            <div className="mt-2 pc:mt-4">상품 태그 들어갈 자리</div>
          </div>
          <div className="mt-10 flex justify-between items-center pc:mt-13">
            <ProfileForItem user={user}></ProfileForItem>
            <div>좋아요</div>
          </div>
        </div>
      </div>
      <div className="mt-6 tablet:mt-10">
        <TextAreaWithLabel
          label={"문의하기"}
          placeholder={
            "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상  책임은 게시자에게 있습니다."
          }
        />
        <div className="mt-4 flex justify-end">
          <Button size={"small"}>등록</Button>
        </div>
      </div>
      <div>
        댓글
        <Reply></Reply>
      </div>
      <div className="mt-10 flex justify-center mb-43.25">
        <Button size={"large"}>목록으로 돌아가기</Button>
      </div>
    </div>
  );
}
