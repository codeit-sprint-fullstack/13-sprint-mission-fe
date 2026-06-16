"use client";

import { TailSpin } from "react-loader-spinner";

/** 로딩 컴포넌트 */
export default function LoadingDisplay() {
  return (
    <div className='flex items-center justify-center min-h-[350px]'>
      <TailSpin
        visible={true}
        height='60'
        width='60'
        color='var(--Primary-200)'
        ariaLabel='tail-spin-loading'
        radius='1'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
}
