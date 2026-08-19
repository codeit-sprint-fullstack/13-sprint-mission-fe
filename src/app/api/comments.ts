import { Article } from "@/types/article";
import { BASE_URL } from "./config";
import { ArticleComment, ArticleCommentResponse } from "@/types/comment";

export async function postComment(
  articleId: Article["id"],
  comment: ArticleComment["content"],
): Promise<Response> {
  const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: comment }),
  });
  return res;
}

export async function getComment(
  articleId: Article["id"],
): Promise<ArticleCommentResponse> {
  const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`);
  const commentData: ArticleCommentResponse = await res.json();
  return commentData;
}

export async function deleteComment(
  articleId: Article["id"],
  commentId: ArticleComment["id"],
): Promise<Response> {
  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );
  return res;
}

export async function updateComment(
  articleId: Article["id"],
  commentId: ArticleComment["id"],
  updatedComment: ArticleComment["content"],
): Promise<Response> {
  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: updatedComment }),
    },
  );
  return res;
}
