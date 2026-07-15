import BestPostCard from "./BestPostCard";

export default function BestPostList({ posts, onToggleLike }) {
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
