import topImg from "../../assets/images/Img_home_top.png";
import Img1 from "../../assets/images/Img_home_01.png";
import Img2 from "../../assets/images/Img_home_02.png";
import Img3 from "../../assets/images/Img_home_03.png";
import bottomImg from "../../assets/images/Img_home_bottom.png";

import "./HomePage.css";
import { Link } from "react-router";
export default function HomePage() {
  return (
      <main id="main">
        <section className="top-section">
          <div className="top-inner">
            <div className="text-area">
              <div className="text">
                일상의 모든 물건을
                <br />
                거래해 보세요
              </div>
              <Link className="button" to="/items">
                구경하러 가기
              </Link>
            </div>
            <img src={topImg} alt="판다가 인사하고 있는 그림" />
          </div>
        </section>
        <section className="mid-section">
          <div className="mid-inner">
            <img src={Img1} alt="옷을 판매하는 그림" />
            <div className="text-area">
              <div className="textbox">
                <div className="text-deco">Hot item</div>
                <div className="info-text">
                  인기 상품을
                  <br />
                  확인해 보세요
                </div>
              </div>
              <div className="info-text-1">
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </div>
            </div>
          </div>
          <div className="mid-inner">
            <div className="text-area">
              <div className="textbox">
                <div className="text-deco">Search</div>
                <div className="info-text">
                  구매를 원하는
                  <br />
                  상품을 검색하세요
                </div>
              </div>
              <div className="info-text-1">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </div>
            </div>
            <img src={Img2} alt="물품을 찾는 그림" />
          </div>
          <div className="mid-inner">
            <img src={Img3} alt="물품을 등록하는 그림" />
            <div className="text-area">
              <div className="textbox">
                <div className="text-deco">Register</div>
                <div className="info-text">
                  판매를 원하는
                  <br />
                  상품을 등록하세요
                </div>
              </div>
              <div className="info-text-1">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </div>
            </div>
          </div>
        </section>
        <section className="bot-section">
          <div className="bot-inner">
            <div className="text">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </div>

            <img src={bottomImg} alt="판다가 인사하고 있는 그림" />
          </div>
        </section>
      </main>
  );
}
