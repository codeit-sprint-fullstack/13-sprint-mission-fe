import { SOCIAL_CONFIG } from "@/lib/constants/constants";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className='h-[160px]'>
      <div className='fixed bottom-0 left-0 right-0 z-footer flex flex-wrap md:flex-nowrap justify-between gap-x-[20px] gap-y-[24px] md:gap-y-0 w-full h-[160px] max-w-[1920px] px-[16px] md:px-[24px] xl:px-[200px] py-[32px] mx-auto bg-secondary-900'>
        <p className='order-3 md:order-none w-full md:w-auto text-[16px] text-secondary-400'>
          &copy;codeit - 2024
        </p>

        <ul className='order-1 md:order-none flex gap-[30px]'>
          <li>
            <Link href='/privacy' className='text-[16px] text-secondary-200'>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href='/faq' className='text-[16px] text-secondary-200'>
              FAQ
            </Link>
          </li>
        </ul>

        <ul className='order-2 md:order-none flex gap-[12px]'>
          {SOCIAL_CONFIG.map((info) => (
            <li key={info.id}>
              <a
                className='inline-block w-[20px] h-[20px]'
                href={info.url}
                target='_blank'
              >
                <Image
                  src={info.icon}
                  alt={info.alt}
                  width={20}
                  height={20}
                  className='w-[20px] h-[20px]'
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
