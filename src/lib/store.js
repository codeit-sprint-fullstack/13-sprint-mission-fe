const seedPosts = [
  {
    id: "1",
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    content:
      "사용하던 맥북을 정리하려고 합니다. 상태는 깨끗하고 구성품도 모두 있습니다. 비슷한 사양의 중고 시세가 궁금해서 의견을 구합니다.",
    imageUrl: "",
    createdAt: "2024-04-16T09:00:00.000Z",
    comments: [
      {
        id: "1",
        content: "배터리 사이클이 낮으면 조금 더 높게 올려도 괜찮을 것 같아요.",
        createdAt: "2024-04-16T10:30:00.000Z",
      },
    ],
  },
  {
    id: "2",
    title: "아이패드 프로 11인치 중고 가격 어느 정도가 적당할까요?",
    content:
      "필름과 케이스를 계속 사용해서 외관은 좋은 편입니다. 거래 전에 적정 가격을 먼저 알아보고 싶어요.",
    imageUrl: "",
    createdAt: "2024-04-15T11:20:00.000Z",
    comments: [],
  },
  {
    id: "3",
    title: "무선 키보드랑 마우스 세트로 판매하려고 합니다",
    content:
      "사무용으로 쓰던 키보드와 마우스입니다. 세트로 판매하면 더 잘 팔릴지 궁금합니다.",
    imageUrl: "",
    createdAt: "2024-04-14T08:45:00.000Z",
    comments: [],
  },
  {
    id: "4",
    title: "노트북 거치대 필요한 분 계신가요?",
    content:
      "높이 조절 가능한 노트북 거치대입니다. 책상 정리하면서 필요 없어져서 판매하려고 합니다.",
    imageUrl: "",
    createdAt: "2024-04-13T13:15:00.000Z",
    comments: [],
  },
  {
    id: "5",
    title: "휴대용 모니터 거래할 때 확인해야 할 점 알려주세요",
    content:
      "처음 중고 거래를 해보는 제품이라 화면 테스트 말고 무엇을 확인해야 하는지 궁금합니다.",
    imageUrl: "",
    createdAt: "2024-04-12T16:00:00.000Z",
    comments: [],
  },
];

function createStore() {
  return {
    posts: seedPosts.map((post) => ({
      ...post,
      comments: post.comments.map((comment) => ({ ...comment })),
    })),
    nextPostId: 6,
    nextCommentId: 2,
  };
}

export function getStore() {
  if (!globalThis.__PANDA_MARKET_STORE__) {
    globalThis.__PANDA_MARKET_STORE__ = createStore();
  }

  return globalThis.__PANDA_MARKET_STORE__;
}

export function serializePost(post) {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    comments: post.comments,
  };
}
