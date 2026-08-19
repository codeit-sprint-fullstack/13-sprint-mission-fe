import PostForm from "@/components/common/PostForm";
import { ROUTES } from "@/constants/navigation";
import { registerPostSchema } from "@/schemas/postSchema";
import { createPostServer } from "@/services/postService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const validated = registerPostSchema.parse({ title, content });
    const response = await createPostServer(validated);
    const newPostId = response?.data?.id;

    revalidatePath(ROUTES.COMMUNITY.BASE);

    if (newPostId) {
      redirect(ROUTES.COMMUNITY.DETAIL(newPostId));
    } else {
      redirect(ROUTES.COMMUNITY.BASE);
    }
  }

  return (
    <div>
      <PostForm type="register" action={handleCreate} />
    </div>
  );
}
