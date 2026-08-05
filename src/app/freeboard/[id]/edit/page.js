import PostForm from "../../../../components/PostForm";

export default async function EditPostPage({ params }) {
  const { id } = await params;
  return <PostForm mode="edit" postId={id} />;
}
