export async function getArticles() {
  const res = await fetch("http://localhost:3001/articles", {
    cache: "no-store",
  });

  if(!res.ok) {
    throw new Error ("게시글 목록을 불러오지 못했습니다");
  }

  return res.json();
}