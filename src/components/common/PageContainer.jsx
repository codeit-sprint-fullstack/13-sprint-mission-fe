"use client";

export default function PageContainer({ children }) {
  return (
    <div className='max-w-[1200px] mx-auto w-full pr-[16px] pl-[16px] md:pr-[24px] md:pl-[24px]'>
      <main className=''>{children}</main>
    </div>
  );
}
