import PostDetail from "../../../components/PostDetail";

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  return <PostDetail postId={id} />;
}
