import Button from "@/components/common/Button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center py-[150px] text-[18px]'>
      <h2 className='text-[32px] font-bold text-primary-100'>404 Not Found</h2>
      <p className='mb-[20px] text-secondary-900'>
        요청한 페이지를 찾을 수 없습니다.
      </p>
      <p>
        <Button as={Link} href='/'>
          홈으로 이동
        </Button>
      </p>
    </div>
  );
}
