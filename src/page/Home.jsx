import React from "react";
import { Link } from "react-router";
import pandaimg from "../assets/pandaimg.png";
import pandaimg2 from "../assets/pandaimg2.png";
import hotitemimg from "../assets/hotitemimg.png";
import searchimg from "../assets/searchimg.png";
import registerimg from "../assets/registerimg.png";

function Home() {
  return (
    <div>
      <section className="first">
        <div className="first-frame">
          <div className="first-inner">
            <span className="secondary-700-40px">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </span>
            <div className="first-btn">
              <span className="look">
                <Link to={"/Products"} className="link">
                  구경하러 가기
                </Link>
              </span>
            </div>
          </div>
          <img src={pandaimg} alt="판다이미지" className="pandaimg" />
        </div>
      </section>
      <section className="second">
        <div className="second-frame">
          <img src={hotitemimg} alt="옷이미지" className="hotitemimg" />
          <div className="second-inner">
            <span className="primary-100-18px">Hot item</span>
            <span className="secondary-700-40px">
              인기 상품을
              <br />
              확인해 보세요
            </span>
            <span className="secondary-700-24px">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </span>
          </div>
        </div>
      </section>
      <section className="third">
        <div className="third-frame">
          <div className="third-inner">
            <span className="primary-100-18px">Search</span>
            <span className="secondary-700-40px">
              구매를 원하는
              <br />
              상품을 검색하세요
            </span>
            <span className="secondary-700-24px">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </span>
          </div>
          <img src={searchimg} alt="검색이미지" className="searchimg" />
        </div>
      </section>
      <section className="fourth">
        <div className="fourth-frame">
          <img src={registerimg} alt="레지스터이미지" className="registerimg" />
          <div className="fourth-inner">
            <span className="primary-100-18px">Register</span>
            <span className="secondary-700-40px">
              인기 상품을
              <br />
              확인해 보세요
            </span>
            <span className="secondary-700-24px">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </span>
          </div>
        </div>
      </section>
      <section className="fifth">
        <div className="fifth-frame">
          <div className="fifth-inner">
            <span className="secondary-700-40px">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </span>
          </div>
          <img src={pandaimg2} className="pandaimg2" alt="판다이미지2" />
        </div>
      </section>
    </div>
  );
}
export default Home;
