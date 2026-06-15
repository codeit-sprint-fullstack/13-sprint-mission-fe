import { NextResponse } from "next/server";
import { getStore, serializePost } from "../../../../lib/store";

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

  return NextResponse.json(serializePost(post));
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const post = getStore().posts.find((item) => item.id === id);

  if (!post) {
    return NextResponse.json(
      { message: "게시글을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  const title = String(body.title || "").trim();
  const content = String(body.content || "").trim();

  if (!title || !content) {
    return NextResponse.json(
      { message: "제목과 내용을 입력해주세요." },
      { status: 400 },
    );
  }

  post.title = title;
  post.content = content;

  return NextResponse.json(serializePost(post));
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const store = getStore();
  const postIndex = store.posts.findIndex((item) => item.id === id);

  if (postIndex === -1) {
    return NextResponse.json(
      { message: "게시글을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  store.posts.splice(postIndex, 1);

  return NextResponse.json({ ok: true });
}
