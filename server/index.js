import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./models/index.js";
import { productRouter } from "./routes/index.js";
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config(); //.env파일 사용

const app = express(); //express 사용 시작
app.use(express.json()); //res.body 설정
app.use(
  cors({
    origin: [
      process.env.CLIENT_DEV_URL, // 개발용 프론트엔드
      process.env.CLIENT_PROD_URL, // 배포된 프론트엔드
    ],
  }),
);

connectDB(); //DB연결

app.get("/", (req, res) => {
  res.send("서버 잘 작동중!");
});
app.use("/products", productRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("서버 실행 중");
});
