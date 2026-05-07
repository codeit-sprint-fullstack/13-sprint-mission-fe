import { Link } from "react-router-dom";
import "../../styles/mainpage.css";

function MainSection() {
  return (
    <main className="main-section">
      <div className="main-section-inner">
        <section className="hero-section">
          <div className="background-img"></div>
          <div className="left-panel">
            <h1 className="top-text">일상의 모든 물건을 거래해 보세요</h1>

            <Link className="seeing-item" to="/items">
              구경하러 가기
            </Link>
          </div>

          <div className="right-panel"></div>
        </section>

        <section className="main-item">
          <div className="items">
            <img
              src="../../images/section 1.png"
              alt="인기상품을 확인해 보세요"
            />
          </div>

          <div className="items">
            <img
              src="../../images/section 2.png"
              alt="구매를 원하는 상품을 검색하세요"
            />
          </div>

          <div className="items">
            <img
              src="../../images/section 3.png"
              alt="판매를 원하는 상품을 등록하세요"
            />
          </div>
        </section>

        <section className="main-bottom-item">
          <div className="background-img"></div>

          <div className="left-bottom-panel">
            <h1 className="bottom-text">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
          </div>

          <div className="right-bottom-panel"></div>
        </section>
      </div>
    </main>
  );
}

export default MainSection;
