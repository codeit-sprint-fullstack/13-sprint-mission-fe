import PostCard from "./PostCard";

export default function PostList({ posts, onToggleLike }) {
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
