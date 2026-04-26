import React from "react";
import { useState } from "react";
import heart from "../assets/icon/heart.svg";
import heartFill from "../assets/icon/heart-fill.svg";

export default function ItemCard({ id, image, name, price, favoriteCount }) {
  const [like, setLike] = useState(false);
  const isLiked = like ? heart : heartFill;
  return (
    <div key={id}>
      <img src={image} />
      <div>
        <div>
          <h3>{name}</h3>
          <p>{price}</p>
        </div>
        <div>
          <img onClick={() => setLike((prev) => !prev)} src={isLiked} />
          <p>{favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
