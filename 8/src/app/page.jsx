import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <li>
        <Link href={"/signin"}>로그인 페이지가기</Link>
      </li>
      <li>
        <Link href={"/items"}>상품 페이지가기</Link>
      </li>
    </div>
  );
}
