import React from "react";
import Button from "../components/Button/Button";
import SectionTitle from "../components/SectionTitle";
import ItemListGeneral from "../components/ItemList/ItemListGeneral";
import ItemListBest from "../components/ItemList/ItemListBest";

const Items = () => {
  return (
    <div className="container">
      <section>
        <ItemListBest />
      </section>
      <section>
        <ItemListGeneral />
      </section>
    </div>
  );
};

export default Items;
