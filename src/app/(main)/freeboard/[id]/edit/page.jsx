import { getArticle } from "@/api/articles";
import EditForm from "../../_components/EditForm";

export default async function EditPost({ params }) {
  const { id } = await params;
  const post = await getArticle(id);

  return (
    <EditForm id={id} initialTitle={post.title} initialContent={post.content} initialImages={post.images ?? []} />
  );
}
