import { notFound } from "next/navigation";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPost(id) {
  const response = await fetch(`${BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json();
}

async function getComments(id) {
  const response = await fetch(`${BASE_URL}/articles/${id}/comments?limit=10`, {
    cache: "no-store",
  });
  if (!response.ok) return [];
  const data = await response.json();
  return data.list ?? [];
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return notFound();
  const comments = await getComments(id);

  return (
    <div>
      {/* 제목 영역 */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0" />
            <span className="font-medium">{post.writer.nickname}</span>
            <span className="text-gray-300">|</span>
            <span>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
          </div>
          <button className="flex items-center gap-1 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition">
            ❤️ {post.likeCount}
          </button>
        </div>
      </div>

      {/* 본문 */}
      <p className="text-gray-700 text-base leading-7 whitespace-pre-wrap mb-16">
        {post.content}
      </p>

      {/* 댓글 입력 */}
      <div className="mb-10">
        <h2 className="text-lg font-bold mb-4">댓글달기</h2>
        <textarea
          placeholder="댓글을 입력해주세요."
          className="w-full border border-gray-200 rounded-2xl p-5 h-[130px] outline-none focus:border-blue-400 resize-none text-sm bg-gray-50"
        />
        <div className="flex justify-end mt-3">
          <button className="bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition">
            등록
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="mb-16">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-16">
            아직 댓글이 없어요
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 py-6">
              <div className="flex justify-between items-start mb-6">
                <p className="text-base text-gray-700 flex-1 leading-6">
                  {comment.content}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {comment.writer.nickname}
                  </p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(comment.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 목록으로 돌아가기 */}
      <div className="flex justify-center">
        <Link
          href="/"
          className="bg-blue-500 text-white px-14 py-3.5 rounded-full text-base font-medium hover:bg-blue-600 transition"
        >
          목록으로 돌아가기 →
        </Link>
      </div>
    </div>
  );
}
