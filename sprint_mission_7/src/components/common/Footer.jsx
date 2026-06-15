import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <div>
        <p>©codeit - 2024</p>
        <div>
          <Link href="/"></Link>
          <Link href="/"></Link>
        </div>
        <div>
          <Link href="/" className="relative">
            <Image src="/ic_facebook.svg" alt="페이스북으로 이동" fill />
          </Link>
          <Link href="/" className="relative">
            <Image src="/ic_twitter.svg" alt="트위터로 이동" fill />
          </Link>
          <Link href="/" className="relative">
            <Image src="/ic_youtude.svg" alt="유튜브로 이동" fill />
          </Link>
          <Link href="/" className="relative">
            <Image src="/ic_instagram.svg" alt="인스타그램으로 이동" fill />
          </Link>
        </div>
      </div>
    </footer>
  );
}
