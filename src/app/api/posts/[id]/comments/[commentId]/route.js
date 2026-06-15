import { NextResponse } from "next/server";
import { getStore } from "../../../../../../lib/store";

export const dynamic = "force-dynamic";

function findComment(postId, commentId) {
  const post = getStore().posts.find((item) => item.id === postId);

  if (!post) {
    return {};
  }

  const commentIndex = post.comments.findIndex(
    (comment) => comment.id === commentId,
  );

  return { post, comment: post.comments[commentIndex], commentIndex };
}

export async function PATCH(request, { params }) {
  const { id, commentId } = await params;
  const body = await request.json();
  const content = String(body.content || "").trim();
  const { comment } = findComment(id, commentId);

  if (!comment) {
    return NextResponse.json(
      { message: "댓글을 찾을 수 없습ㅂ니다." },
      { status: 404 },
    );
  }

  if (!content) {
    return NextResponse.json(
      { message: "댓글을 입력해주세요." },
      { status: 400 },
    );
  }

  comment.content = content;
  return NextResponse.json(comment);
}

export async function DELETE(_request, { params }) {
  const { id, commentId } = await params;
  const { post, commentIndex } = findComment(id, commentId);

  if (!post || commentIndex === -1) {
    return NextResponse.json(
      { message: "댓글을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  post.comments.splice(commentIndex, 1);

  return NextResponse.json({ ok: true });
}
