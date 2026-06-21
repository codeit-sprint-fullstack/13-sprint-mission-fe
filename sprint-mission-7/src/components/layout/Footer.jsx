import FaceBook from "../../../public/icons/facebook.svg";
import Instagram from "../../../public/icons/instagram.svg";
import Youtube from "../../../public/icons/youtube.svg";
import Twitter from "../../../public/icons/twitter.svg";

export default function Footer() {
  return (
    <div className="w-full h-40 bg-gray-900">
      <div className="flex justify-between py-8 px-4 gap-6 flex-wrap tablet:px-6 pc:px-50">
        <div className="text-gray-400 order-3 tablet:order-first">
          @codeit - 2024
        </div>
        <ul className="flex gap-[30px] text-gray-200">
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
        <ul className="flex gap-3">
          <li>
            <img src={FaceBook.src} />
          </li>
          <li>
            <img src={Instagram.src} />
          </li>
          <li>
            <img src={Youtube.src} />
          </li>
          <li>
            <img src={Twitter.src} />
          </li>
        </ul>
      </div>
    </div>
  );
}
