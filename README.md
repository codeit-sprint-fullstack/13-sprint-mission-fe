🐼 Panda Market Fullstack Project
React와 Express를 활용하여 구축한 판다마켓 풀스택 애플리케이션입니다.

상품 등록부터 목록 조회, 검색, 페이지네이션까지 직접 구현한 API를 통해 관리됩니다.

🔗 배포 주소
Back-end (Render): https://panda-market-fullstack.onrender.com

Front-end (Vercel/Local): [지훈님의 프론트 배포 주소가 있다면 여기에 입력]

🛠 사용 기술 스택
Front-end: React, React Router, CSS (마이그레이션)

Back-end: Node.js, Express.js

Database: MongoDB Atlas (Mongoose)

Deployment: Render.com

📌 주요 구현 사항

1. 백엔드 (Express & MongoDB)
   Product Schema: name, description, price, tags, createdAt, updatedAt 필드 구성

Restful API 구현:

POST /products: 상품 등록 (Validation 처리)

GET /products: 상품 목록 조회 (최신순 정렬, 검색, Offset 페이지네이션)

GET /products/:id: 상품 상세 조회

PATCH /products/:id: 상품 정보 수정

DELETE /products/:id: 상품 삭제

CORS 설정: 로컬 환경 및 배포 환경 접근 허용

환경 변수 관리: .env를 통한 포트 및 MongoDB URI 보안 관리

2. 프론트엔드 (React)
   페이지 마이그레이션: 기존 HTML/CSS 랜딩 페이지를 리액트 컴포넌트로 전환 (/)

중고마켓 페이지 (/items):

직접 구현한 GET API 연동 (최신순 목록 조회)

검색 기능을 통한 상품 필터링

내비게이션 바 활성화 스타일링 (#3692FF)

상품 등록 페이지 (/registration):

심화 요구사항 반영: 모든 필드 입력 시에만 등록 버튼 활성화

Custom Hook: 유효성 검사 로직 분리 (상품명 1~10자, 소개 10~100자 등)

태그 시스템: 엔터 키 입력 시 칩(Chip) 형태로 태그 추가 기능

등록 성공 시 상세 페이지(빈 페이지)로 이동

📂 프로젝트 구조
Plaintext
sprint-mission-5
├── frontend/ # React 프로젝트
│ ├── src/
│ │ ├── hooks/ # 유효성 검사 Custom Hooks
│ │ ├── components/ # 공통 컴포넌트
│ │ └── pages/ # 랜딩, 목록, 등록 페이지
└── backend/ # Express 프로젝트
├── models/ # Mongoose Schema (Product.js)
├── .env # 환경 변수 (Git 제외)
└── app.js # Express 서버 및 API 로직
🚀 시작하기
환경 변수 설정
backend 폴더 내에 .env 파일을 생성하고 아래 내용을 입력하세요.

코드 스니펫
PORT=8000
MONGODB_URI=your_mongodb_connection_string
설치 및 실행
Backend:

Bash
cd backend
npm install
npm start
Frontend:

Bash
cd frontend
npm install
npm run dev
📝 제출 체크리스트 확인
[o] React, Express 사용

[o] MongoDB & Mongoose 연동

[o] Render.com 배포 완료

[] 모든 API 적절한 상태 코드 및 에러 처리

[] 심화 요구사항(Custom Hook, 태그 칩, 버튼 비활성화) 반영

작성자: 김지훈 (jihun5914)

과제명: 5차 스프린트 미션 (풀스택 마켓 구현)
