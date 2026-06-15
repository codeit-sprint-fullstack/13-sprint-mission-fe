import { NextResponse } from "next/server";
import { getStore } from "../../../../../lib/store";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;
  const post = getStore().posts.find((item) => item.id === id);

  if (!post) {
    return NextResponse.json(
      { message: "게시글을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ list: post.comments });
}

export async function POST(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const content = String(body.content || "").trim();
  const store = getStore();
  const post = store.posts.find((item) => item.id === id);

  if (!post) {
    return NextResponse.json(
      { message: "게시글을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  if (!content) {
    return NextResponse.json(
      { message: "댓글을 입력해주세요." },
      { status: 400 },
    );
  }

  const comment = {
    id: String(store.nextCommentId++),
    content,
    createdAt: new Date().toISOString(),
  };

  post.comments.unshift(comment);

  return NextResponse.json(comment, { status: 201 });
}
