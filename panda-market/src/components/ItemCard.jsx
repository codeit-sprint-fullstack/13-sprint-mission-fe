import React from "react";
import { useState } from "react";
import heart from "../assets/icon/heart.svg";
import heartFill from "../assets/icon/heart-fill.svg";

export default function ItemCard({ id, image, name, price, favoriteCount }) {
  const [like, setLike] = useState(false);
  const isLiked = like ? heartFill : heart;
  return (
    <div className="wrapper" key={id}>
      <img className="image" src={image} />
      <div className="container">
        <h3 className="title">{name}</h3>
        <p className="price">{price}</p>
        <div>
          <img
            className="isLiked"
            onClick={() => setLike((prev) => !prev)}
            src={isLiked}
          />
          <p className="favoriteCount">{favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
