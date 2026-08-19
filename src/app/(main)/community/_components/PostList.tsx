import Image from "next/image";
import heartIcon from "@/assets/icons/ic_heart.svg";
import notebookImg from "@/assets/notebook.png";
import Link from "next/link";
import WriterInfo from "@/components/common/WriterInfo";
import { ROUTES } from "@/constants/navigation";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostList({ post }: PostCardProps) {
  return (
    <Link href={ROUTES.COMMUNITY.DETAIL(post.id)}>
      <div className="border-cool-gray-200 flex w-full max-w-300 flex-col border-b bg-[#FCFCFC] pb-6">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full justify-between gap-2 self-stretch">
            <div className="text-cool-gray-800 text-[1.25rem] leading-8 font-semibold">
              {post.title}
            </div>

            <div className="border-cool-gray-200 relative h-18 w-18 shrink-0 items-end justify-center rounded-md border border-solid bg-white px-3 py-[0.86rem]">
              <Image
                src={post.images?.[0] || notebookImg}
                alt="기본 카드 이미지"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <WriterInfo writer={post.writer} createdAt={post.createdAt} />
            <div className="flex items-center gap-1">
              <Image src={heartIcon} alt="좋아요 아이콘" />
              <div className="text-secondary-500">{post.likeCount}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
