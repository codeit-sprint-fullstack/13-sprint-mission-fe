"use client";

import {
  createCommentsInArticle,
  deleteCommentInArticle,
  getCommentsInArticle,
  updateCommentInArticle,
} from "@/lib/api/articles.js";
import { useCallback, useEffect, useState } from "react";

export default function useComments(articleId) {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const { comments } = await getCommentsInArticle(articleId);
      setComments(comments);
    } catch (error) {
      console.error(error);
    }
  }, [articleId, setComments]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments();
  }, [fetchComments]);

  const createComment = async (content) => {
    await createCommentsInArticle({ id: articleId, payload: { content } });
    await fetchComments();
  };

  const updateComment = async ({ commentId, content }) => {
    await updateCommentInArticle({
      id: articleId,
      commentId,
      payload: { content },
    });
    await fetchComments();
  };

  const deleteComment = async (commentId) => {
    await deleteCommentInArticle({ id: articleId, commentId });
    await fetchComments();
  };

  return { comments, createComment, updateComment, deleteComment };
}
