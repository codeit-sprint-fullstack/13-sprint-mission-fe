import { getAllArticles } from "@/lib/services/articleApi";

// app/api/articles/route.js
export async function GET(request) {
  try {
    console.log(123)
    const articles = await getAllArticles();
    return Response.json(articles);
  } catch (error) {
    return Response.json(
      { error: "게시글 데이터를 가져오는 데 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  // createArticle
}
