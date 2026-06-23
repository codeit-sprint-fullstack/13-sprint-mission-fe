# 📦 Sprint Mission - Next.js Article & Comment Web App

## 📌 프로젝트 소개

Next.js(App Router)와 React Hooks, REST API 연동을 활용하여 구축한 중고마켓 서비스의 **게시글 상세 조회 및 다이내믹 댓글 관리(CRUD)** 프론트엔드 애플리케이션입니다.

---

## 🛠 기술 스택

- Next.js (App Router, Client Component)
- React
- Tailwind CSS
- React Hooks (`useState`, `useEffect`, `useCallback`)

---

## 📁 주요 기능

### 📝 Article

- 게시글 상세 정보 조회 (`useParams` 기반 다이내믹 라우팅)
- 게시글 수정 및 삭제 기능 연동
- 공통 케밥 메뉴(`KebabMenu`)를 활용한 컴포넌트 모듈화

### 💬 Comment

- Article에 종속된 댓글 등록 / 조회 / 수정 / 삭제 (CRUD)
- Offset 기반 데이터 누적 형식의 댓글 페이지네이션 ([더보기] 버튼 제어)
- 유동적인 페이지 수 처리를 통한 UI 예외 처리

---

## 🗄 데이터 구조 및 흐름

- Article ↔ Comment (1:N 관계 기반 데이터 매핑)
- RESTful API 규격에 맞춘 엔드포인트 바인딩
  - 수정: `PATCH /articles/:articleId/comments/:commentId`
  - 삭제: `DELETE /articles/:articleId/comments/:commentId`

---

## 🚀 실행 방법

터미널에서 프로젝트의 **최상위 루트 폴더(`package.json`이 존재하는 폴더)** 위치를 확인한 후 아래 명령어를 실행합니다.

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev
```
