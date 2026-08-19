import Image from "next/image";
import bestBadge from "@/assets/img_badge.png";
import notebookImg from "@/assets/notebook.png";
import heartIcon from "@/assets/icons/ic_heart.svg";
import dateFormat from "@/utils/dateFormat";
import Link from "next/link";
import { ROUTES } from "@/constants/navigation";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = dateFormat(post.createdAt);

  return (
    <Link href={ROUTES.COMMUNITY.DETAIL(post.id)}>
      <div className="px bg-cool-gray-50 flex h-42.25 w-[24rem] flex-col rounded-lg px-6 py-0">
        <div className="flex h-38.25 w-84 flex-col">
          <Image src={bestBadge} alt="베스트 뱃지" className="mb-4" />
          <div className="flex w-full justify-center gap-2">
            <div className="text-secondary-800 w-[16rem] shrink-0 text-[1.25rem] font-semibold">
              {post.title}
            </div>
            <div className="border-cool-gray-200 relative h-18 w-18 shrink-0 items-end justify-center rounded-md border border-solid bg-white px-3 py-[0.86rem]">
              <Image
                src={post.images?.[0] || notebookImg}
                alt="기본 카드 이미지"
              />
            </div>
          </div>

          <div className="mt-auto flex w-full items-center justify-between gap-2 text-[0.875rem] font-normal">
            <div className="flex items-center gap-2">
              <div className="text-secondary-600">
                {post.writer?.nickname || "총명한 판다"}
              </div>
              <div className="flex items-center gap-1">
                <Image src={heartIcon} alt="좋아요 아이콘" />
                <div className="text-secondary-500">{post.likeCount}</div>
              </div>
            </div>
            <div className="text-secondary-400">{formattedDate}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
