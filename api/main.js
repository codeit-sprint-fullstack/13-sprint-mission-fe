import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

async function runTests() {
  console.log("=== 전체 API 테스트 시작 ===\n");

  try {
    console.log("--- 상품 기능 테스트 시작 ---");
    const list = await getProductList(1, 10, "");
    console.log("1. 상품 목록 조회 성공");

    const newProduct = await createProduct(
      "테스트 노트북",
      "좋은 노트북입니다",
      1200000,
      ["전자기기", "노트북"],
      ["https://example.com/image.jpg"]
    );
    console.log("2. 상품 생성 성공", newProduct.id);

    await getProduct(newProduct.id);
    console.log("3. 상품 상세 조회 성공");

    await patchProduct(newProduct.id, { name: "수정된 노트북" });
    console.log("4. 상품 수정 성공");

    await deleteProduct(newProduct.id);
    console.log("5. 상품 삭제 성공\n");



    console.log("--- 게시글 기능 테스트 시작 ---");
    await getArticleList(1, 10, "");
    console.log("6. 게시글 목록 조회 성공");

    const newArticle = await createArticle("테스트 제목", "테스트 내용입니다", "https://example.com/img.jpg");
    console.log("7. 게시글 생성 성공", newArticle.id);

    await getArticle(newArticle.id);
    console.log("8. 게시글 상세 조회 성공");

    await patchArticle(newArticle.id, { title: "수정된 제목" });
    console.log("9. 게시글 수정 성공");

    await deleteArticle(newArticle.id);
    console.log("10. 게시글 삭제 성공\n");

    console.log("🎉 모든 테스트가 성공적으로 완료되었습니다!");

  } catch (error) {
    console.error("❌ 테스트 중 오류 발생:", error.message);
  }
}

runTests();