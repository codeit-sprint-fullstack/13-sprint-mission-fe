import { getArticleById, updateArticle } from "@/lib/services/articleApi";

// app/api/articles/:id
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const articles = await getArticleById(id);

    return Response.json(articles);
  } catch (error) {
    return Response.json(
      { error: "게시글 데이터를 가져오는 데 실패했습니다." },
      { status: 500 },
    );
  }
}

// PATCH /api/articles/:id
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateArticle(id, body);
    
    return Response.json(updated);
  } catch (error) {
    return Response.json(
      { error: "게시글 수정 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  // deleteArticle
}
