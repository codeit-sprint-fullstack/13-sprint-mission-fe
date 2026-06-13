export const getDate = (stringDate) => {
  const date = new Date(stringDate);
  return `${date.getFullYear()}. ${String(date.getMonth()).padStart(2, "0")}. ${String(date.getDay()).padStart(2, "0")}`;
};
