import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type BannerProps = {
  title: ReactNode;
  imageSrc: StaticImageData;
  imageAlt: string;
  cta?: { href: string; label: string };
};

export default function Banner({
  title,
  imageSrc,
  imageAlt,
  cta,
}: BannerProps) {
  return (
    <section className="relative left-1/2 flex w-screen -translate-x-1/2 justify-center overflow-hidden bg-landing-background min-h-135">
      <div className="flex w-full max-w-[120rem] flex-col items-center gap-8 px-4 py-12 text-center lg:flex-row lg:items-end lg:gap-8 lg:px-[25.313rem] lg:pt-50 lg:pb-0 lg:text-left">
        <div
          className={`flex shrink-0 flex-col ${cta ? "" : "lg:mb-[7.031rem]"}`}
        >
          <h2 className="font-pretendard text-[2.5rem] leading-[140%] font-bold text-gray-700">
            {title}
          </h2>
          {cta && (
            <Link
              href={cta.href}
              className="mt-8 mb-25 flex h-14 w-full max-w-[22.313rem] items-center justify-center rounded-[2.5rem] bg-primary-100 text-xl font-semibold text-white lg:w-[22.313rem]"
            >
              {cta.label}
            </Link>
          )}
        </div>
        <Image src={imageSrc} alt={imageAlt} className="block h-auto w-auto" />
      </div>
    </section>
  );
}
