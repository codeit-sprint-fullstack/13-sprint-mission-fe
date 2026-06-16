import { getAllArticles, createArticle } from "@/lib/services/articleApi";

// GET /articles/
export async function GET(request) {
  try {
    const articles = await getAllArticles();

    return Response.json(articles);
  } catch (error) {
    return Response.json(
      { error: "게시글 데이터를 가져오는 데 실패했습니다." },
      { status: 500 },
    );
  }
}

// POST /articles
export async function POST(request) {
  try {
    const body = await request.json();
    const newArticle = await createArticle(body);

    return Response.json(newArticle, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "게시글 등록 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
