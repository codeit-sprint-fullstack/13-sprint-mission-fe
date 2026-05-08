import React from "react";
import Button from "../components/Button/Default";
import SectionTitle from "../components/SectionTitle";
import ItemListGeneral from "../components/ItemList/General";
import ItemListBest from "../components/ItemList/Best";

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
