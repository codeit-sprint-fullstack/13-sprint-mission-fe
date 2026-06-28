"use client";

import { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import CommentViewItem from "./CommentViewItem";

export default function CommentList({ comments }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col gap-4 pb-6 border-b border-gray-200"
        >
          {editingId === comment.id ? (
            <CommentEditForm
              comment={comment}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <CommentViewItem
              comment={comment}
              onEdit={() => setEditingId(comment.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
