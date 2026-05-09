import { GROUP_SIZE } from "@/constants/constants";

/**
 * 페이지네이션 로직을 처리하여 현재 그룹의 시작/끝 페이지 및 이동할 페이지 번호를 반환하는 훅
 * @param {number} currentPage - 현재 보고 있는 페이지 번호
 * @param {number} totalCount - 전체 아이템(데이터) 개수
 * @param {number} pageSize - 한 페이지에 보여줄 아이템 개수
 *
 * @returns {Object} 페이지네이션에 필요한 계산된 값들
 * @returns {number} .totalPages - 전체 페이지 개수
 * @returns {number} .startPage - 현재 그룹에서 표시될 첫 번째 페이지 번호
 * @returns {number} .groupRange - 현재 그룹에 표시될 페이지 버튼의 개수
 * @returns {number} .prevGroup - 이전 그룹 번호
 * @returns {number} .prevStartPage - 이전 그룹으로 이동 시 보게 될 첫 번째 페이지 번호
 * @returns {number} .nextStartPage - 다음 그룹으로 이동 시 보게 될 첫 번째 페이지 번호
 */
export default function getPaginationInfo(currentPage, totalCount, pageSize) {
  // 현재 페이지가 속한 그룹 (예: 1~5페이지는 1그룹, 6~10페이지는 2그룹)
  const currentGroup = Math.ceil(currentPage / GROUP_SIZE) || 1;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalCount / pageSize);

  // 현재 그룹의 시작 페이지와 마지막 페이지 계산
  const startPage = Math.max(1, (currentGroup - 1) * GROUP_SIZE + 1);
  const endPage = Math.min(currentGroup * GROUP_SIZE, totalPages);

  // 현재 그룹에서 렌더링할 페이지 버튼의 범위 (개수)
  // Array.from({ length: groupRange })와 같이 페이지 버튼을 생성할 때 사용
  const groupRange = Math.max(0, endPage - startPage + 1);

  // 이전/다음 그룹 이동 로직
  const prevGroup = currentGroup - 1;
  const prevStartPage = (prevGroup - 1) * GROUP_SIZE + GROUP_SIZE; // 이전 그룹의 마지막 페이지로 이동 유도

  const nextGroup = currentGroup + 1;
  const nextStartPage = (nextGroup - 1) * GROUP_SIZE + 1; // 다음 그룹의 첫 번째 페이지로 이동 유도

  return {
    totalPages,
    startPage,
    groupRange,
    prevGroup,
    prevStartPage,
    nextStartPage,
  };
}
