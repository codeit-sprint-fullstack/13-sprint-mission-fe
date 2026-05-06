import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "@/components";
import { heroTop, heroBottom } from "@/assets/img";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div>
      <Hero
        text="일상의 모든 물건을
      거래해 보세요"
        img={heroTop}
      >
        <Link to="/items">
          <button className={styles.btn}>구경하러 가기</button>
        </Link>
      </Hero>
      <Hero
        text="믿을 수 있는
      판다마켓 중고 거래"
        img={heroBottom}
      ></Hero>
    </div>
  );
}
