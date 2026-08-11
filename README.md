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

## 프론트엔드와 백엔드 함께 시작하기

로그인, 좋아요, 댓글, 작성자 소유권 기능까지 확인하려면 제공된 백엔드를
`http://localhost:3001`에서 실행하고 프론트엔드가 그 주소를 사용하도록 설정해야 합니다.
외부 CRUD API만 연결하면 전체 인증 연동은 동작하지 않습니다.

### 1. 백엔드 실행

백엔드 저장소에서 예시 환경변수를 복사한 뒤 실제 PostgreSQL 접속 정보와 안전한 JWT 비밀키를 입력합니다.

```bash
cp .env.example .env
npm install
npx prisma migrate deploy
npm run dev
```

백엔드는 기본적으로 [http://localhost:3001](http://localhost:3001)에서 실행됩니다.
`PORT` 환경변수로 다른 포트를 사용할 수 있으며, 그 경우 프론트엔드 URL도 같은 값으로 맞춰야 합니다.

### 2. 프론트엔드 환경변수와 의존성 설정

프론트엔드 저장소에서 다음 명령을 실행합니다.

```bash
cp .env.example .env.local
npm install
```

생성된 `.env.local`은 다음 백엔드 주소를 사용합니다.

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

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
