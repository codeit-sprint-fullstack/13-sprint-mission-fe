import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import ItemListGeneral from "../components/ItemListGeneral";

const ItemList = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container">
        <section>
          <SectionTitle title="베스트 상품"></SectionTitle>
          <ul>
            <li>card</li>
          </ul>
        </section>
        <section>
          <div>
            <SectionTitle title="판매 중인 상품">
              <input></input>
              <Button>상품 등록하기</Button>
            </SectionTitle>
          </div>
          <ul>
            <li>
              <ItemListGeneral />
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ItemList;
