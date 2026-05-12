import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <section className={style.bannerSection}>
        <div className={style.bannerInner}>
          <div className={style.bannerText}>
            <h2>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h2>
            <Link
              to="/items"
              className={`${style.productsBtn} ${style.clickable}`}
            >
              구경하러 가기
            </Link>
          </div>
          <img
            className={style.bannerImage}
            src="/images/landing/Img_home_top.svg"
            alt="Panda Market banner"
          />
        </div>
      </section>

      <div className={style.homeIntroSection}>
        <section className={style.introSection}>
          <section className={style.hotpageSection}>
            <img
              className={style.hotpageImage}
              src="/images/landing/Img_home_01.svg"
              alt="인기상품 확인 이미지"
            />
            <div className={style.hotpageText}>
              <h2 className={style.introTitle}>Hot item</h2>
              <p className={style.introDescription}>
                인기 상품을
                <br />
                확인해 보세요
              </p>
              <p className={style.introDetail}>
                가장 HOT한 중고거래 물품을 <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </section>

          <section className={style.searchSection}>
            <div className={style.searchText}>
              <h2 className={style.introTitle}>Search</h2>
              <p className={style.introDescription}>
                구매를 원하는
                <br />
                상품을 검색하세요
              </p>
              <p className={style.introDetail}>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img
              className={style.searchImage}
              src="/images/landing/Img_home_02.svg"
              alt="검색하기 이미지"
            />
          </section>

          <section className={style.sellSection}>
            <img
              className={style.sellPageImage}
              src="/images/landing/Img_home_03.svg"
              alt="판매등록 이미지"
            />
            <div className={style.sellPageText}>
              <h2 className={style.introTitle}>Register</h2>
              <p className={style.introDescription}>
                판매를 원하는 <br />
                상품을 등록하세요
              </p>
              <p className={style.introDetail}>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </section>
        </section>
      </div>

      <section className={style.bannerSection}>
        <div className={style.bannerInner}>
          <div className={`${style.bannerTextBottom} ${style.bannerText}`}>
            <h2>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h2>
          </div>
          <img
            className={style.bannerImage}
            src="/images/landing/Img_home_bottom.svg"
            alt="Panda Market banner"
          />
        </div>
      </section>
    </>
  );
}
