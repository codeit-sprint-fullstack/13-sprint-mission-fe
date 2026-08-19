import PostForm from "@/components/common/PostForm";
import { ROUTES } from "@/constants/navigation";
import { getPostDetailServer, updatePost } from "@/services/postService";
import { redirect } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    redirect(ROUTES.COMMUNITY.BASE);
  }

  const response = await getPostDetailServer(id);
  const initialData = response?.data;

  if (!initialData) {
    redirect(ROUTES.COMMUNITY.BASE);
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await updatePost(id, { title, content });
    redirect(ROUTES.COMMUNITY.DETAIL(id));
  }

  return (
    <PostForm type="edit" initialData={initialData} action={handleUpdate} />
  );
}
