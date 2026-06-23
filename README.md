# 🐼 판다마켓

이웃과 함께하는 따뜻한 중고거래 커뮤니티, 판다마켓 🐼

## 소개

안녕하세요! 판다마켓 프로젝트에 오신 것을 환영합니다! 🥳

판다마켓은 단순한 거래를 넘어 이웃과 소통하고 정보를 나누는 공간을 지향합니다.
상품을 등록하고, 자유 게시판에서 이야기를 나누며, 따뜻한 커뮤니티를 함께 만들어가요.

Next.js App Router 기반으로 구현되었으며, 게시글 작성/수정/삭제 및 댓글 기능을 제공합니다. 🚀


---

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | JavaScript |
| 스타일링 | Tailwind CSS, clsx |
| UI 라이브러리 | react-responsive |
| 기타 | Server Actions, ISR/SSR |

---

## ⚙️ 설치 및 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/damdadaxx/13-sprint-mission-fe.git
cd 13-sprint-mission-fe
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 입력합니다.

```
NEXT_PUBLIC_API_BASE_URL=http://your-api-url
API_BASE_URL=http://your-api-url
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

---

## 📁 폴더 구조

```
src/
├── app/
│   ├── api/
│   │   └── articles/                  # Route Handler
│   │       ├── route.js               # GET(목록), POST
│   │       └── [id]/route.js          # GET(상세), PATCH, DELETE
│   ├── articles/
│   │   ├── _components/               # 목록 페이지 전용 컴포넌트
│   │   │   ├── ArticleForm.jsx        # 게시글 작성/수정 통합 폼
│   │   │   ├── ArticlesList.jsx
│   │   │   ├── BestArticleList.jsx
│   │   │   ├── BestArticles.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── [id]/                      # 게시글 상세 페이지
│   │   │   ├── _components/
│   │   │   │   ├── CommentForm.jsx
│   │   │   │   ├── CommentItem.jsx
│   │   │   │   ├── CommentList.jsx
│   │   │   │   ├── Comments.jsx
│   │   │   │   ├── MoreButton.jsx
│   │   │   │   └── NoComment.jsx
│   │   │   ├── edit/page.jsx          # 게시글 수정 페이지
│   │   │   └── page.jsx               # 게시글 상세 페이지
│   │   ├── new/page.jsx               # 게시글 작성 페이지
│   │   ├── loading.jsx
│   │   └── page.jsx                   # 자유게시판 목록 페이지
│   └── assets/                        # 이미지, 아이콘 등 정적 파일
├── components/
│   ├── common/                        # 공통 컴포넌트
│   │   ├── Button.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── PageContainer.jsx
│   │   ├── InputBasic.jsx
│   │   ├── Textarea.jsx
│   │   └── FormLabel.jsx
│   └── ui/
│       ├── ErrorDisplay.jsx
│       └── LoadingDisplay.jsx
├── lib/
│   ├── constants/constants.js         # 공통 상수
│   └── services/
│       ├── actions/                   # Server Actions
│       │   ├── articles.js
│       │   └── comments.js
│       ├── articleApi.js              # 게시글 API 서비스
│       └── articleCommentApi.js       # 댓글 API 서비스
├── hooks/                             # 커스텀 훅
│   ├── useDebounce.js
│   ├── usePageSize.js
│   └── useValidators.js
└── utils/                             # 유틸리티 함수
    ├── formatDate.js
    └── getRelativeTime.js
```

---

## ✨ 주요 기능

### 자유게시판 목록
- 게시글 목록을 **최신순**으로 정렬하여 조회
- 게시글 제목 기반 **검색** 기능 (디바운스 처리)
- **베스트 게시글** 최신순 3개 노출
- URL searchParams 기반 필터 상태 관리
- Suspense를 활용한 **부분 로딩** 처리

### 게시글 등록 & 수정
- 제목, 내용 입력 시 **등록 버튼 활성화** (유효성 검사)
- 작성/수정 **통합 폼 컴포넌트** (ArticleForm)
- 등록 후 해당 게시글 상세 페이지로 자동 이동

### 게시글 상세
- 게시글 상세 정보 조회 (제목, 내용, 작성자, 날짜, 좋아요 수)
- 게시글 **수정 / 삭제** 기능 (더보기 메뉴)
- 삭제 후 목록 페이지로 이동, 존재하지 않는 게시글 접근 시 **404 처리**

### 댓글
- 댓글 입력 시 **등록 버튼 활성화**
- 댓글 **작성 / 수정 / 삭제** 기능
- 댓글이 없을 때 **빈 상태 UI** 표시
- 작성 시간 **상대적 시간 표시** (예: 3분 전, 1시간 전)

### 공통
- **반응형 디자인** (모바일 / 태블릿 / 데스크탑)
- 디폴트 프로필 이미지 프론트엔드 처리

---

> 본 프로젝트는 코드잇의 소유이며, 교육 목적으로만 사용됩니다. © 2026 Codeit. All rights reserved.