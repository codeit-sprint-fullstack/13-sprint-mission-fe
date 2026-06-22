import LinkButton from "@/components/button/LinkButton.jsx";
import SnsButton from "@/components/button/SnsButton.jsx";
import Link from "next/link.js";

export default function Footer() {
  return (
    <div className="lg:mt-73.25 bg-secondary-gray-900">
      <div className="h-40 py-8 px-4 md:px-6 lg:max-w-280 lg:mx-auto  flex flex-wrap md:flex-nowrap items-start md:justify-between  ">
        <div className="flex gap-7.5 w-1/2 md:w-auto md:order-2">
          <LinkButton variant="footer" href={"/policy"} text="Privacy Policy" />
          <LinkButton variant="footer" href={"/faq"} text="FAQ" />
        </div>
        <SnsButton className="w-1/2 md:w-auto justify-end md:justify-normal md:order-3" />
        <span className="text-400-16 text-secondary-gray-400 w-1/2 md:w-auto md:order-1">
          ©codeit - 2024
        </span>
      </div>
    </div>
  );
}
