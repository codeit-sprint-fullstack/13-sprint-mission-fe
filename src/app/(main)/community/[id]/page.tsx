import { getPostById } from "@/lib/PostAPI";
import ArticleDetail from "./_components/ArticleDetail";
import CommentSection from "./_components/CommentSection";

export default async function CommunityDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <div className="page-container mt-8.5 flex justify-start flex-col">
      <ArticleDetail post={post} />
      <CommentSection postId={id} />
    </div>
  );
}
