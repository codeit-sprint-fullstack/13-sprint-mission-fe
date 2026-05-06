# 🐼 판다마켓 (Panda Market) - 중고마켓 웹 서비스

본 프로젝트는 React를 활용하여 개발된 중고마켓 웹 서비스의 상품 목록 페이지입니다. 
Figma 시안을 바탕으로 PC, Tablet, Mobile 환경에 최적화된 반응형 웹(Responsive Web)으로 구현되었습니다.


## 🛠️ 기술 스택
- **Framework:** React.js
- **Styling:** CSS (BEM Naming Convention)
- **Deployment:** [Vercel 또는 GitHub Pages 입력]
- **API Server:** Panda Market API `https://panda-market-api.vercel.app/docs/`

---

## ✨ 주요 기능 및 구현 사항

### 1. 반응형 레이아웃 (Responsive UI)
- `react-responsive` 및 CSS Media Query를 활용하여 디바이스 크기(Desktop, Tablet, Mobile)에 따른 유연한 레이아웃을 구현했습니다.
- **베스트 상품 그리드:** Desktop(4열) ➔ Tablet(2열) ➔ Mobile(1열)
- **전체 상품 그리드:** Desktop(5열) ➔ Tablet(3열) ➔ Mobile(2열)

### 2. API 통신 및 데이터 렌더링
- 공통 API 엔드포인트(`/products`)를 활용하여 데이터를 비동기적으로 불러옵니다.
- **베스트 상품:** `orderBy=favorite` 파라미터를 적용하여 좋아요가 가장 많은 상위 상품 노출
- **판매 중인 상품:** 전체 상품 목록 노출 및 에러/예외 처리 (대체 이미지 적용 등)

### 3. 검색 및 정렬 기능
- **검색 (Search):** 사용자가 입력한 키워드에 따라 상품 목록을 동적으로 필터링합니다. API 과부하를 막기 위해 디바운싱(Debouncing) 처리를 적용했습니다.
- **정렬 (Sort):** 커스텀 드롭다운 메뉴를 통해 "최신순(recent)"과 "좋아요순(favorite)"으로 목록을 실시간 정렬합니다.

### 4. 반응형 페이지네이션 (Responsive Pagination)
- 화면 크기에 따라 변하는 그리드 열(Column) 수에 맞춰 API 요청 시 전달하는 `pageSize`를 동적으로 계산합니다.
- 이를 위해 화면 너비를 감지하여 적절한 `pageSize`를 반환하는 **커스텀 훅(`usePageSize`)**을 직접 구현하여 적용했습니다.

---

## ✅ 미션 요구사항 달성 체크리스트

### 기본 요구사항 (공통)
- [x] Github에 스프린트 미션 PR을 만들어 주세요.
- [x] React를 사용해 진행합니다.

### 기본 요구사항 (중고마켓 페이지)
- [x] PC, Tablet, Mobile 디자인에 해당하는 중고마켓 페이지를 만들어 주세요.
- [x] 중고마켓 페이지 url path는 별도로 설정하지 않고, `/`에 보이도록 합니다.
- [x] 상단 네비게이션 바, 푸터는 랜딩 페이지와 동일한 스타일과 규칙으로 만들어주세요.
- [x] 상품 데이터는 API 문서에 명세된 GET 메소드 `/products`를 활용해주세요.
- [x] 상품 목록 페이지네이션 기능을 구현합니다.
- [x] 드롭 다운으로 "최신순" 또는 "좋아요순"을 선택해서 정렬을 구현하세요.
- [x] 상품 목록 검색 기능을 구현합니다.
- [x] 베스트 상품 데이터는 API의 정렬 기준 `favorite`을 사용해주세요.

### 심화 요구사항
- [x] 커스텀 hook을 만들어 필요한 곳에 활용해 보세요. (`usePageSize` 적용)
- [x] 중고 마켓의 카드 컴포넌트 반응형 기준에 맞게 열 개수를 조정합니다. (베스트 4/2/1, 전체 5/3/2)
- [x] 반응형에 따른 페이지 네이션 기능을 구현하고, 보여지는 물품 개수에 따라 서버에 보내는 `pageSize` 값을 적절하게 설정합니다.

---

## 📂 프로젝트 구조 (Directory Structure)
```text
src/
├── api/             # API 호출 로직 (productApi.js 등)
├── assets/          # 아이콘, 로고 등 정적 리소스 (public 포함)
├── components/      # 재사용 가능한 UI 컴포넌트
│   ├── FeaturedItems/
│   ├── GlobalHeader/
│   ├── GlobalFooter/
│   ├── ItemCard/
│   ├── MarketItems/
│   ├── Pagination/
│   └── ProductBoard/
├── hooks/           # 커스텀 훅 (usePageSize.js 등)
├── styles/          # CSS 스타일 파일
└── App.jsx          # 루트 컴포넌트