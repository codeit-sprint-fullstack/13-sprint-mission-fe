import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import image_1 from "../assets/images/Img_home_01.png";
import image_2 from "../assets/images/Img_home_02.png";
import image_3 from "../assets/images/Img_home_03.png";
import image_top from "../assets/images/Img_home_top.png";
import image_bottom from "../assets/images/Img_home_bottom.png";

export default function Home() {
  return (
    <>
      <div className="section-inner-blue">
        <div className="frame-large-top">
          <div className="text-wrap">
            <p className="section-title">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </p>
            <Link to="./items.html">
              <button className="cta-btn">구경하러 가기</button>
            </Link>
          </div>
          <img className="img-top" src={image_top} alt="메인 이미지" />
        </div>
        {/* <!-- </div> --> */}
      </div>
      {/* <!-- 섹션 2 : 이미지 왼쪽, 텍스트 오른쪽 --> */}
      <div className="section-inner">
        <div className="section-container">
          <img src={image_1} alt="섹션2 이미지" />
          <div className="text-wrap">
            <span className="tag">Hot item</span>
            <p className="section-title">
              인기 상품을
              <br />
              확인해 보세요
            </p>
            <p className="section-desc">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </div>
      {/* <!-- 섹션 3 : 텍스트 왼쪽, 이미지 오른쪽 --> */}
      <div className="section-inner">
        <div className="section-container">
          <div className="text-wrap-middle">
            <span className="tag">Search</span>
            <p className="section-title-middle">
              구매를 원하는
              <br />
              상품을 검색하세요
            </p>
            <p className="section-desc-middle">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img src={image_2} alt="섹션3 이미지" />
        </div>
      </div>
      {/* <!-- 섹션 4 : 이미지 왼쪽, 텍스트 오른쪽 --> */}
      <div className="section-inner">
        <div className="section-container">
          <img src={image_3} alt="섹션4 이미지" />
          <div className="text-wrap">
            <span className="tag">Register</span>
            <p className="section-title">
              판매를 원하는
              <br />
              상품을 등록하세요
            </p>
            <p className="section-desc">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </div>
      {/* <!-- 섹션 5 : 텍스트 왼쪽, 이미지 오른쪽 (이미지 하단 붙임) --> */}
      <div className="section-inner-blue-bottom">
        <div className="section-container-bottom">
          <div className="text-wrap">
            <p className="section-title">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </p>
          </div>
          <img className="img-bottom" src={image_bottom} alt="섹션5 이미지" />
        </div>
      </div>
    </>
  );
}
