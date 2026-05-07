import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.error(`✅ Mongo DB 연결 성공`);
  } catch (e) {
    console.error(`❌ Mongo DB 연결 실패: ${e.message}`);
    process.exit(1); //연결 실패시 서버 종료
  }
}
export default connectDB;
