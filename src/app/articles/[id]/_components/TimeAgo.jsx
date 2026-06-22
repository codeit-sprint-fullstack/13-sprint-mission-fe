"use client";

import useMounted from "@/utils/useMounted.js";
import clsx from "clsx";

function getRelativeTime(createdAt) {
  const diffSec = Math.floor((Date.now() - new Date(createdAt)) / 1000);

  if (diffSec < 60) return "방금 전";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}일 전`;

  return new Date(createdAt).toLocaleDateString("ko-KR");
}

export default function TimeAgo({ className = "", createdAt = "" }) {
  const mounted = useMounted();

  const label = !createdAt ? "-" : mounted ? getRelativeTime(createdAt) : "";

  return <span className={clsx(className)}>{label}</span>;
}
