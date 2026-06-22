import ic_facebook from "@/asset/icon/ic_facebook.png";
import ic_twitter from "@/asset/icon/ic_twitter.png";
import ic_youtube from "@/asset/icon/ic_youtube.png";
import ic_instagram from "@/asset/icon/ic_instagram.png";
import Image from "next/image.js";
import clsx from "clsx";

export default function SnsButton({ className = "", imgClassName = "" }) {
  return (
    <div className={clsx("flex flex-row gap-3", className)}>
      <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={ic_facebook}
          alt="페이스북"
          className={clsx("w-5 h-5", imgClassName)}
        />
      </a>
      <a href="http://x.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={ic_twitter}
          alt="트위터"
          className={clsx("w-5 h-5", imgClassName)}
        />
      </a>
      <a href="http://youtube.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={ic_youtube}
          alt="유튜브"
          className={clsx("w-5 h-5", imgClassName)}
        />
      </a>
      <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
        <Image
          src={ic_instagram}
          alt="인스타그램"
          className={clsx("w-5 h-5", imgClassName)}
        />
      </a>
    </div>
  );
}
