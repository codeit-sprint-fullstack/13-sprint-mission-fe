# 🐼 판다마켓 프로젝트

# 배포주소 :https://fs13kdysprint.netlify.app/

## 스프린트 1 요구사항

### 기본 — 랜딩 페이지

- [x] React 등 UI 라이브러리 사용 없이 순수 HTML/CSS로 구현
- [x] PC 사이즈 기준 디자인 구현
- [x] Netlify 배포 ([참고](https://www.codeit.kr/learn/5309))
- [x] 랜딩 페이지 URL: `/`
- [x] `<title>` = **판다마켓**
- [x] 로고 클릭 → `/`
- [x] 로그인 버튼 클릭 → `/login` (빈 페이지)
- [x] "구경하러 가기" 버튼 클릭 → `/items` (빈 페이지)
- [x] Privacy Policy 클릭 → `/privacy`, FAQ 클릭 → `/faq` (모두 빈 페이지)
- [x] SNS 아이콘(페이스북·트위터·유튜브·인스타그램) 클릭 → 새 창으로 각 홈페이지 이동
- [x] GNB(로고 + 로그인 버튼) 스크롤 시 상단 고정
- [x] 너비 ≥ 1920px: 배경은 꽉 채우고, 내부 요소 위치 고정, 여백만 증가
- [x] 너비 < 1920px: 로고 왼쪽 여백 200px / 로그인 버튼 오른쪽 여백 200px 유지, 두 요소 간 거리 좁아짐
- [x] 너비 ≥ 1920px: 내부 요소 동일 간격 유지하며 가운데 정렬
- [x] 너비 < 1920px: 하단 "codeit-2024" 왼쪽 200px / SNS 아이콘 오른쪽 200px 유지, Privacy·FAQ와 균등 간격 유지
- [ ] 클릭 가능한 요소에 `cursor: pointer` 적용

### 심화 — 공통

- [ ] `reset.css` 적용
- [ ] 모든 크기 값(간격·요소 크기·font-size 등)을 브라우저 기본 폰트 크기에 따라 유동적으로 변하도록 설정

#

## 스프린트 2 요구사항

### 기본 — 공통

- [x] `README.md` 작성 (내용 자유, 마크다운 문법 활용)
- [x] 본인 브랜치(`part1-홍길동`)에 미션 업로드
- [x] 적절한 커밋 메시지 작성
- [x] `1-Sprint-Mission` 레포지토리 fork
- [x] upstream 본인 브랜치로 PR 생성
- [x] PR 코멘트에 아래 내용 포함
  - [x] 요구사항 체크리스트 (완료 항목 체크)
  - [x] 주요 변경사항
  - [x] 멘토님께 남길 메시지
- [x] Git 활용 시 유닉스 커맨드 사용
- [x] Netlify 배포 ([참고](https://www.codeit.kr/learn/5309))

### 기본 — 로그인·회원가입 공통

- [x] 로고 클릭 → `/`
- [x] SNS 아이콘 클릭 → [Google](https://www.google.com/) / [Kakao](https://www.kakaocorp.com/page/) 이동
- [x] input focus in: 테두리 색상 `#3692FF`
- [x] input focus out: 테두리 없음

### 기본 — 로그인 페이지

- [x] "회원가입" 클릭 → `/signup`

### 기본 — 회원가입 페이지

- [x] "로그인" 클릭 → `/login`

### 심화 — 공통

- [x] 팔레트 색상 값을 CSS 변수로 등록하여 사용
- [x] 구글 애널리틱스 연동으로 방문자 수 확인 설정

### 심화 — 로그인·회원가입 공통

- [x] 비밀번호·비밀번호 확인 input 오른쪽에 눈 모양 아이콘 추가 (비밀번호 표시/숨김 토글)

## 스프린트 3 요구사항

- [x] Github에 스프린트 미션 PR을 만들어 주세요.
- [x] 'https://panda-market-api-crud.vercel.app/docs/#/Article' API를 이용하여 아래 함수들을 구현해 주세요.
  - [x] `getArticleList()` : GET 메서드를 사용해 주세요.
    - [x] `page`, `pageSize`, `keyword` 쿼리 파라미터를 이용해 주세요.
  - [x] `getArticle()` : GET 메서드를 사용해 주세요.
  - [x] `createArticle()` : POST 메서드를 사용해 주세요.
    - [x] request body에 `title`, `content`, `image` 를 포함해 주세요.
  - [x] `patchArticle()` : PATCH 메서드를 사용해 주세요.
  - [x] `deleteArticle()` : DELETE 메서드를 사용해 주세요.
- [x] `fetch` 혹은 `axios` 를 이용해 주세요.
  - [x] 응답의 상태 코드가 2XX가 아닐 경우, 에러메시지를 콘솔에 출력해 주세요.
- [x] `.then()` 메서드를 이용하여 비동기 처리를 해주세요.
- [x] `.catch()` 를 이용하여 오류 처리를 해주세요.
- [x] 'https://panda-market-api-crud.vercel.app/docs/#/Product' API를 이용하여 아래 함수들을 구현해 주세요.
  - [x] `getProductList()` : GET 메서드를 사용해 주세요.
    - [x] `page`, `pageSize`, `keyword` 쿼리 파라미터를 이용해 주세요.
  - [x] `getProduct()` : GET 메서드를 사용해 주세요.
  - [x] `createProduct()` : POST 메서드를 사용해 주세요.
    - [x] request body에 `name`, `description`, `price`, `tags`, `images` 를 포함해 주세요.
  - [x] `patchProduct()` : PATCH 메서드를 사용해 주세요.
  - [x] `deleteProduct()` : DELETE 메서드를 사용해 주세요.
- [x] `async/await` 을 이용하여 비동기 처리를 해주세요.
- [x] `try/catch` 를 이용하여 오류 처리를 해주세요.
- [x] 구현한 함수들을 아래와 같이 파일을 분리해 주세요.
  - [x] `export`를 활용해 주세요.
  - [x] `ProductService.js` 파일 Product API 관련 함수들을 작성해 주세요.
  - [x] `ArticleService.js` 파일에 Article API 관련 함수들을 작성해 주세요.
- [x] 이외의 코드들은 모두 `main.js` 파일에 작성해 주세요.
  - [x] `import`를 활용해 주세요.
  - [x] 각 함수를 실행하는 코드를 작성하고, 제대로 동작하는지 확인해 주세요.
