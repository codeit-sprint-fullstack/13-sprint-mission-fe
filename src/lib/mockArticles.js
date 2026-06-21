// ⚠️ 임시 가짜 데이터 — 나중에 백엔드 API(fetch)로 교체할 예정
export const mockArticles = [
  {
    id: 1,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    content: "급하게 팔아야 하는 상황입니다. 적정 가격 알려주세요.",
    createdAt: "2024-04-16",
  },
  {
    id: 2,
    title: "아이패드 프로 11인치 사고 싶은데 어디서 사는 게 좋을까요?",
    content: "중고로 사려는데 주의할 점 있을까요?",
    createdAt: "2024-04-15",
  },
  {
    id: 3,
    title: "기계식 키보드 추천 부탁드립니다",
    content: "사무용으로 조용한 거 찾고 있어요.",
    createdAt: "2024-04-14",
  },
  {
    id: 4,
    title: "모니터 27인치 4K 가성비 좋은 거 있나요?",
    content: "예산은 30만원 정도 생각하고 있습니다.",
    createdAt: "2024-04-13",
  },
  {
    id: 5,
    title: "오늘 도림천 같이 산책할 분 계신가요?",
    content: "날씨가 좋네요. 저녁에 가실 분 구해요.",
    createdAt: "2024-04-12",
  },
];

// 지금은 가짜 데이터를 반환. 나중에 이 함수 내부만 fetch 로 교체하면 됨.
export async function getArticles() {

  return mockArticles;
}