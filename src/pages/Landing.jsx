import "../css/Landing.css";
import hero1 from "../assets/image/hero1-panda.png";
import banner from "../assets/image/Img_home_bottom.png";
import register from "../assets/image/Img_home_03.png";
import search from "../assets/image/Img_home_02.png";
import hotItem from "../assets/image/Img_home_01.png";
import { Link } from "react-router";

function Landing() {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <p>
              일상의 모든 물건을
              <br />
              거래해보세요
            </p>
            <Link to="/items" className="go-btn">
              구경하러 가기
            </Link>
          </div>
          <img src={hero1} alt="hero" />
        </div>
      </section>

      <section className="feature">
        <div className="feature-item">
          <div className="item-inner">
            <img src={hotItem} alt="hot item" />
            <div className="feature-text">
              <span className="feature-tag">Hot Item</span>
              <h2 className="feature-tit">
                인기 상품을 <br />
                확인해 보세요
              </h2>
              <p className="feature-dec">
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해보세요
              </p>
            </div>
          </div>
        </div>

        <div className="feature-item reverse">
          <div className="item-inner">
            <img src={search} alt="search" />
            <div className="feature-text">
              <span className="feature-tag">Search</span>
              <h2 className="feature-tit">
                구매를 원하는
                <br />
                상품을 검색하세요
              </h2>
              <p className="feature-dec">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
        </div>

        <div className="feature-item">
          <div className="item-inner">
            <img src={register} alt="register" />
            <div className="feature-text">
              <span className="feature-tag">Register</span>
              <h2 className="feature-tit">
                판매를 원하는
                <br />
                상품을 등록하세요
              </h2>
              <p className="feature-dec">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="banner">
        <div className="banner-inner">
          <p className="banner-text">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </p>
          <img src={banner} alt="banner" />
        </div>
      </section>
    </main>
  );
}

export default Landing;
