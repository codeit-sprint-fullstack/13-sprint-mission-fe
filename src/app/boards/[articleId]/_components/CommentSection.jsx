"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentSection() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <section aria-label="댓글">
      <CommentForm onSuccess={() => setRefreshTrigger((prev) => !prev)} />
      <CommentList
        refreshTrigger={refreshTrigger}
        onSuccess={() => setRefreshTrigger((prev) => !prev)}
      />
    </section>
  );
}
