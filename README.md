# 판다마켓

판다마켓은 중고 상품을 등록하고 거래 정보를 나누며, 자유게시판에서 사용자들과 소통할 수 있는 웹 애플리케이션입니다. Next.js App Router와 TypeScript로 구현했습니다.

## 주요 기능

- 이메일 회원가입 및 로그인, 브라우저 세션 관리
- 상품 목록 조회, 검색, 정렬 및 페이지네이션
- 상품 등록, 상세 조회, 수정 및 삭제
- 상품 좋아요와 댓글 등록, 수정 및 삭제
- 게시글 목록 조회, 검색 및 정렬
- 게시글 등록, 상세 조회, 수정 및 삭제
- 게시글 좋아요와 댓글 등록, 수정 및 삭제

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Node.js Test Runner

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 API 주소를 설정할 수 있습니다.

```env
NEXT_PUBLIC_API_URL=https://panda-market-api-crud.vercel.app
```

환경변수를 생략하면 위 주소를 기본값으로 사용합니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

## 명령어

```bash
npm run dev    # 개발 서버 실행
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 서버 실행
npm run lint   # ESLint 검사
npm test       # 테스트 실행
```

## 프로젝트 구조

```text
src/
├── app/          # 페이지와 공통 UI 컴포넌트
│   ├── boards/   # 게시판
│   ├── items/    # 상품
│   ├── login/    # 로그인
│   └── signup/   # 회원가입
├── lib/          # 인증, 상품, 게시글 API 모듈
└── types/        # 공통 TypeScript 타입
tests/            # 상태 및 API 단위 테스트
public/           # 이미지와 정적 파일
```

## 페이지

| 경로 | 설명 |
| --- | --- |
| `/` | 랜딩 페이지 |
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/items` | 상품 목록 |
| `/items/write` | 상품 등록 |
| `/items/[id]` | 상품 상세 |
| `/boards` | 게시글 목록 |
| `/boards/write` | 게시글 등록 |
| `/boards/[id]` | 게시글 상세 |
