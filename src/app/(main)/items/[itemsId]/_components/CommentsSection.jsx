"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductComments,
  createProductComment,
  updateProductComment,
  deleteProductComment,
} from "@/api/productComments";
import { getMe } from "@/api/user";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentsSection({ productId }) {
  const queryClient = useQueryClient();
  const queryKey = ["productComments", productId];
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    getMe().then((me) => setMyId(me?.id)).catch(() => {});
  }, []);

  const { data: commentsData } = useQuery({
    queryKey,
    queryFn: () => getProductComments(productId, { limit: 10 }),
    enabled: !!productId,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const { mutate: createComment } = useMutation({
    mutationFn: (content) => createProductComment(productId, content),
    onSuccess: invalidate,
  });

  const { mutate: editComment } = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateProductComment(commentId, content),
    onSuccess: invalidate,
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId) => deleteProductComment(commentId),
    onSuccess: invalidate,
  });

  const comments = commentsData?.list ?? [];

  return (
    <>
      <CommentForm onSubmit={createComment} />
      <CommentList
        comments={comments}
        onEdit={(id, content) => editComment({ commentId: id, content })}
        onDelete={deleteComment}
        myId={myId}
      />
    </>
  );
}
