"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { articleCommentApi } from "@/entities/article";
import { CommentSection, type Comment } from "@/entities/comment";
import { useAuth } from "@/entities/user";
import EmptyReply from "@/assets/png/Img_reply_empty.png";

export default function ArticleCommentSection({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ["articleComments", articleId];

  const { data: comments, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await articleCommentApi.getComments(articleId);
      return res?.list ?? [];
    },
    staleTime: 30 * 1000,
  });

  const handleCreate = async (content: string) => {
    await articleCommentApi.createComment(articleId, content);
    await queryClient.invalidateQueries({ queryKey });
  };

  const handleUpdate = async (commentId: string, content: string) => {
    const updated = await articleCommentApi.updateComment(commentId, content);
    queryClient.setQueryData<Comment[]>(queryKey, (prev) =>
      (prev ?? []).map((c) => (c.id === commentId ? { ...c, content: updated.content } : c)),
    );
  };

  const handleDelete = async (commentId: string) => {
    await articleCommentApi.deleteComment(commentId);
    queryClient.setQueryData<Comment[]>(queryKey, (prev) =>
      (prev ?? []).filter((c) => c.id !== commentId),
    );
  };

  if (isPending || !comments) {
    return <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />;
  }

  return (
    <CommentSection
      comments={comments}
      currentUserId={user?.id}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      emptyImage={EmptyReply}
      emptyText={"아직 댓글이 없어요,\n지금 댓글을 달아보세요!"}
    />
  );
}
