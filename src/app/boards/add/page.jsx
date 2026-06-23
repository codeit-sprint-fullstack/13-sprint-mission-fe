import PostForm from "@/components/PostForm";
import { FORM_MODE } from "@/constants/article";

export default function AddBoardPage() {
  return <PostForm mode={FORM_MODE.CREATE} />;
}