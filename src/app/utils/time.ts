import { ArticleComment } from "@/types/comment";

export function formatTimeAgo(createdAt: ArticleComment["createdAt"]): string {
  const normalized = createdAt.endsWith("Z") ? createdAt : createdAt + "Z";
  const allmsTime = Date.now() - new Date(normalized).getTime();
  const allSecond = Math.floor(allmsTime / 1000);
  const allMinute = Math.floor(allSecond / 60);
  const allTime = Math.floor(allMinute / 60);
  const allDay = Math.floor(allTime / 24);

  if (allSecond < 60 && !allMinute) {
    return allSecond + "초 전";
  }
  if (allMinute < 60 && !allTime) {
    return allMinute + "분 전";
  }
  if (allTime < 24 && !allDay) {
    return allTime + "시간 전";
  }
  return allDay + "일 전";
}
