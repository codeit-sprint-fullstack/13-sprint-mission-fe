import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./Product.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("서버 연결되었습니다.");

    const products = [];
    for (let i = 1; i <= 50; i++) {
      products.push({
        name: `이진태 ${i}`,
        price: 0,
      });
    }

    await Product.insertMany(products);
    console.log("성공");

    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("에러:", error);
    process.exit(1);
  }
};

seedData();
