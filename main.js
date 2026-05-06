import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

async function run() {
  // 게시글 목록 조회
  const articles = await getArticleList(1, 10, "");
  console.log("게시글 목록:", articles);

  // 게시글 생성
  const newArticle = await createArticle({
    title: "새로운 게시글",
    content: "이것은 새로운 게시글입니다.",
    image: "https://example.com/article-image.png",
  });
  console.log("생성된 게시글:", newArticle);

  // 생성 실패 시 이후 흐름 중단
  if (!newArticle) {
    console.error("게시글 생성에 실패해서 수정/삭제를 중단합니다.");
    return; // 함수 내부이므로 안전하게 return 가능
  }

  // 특정 게시글 조회
  const article = await getArticle(newArticle.id);
  console.log("조회된 게시글:", article);

  // 게시글 수정
  const updatedArticle = await patchArticle(newArticle.id, {
    title: "수정된 게시글",
    content: "이것은 수정된 게시글입니다.",
    image: "https://example.com/updated-image.png",
  });
  console.log("수정된 게시글:", updatedArticle);

  // 게시글 삭제
  const deleted = await deleteArticle(newArticle.id);
  if (deleted) {
    console.log("게시글 삭제 성공");
  } else {
    console.error("게시글 삭제 실패");
  }
}

// 프로그램 시작
run();
