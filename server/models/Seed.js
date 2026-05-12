import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./Product.js";
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const seedData = [
  {
    name: "아나의 생체 슈류탄",
    description: "아군 사용시 힐증, 적군 사용시 힐밴",
    price: 52000,
    tags: ["힐러", "개사기"],
    favoriteCount: 2509127,
  },
  {
    name: "키리코의 방울",
    description: "폭힐 및 무적기",
    price: 50000,
    tags: ["힐러", "개사기"],
    favoriteCount: 3219856,
  },
  {
    name: "토르비욘의 망치",
    description: "꼬마 망치 나가신다",
    price: 9200,
    tags: ["딜러", "보조무기", "포탑깡깡", "망치살인마", "싸이코"],
    favoriteCount: 18,
  },
  {
    name: "설구",
    description: "주변을 얼리는 똑똑한 보조 로봇",
    price: 9200,
    tags: ["딜러", "개쓰레기궁", "제발열려줘", "싸이코"],
    favoriteCount: 287,
  },
];

async function seed() {
  await mongoose.connect(process.env.DB_URI);
  console.log("1. Seed위한 DB 연결 성공");

  await Product.deleteMany({});
  console.log("2. 기존 데이터 삭제 완료");

  await Product.insertMany(seedData);
  console.log(`3. 시드 데이터 ${seedData.length}기 삽입 완료`);

  await mongoose.disconnect();
  console.log("4. DB 연결 종료");
}
seed();
