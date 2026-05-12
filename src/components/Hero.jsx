import { Link } from "react-router";
import "../styles/hero.css";
import topImg from "../assets/img/landing/Img_home_top.png";
import homeImg1 from "../assets/img/landing/Img_home_01.png";
import homeImg2 from "../assets/img/landing/Img_home_02.png";
import homeImg3 from "../assets/img/landing/Group 33682.png";
import bottomImg from "../assets/img/landing/Img_home_bottom.png";

function Hero() {
  return (
    <>
      <section className="main-blue">
        <div className="main-container">
          <div className="left-section">
            <h1 className="mention">일상의 모든 물건을 거래해 보세요</h1>
            <Link className="items-bttn" to="/items">
              구경하러 가기
            </Link>
          </div>
          <img id="panda-img" src={topImg} alt="판다 이미지" />
        </div>
      </section>

      <section className="main-white">
        <div className="contents-wrapper">
          <img src={homeImg1} alt="인기 상품 이미지" />
          <div className="right-section">
            <div className="highlight-keyword">Hot item</div>
            <h2 className="mention">인기 상품을 확인해 보세요</h2>
            <p className="description">
              가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section className="main-white">
        <div className="contents-wrapper ">
          <div className="search-left-section">
            <div className="highlight-keyword">Search</div>
            <h2 className="mention">구매를 원하는 상품을 검색하세요</h2>
            <p className="description">
              구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
            </p>
          </div>
          <img src={homeImg2} alt="검색 이미지" />
        </div>
      </section>

      <section className="main-white">
        <div className="contents-wrapper">
          <img src={homeImg3} alt="등록 이미지" />
          <div className="right-section">
            <div className="highlight-keyword">Register</div>
            <h2 className="mention">판매를 원하는 상품을 등록하세요</h2>
            <p className="description">
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className="main-blue--bottom">
        <div className="main-container-bottom">
          <h2 className="mention">믿을 수 있는 판다마켓 중고 거래</h2>
          <img src={bottomImg} alt="판다 대화 이미지" />
        </div>
      </section>
    </>
  );
}

export default Hero;
