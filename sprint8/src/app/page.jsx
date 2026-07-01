import Link from "next/link";
import { getPosts } from "@/lib/api";
import PostList from "@/components/common/PostList";

export default async function Page() {
  const bestPosts = await getPosts({ orderBy: "like", pageSize: 3 });

  return (
    <>
      {/* 베스트 게시글 */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold">베스트 게시글</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestPosts.list.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <article className="rounded-xl overflow-hidden hover:shadow-md transition bg-gray-50 cursor-pointer p-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 text-xs bg-blue-500 text-white rounded font-semibold mb-2">
                      🏆 Best
                    </span>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-4">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.writer.nickname}</span>
                      <div className="flex items-center gap-2">
                        <span>
                          ❤️ {post.likeCount >= 9999 ? "9999+" : post.likeCount}
                        </span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* 게시글  */}
      <PostList />
    </>
  );
}
