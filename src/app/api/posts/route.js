import { NextResponse } from "next/server";
import { getStore, serializePost } from "../../../lib/store";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const sort = searchParams.get("sort") || "latest";
  const limit = Number(searchParams.get("limit") || 0);
  const store = getStore();

  let posts = store.posts
    .filter((post) => post.title.toLowerCase().includes(query))
    .sort((first, second) => {
      const firstTime = new Date(first.createdAt).getTime();
      const secondTime = new Date(second.createdAt).getTime();
      return sort === "oldest"
        ? firstTime - secondTime
        : secondTime - firstTime;
    });

  if (limit > 0) {
    posts = posts.slice(0, limit);
  }

  return NextResponse.json({ list: posts.map(serializePost) });
}

export async function POST(request) {
  const body = await request.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "").trim();

  if (!title || !content) {
    return NextResponse.json(
      { message: "제목과 내용을 입력해주세요." },
      { status: 400 },
    );
  }

  const store = getStore();
  const post = {
    id: String(store.nextPostId++),
    title,
    content,
    imageUrl: "",
    createdAt: new Date().toISOString(),
    comments: [],
  };

  store.posts.unshift(post);

  return NextResponse.json(serializePost(post), { status: 201 });
}
