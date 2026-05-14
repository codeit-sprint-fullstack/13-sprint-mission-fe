import top from "../Image/hero1_panda.png";
import hot from "../Image/hero2-img.png";
import search from "../Image/hero3-img.png";
import register from "../Image/hero4-img.png";
import bottom from "../Image/hero5-img.png";
import "../css/Main.css";
import "../css/root.css";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <main className="main">
      <section className="top">
        <div className="top-container">
          <div className="top-text-container">
            <h1 className="top-article">
              일상의 모든 물건을 <br />
              거래해 보세요
            </h1>
            <Link to="/items">
              <button className="top-desc">구경하러 가기</button>
            </Link>
          </div>
          <img className="top-img" src={top} alt="판다 이미지" />
        </div>
      </section>

      <section className="hot-item">
        <div className="hot-item-container">
          <img src={hot} alt="옷 사진" />
          <div className="hot-item-text-container">
            <span className="hot-item-badge">Hot item</span>
            <h2 className="hot-item-article">
              인기 상품을 <br />
              확인해 보세요
            </h2>
            <p className="hot-item-desc">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>
      <section className="search">
        <div className="search-container">
          <div className="search-text-container">
            <span className="search-badge">Search item</span>
            <h3 className="search-article">
              구매를 원하는 <br />
              상품을 검색하세요
            </h3>
            <p className="search-desc">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img className="search-img" src={search} alt="검색 사진" />
        </div>
      </section>
      <section className="register">
        <div className="register-container">
          <img className="register-img" src={register} alt="등록 사진" />
          <div className="register-text-container">
            <span className="register-badge">Register</span>
            <h4 className="register-article">
              판매를 원하는 <br />
              상품을 등록하세요
            </h4>
            <p className="register-desc">
              어떤 물건이든 판매하고싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>
      <section className="bottom">
        <div className="bottom-container">
          <h5 className="bottom-article">
            믿을 수 있는 <br />
            판다마켓 중고거래
          </h5>
          <img className="bottom-img" src={bottom} alt="판다 이미지" />
        </div>
      </section>
    </main>
  );
}
