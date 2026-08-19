import PostCard from "./PostCard";
import type { ArticleListItem } from "@/types/article";

interface PostListProps {
  posts: ArticleListItem[];
  onToggleLike: (id: number, isLiked: boolean) => void;
}

export default function PostList({ posts, onToggleLike }: PostListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} onToggleLike={onToggleLike} />
        </li>
      ))}
    </ul>
  );
}