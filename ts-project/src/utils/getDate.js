export const getDate = (stringDate) => {
  const date = new Date(stringDate);
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
};
export const getTime = (stringDate) => {
  const itemTime = new Date(stringDate);
  const nowTime = new Date();
  const subtractedMinutes = (nowTime - itemTime) / 1000 / 60;
  if (subtractedMinutes < 1) return "1분";
  if (subtractedMinutes < 60) return `${Math.round(subtractedMinutes)}분`;
  if (subtractedMinutes < 60 * 24)
    return `${Math.round(subtractedMinutes / 60)}시간`;
  return `${Math.round(subtractedMinutes / 60 / 24)}시간`;
};
