const names = [
  "총명한판다",
  "활발한판다",
  "차분한판다",
  "든든한판다",
  "느긋한판다",
];

export function getDisplayMeta(id) {
  const number = Number(id) || 1;
  return {
    nickname: names[number % names.length],
    likes: number % 2 === 0 ? "8743" : "9999+",
  };
}

export function formatDate(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
}
