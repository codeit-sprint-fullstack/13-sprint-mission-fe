import React from "react";
import { Link } from "react-router-dom";
import { Hero, Card } from "@/components";
import { heroTop, heroBottom, card1, card2, card3 } from "@/assets/img";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Hero
        text="일상의 모든 물건을
      거래해 보세요"
        img={heroTop}
      >
        <Link to="/items">
          <button className={styles.btn}>구경하러 가기</button>
        </Link>
      </Hero>
      <div className={styles.cardContainer}>
        <Link to="/items">
          <Card
            tag="Hot Item"
            title="인기 상품을
확인해 보세요"
            text="가장 HOT한 중고거래 물품을
판다 마켓에서 확인해 보세요"
            src={card1}
          />
        </Link>
        <Link to="/items">
          <Card
            tag="Search"
            title="구매를 원하는
상품을 검색하세요"
            text="구매하고 싶은 물품은 검색해서
쉽게 찾아보세요"
            src={card2}
          />
        </Link>
        <Link to="/registeration">
          <Card
            tag="Register"
            title="판매를 원하는
상품을 등록하세요"
            text="어떤 물건이든 판매하고 싶은
상품을 쉽게 등록하세요"
            src={card3}
          />
        </Link>
      </div>

      <Hero
        text="믿을 수 있는
      판다마켓 중고 거래"
        img={heroBottom}
      ></Hero>
    </div>
  );
}
