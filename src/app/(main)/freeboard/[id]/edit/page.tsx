import { getArticle } from "@/api/articles";
import EditForm from "../../_components/EditForm";

interface EditPostProps {
  params: Promise<{ id: string }>;
}

export default async function EditPost({ params }: EditPostProps) {
  const { id } = await params;
  const post = await getArticle(id);

  return <EditForm id={id} initialTitle={post.title} initialContent={post.content} initialImages={post.images} />;
}