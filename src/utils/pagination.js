export const getTotalPage = (pageSize, totalCount) => {
  return Math.ceil(totalCount / pageSize);
};
export const getRange = (currentPage, totalPage) => {
  const start = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const end = start + 5 - 1;

  const realEnd = Math.min(end, totalPage);
  return Array.from({ length: realEnd - start + 1 }, (_, i) => i + start);
};
