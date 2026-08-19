import BestPostCard from "./BestPostCard";
import type { ArticleListItem } from "@/types/article";

interface BestPostListProps {
  posts: ArticleListItem[];
  onToggleLike: (id: number, isLiked: boolean) => void;
}

export default function BestPostList({ posts, onToggleLike }: BestPostListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={` ${index === 0 ? "block" : ""} ${index === 1 ? "hidden md:block" : ""} ${index === 2 ? "hidden xl:block" : ""} `}
        >
          <BestPostCard post={post} onToggleLike={onToggleLike} />
        </div>
      ))}
    </div>
  );
}