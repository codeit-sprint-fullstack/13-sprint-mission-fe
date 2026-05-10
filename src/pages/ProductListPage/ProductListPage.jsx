import { Link } from "react-router";
import Pagination from "../../components/Pagination/Pagination";
import search from "../../assets/icon/ic_search.svg";
import "./ProductListPage.css";
import Dropdown from "../../components/Dropdown/Dropdown";
export default function ProductListPage() {
  console.log("ProductListPage");
  return (
    <main>
      <div className="productPage">
        <section className="topArea">
          <p className="topText">판매 중인 상품</p>
          <div className="uiArea">
            <input
              className="search"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            />
            <img className="searchIc" src={search} alt="돋보기아이콘" />
            <Link className="regBtn" to={"/registration"}>
              상품 등록하기{" "}
            </Link>
            <Dropdown />
          </div>
        </section>
        <section>
          <Pagination />
        </section>
      </div>
    </main>
  );
}
