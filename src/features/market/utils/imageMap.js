import p1 from "../../../Images/product_1.png";
import p2 from "../../../Images/product_2.png";
import p3 from "../../../Images/product_3.png";
import p4 from "../../../Images/product_4.png";
import p5 from "../../../Images/product_5.png";
import p6 from "../../../Images/product_6.png";
import p7 from "../../../Images/product_7.png";
import p8 from "../../../Images/product_8.png";
import p9 from "../../../Images/product_9.png";
import p10 from "../../../Images/product_10.png";
import p11 from "../../../Images/product_11.png";
import p12 from "../../../Images/product_12.png";

const images = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];

export const getProductImage = (id) => {
  return images[id % images.length];
};
