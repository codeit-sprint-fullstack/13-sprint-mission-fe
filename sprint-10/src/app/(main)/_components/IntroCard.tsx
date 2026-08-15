import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type IntroCardProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  imageSrc: StaticImageData;
  imageAlt: string;
  reverse?: boolean;
};

export default function IntroCard({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: IntroCardProps) {
  return (
    <section className="flex flex-col items-center gap-8 px-4 py-12 text-center lg:mx-[29.125rem] lg:my-[8.625rem] lg:flex-row lg:items-stretch lg:gap-0 lg:px-0 lg:py-0 lg:text-left">
      {!reverse && <Image src={imageSrc} alt={imageAlt} className="block h-auto w-auto" />}
      <div
        className={`flex flex-col gap-6 bg-[#fcfcfc] lg:justify-center lg:py-[6.438rem] ${
          reverse
            ? "lg:items-end lg:pr-16 lg:pl-3 lg:text-right"
            : "lg:items-start lg:pr-8 lg:pl-16"
        }`}
      >
        <h2 className="text-lg font-bold text-primary-100">{eyebrow}</h2>
        <p className="text-[2.5rem] leading-[140%] font-bold text-gray-700 lg:whitespace-nowrap">
          {title}
        </p>
        <p className="text-2xl leading-8 font-medium text-gray-700 lg:whitespace-nowrap">
          {description}
        </p>
      </div>
      {reverse && <Image src={imageSrc} alt={imageAlt} className="block h-auto w-auto" />}
    </section>
  );
}
