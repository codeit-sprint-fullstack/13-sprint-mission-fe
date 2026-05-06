# 🐼 판다마켓 (Panda Market)

## ✨ 프로젝트 소개

판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다.
단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다. 🥳

![PandaMarket](https://github.com/user-attachments/assets/3784b99f-73c9-4349-a9a9-92b2a7563574)  
_위 이미지는 판다마켓의 대표 이미지입니다._ 📸

<br>

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)

<br>

## 💡 Key Experience

**1. 웹 표준 및 접근성 준수**
시맨틱 태그를 활용한 구조적 마크업 설계로 웹 접근성과 검색 엔진 최적화(SEO) 강화.

**2. 효율적인 모듈화 스타일링**
CSS Modules를 적용하여 스타일 충돌을 방지하고, 컴포넌트 단위의 독립적인 스타일 관리로 유지보수성 극대화.

**3. 사용자 중심의 반응형 UX 설계**
다양한 해상도 환경에서 일관된 사용자 경험을 제공하기 위한 최적의 레이아웃 구현.

<br>

## 🚀 실행 방법

1. 저장소를 클론

```bash
  git clone https://github.com/codeit-sprint-fullstack/13-sprint-mission-fe.git
```

2. 패키지 설치

```bash
  npm install
```

3. 로컬 서버 실행
```bash
  npm run dev
```

<br>

## ⚙️ 환경 변수 설정 (Environment Variables)

이 프로젝트는 API 통신 및 환경 설정을 위해 환경 변수를 사용합니다. 프로젝트를 처음 클론(Clone)받으셨다면 아래 절차에 따라 환경 설정 파일을 생성해 주세요.

1. 프로젝트 루트 폴더에 `.env` 파일을 생성합니다.
2. `.env.example` 파일의 내용을 복사하여 `.env` 파일에 붙여넣습니다.
3. 공유된 API 서버 주소를 아래와 같이 입력합니다.
```bash
VITE_API_BASE_URL=공유받은_API_주소_입력
```

<br>

## 📁 프로젝트 구조

```bash
src/
├── App.jsx     # 라우터 설정 및 메인 컴포넌트
├── assets/     # 이미지 및 정적 파일
├── components/ # 공통 컴포넌트 (ProductFilterBar 등)
├── constants/  # 공통 상수 및 설정 파일 (SOCIAL_CONFIG 등)
├── hooks/      # 커스텀 훅 (usePagination, usePageSize, fetchProducts 등)
├── layouts/    # 페이지 레이아웃 컴포넌트 (MainPage)
├── pages/      # 페이지 단위 컴포넌트
├── store/      # 전역 상태 관리 (usePageSize)
└── styles/     # 글로벌 스타일 및 공통 CSS 변수 (Reset, Variables 등)
```

<br>

## 🎯 주요 기능

**1. 동적 쿼리 기반 데이터 필터링**
검색어, 정렬 기준(orderBy), 페이지 번호를 쿼리 파라미터와 연동하여 실시간 데이터 필터링 구현.

**2. 반응형 페이지네이션**
Media Query 및 usePageSize 커스텀 훅을 활용해 기기별(모바일/태블릿/데스크탑) 최적화된 pageSize 가변 처리.

**3. 비동기 데이터 관리**
async/await 기반의 API 호출로 상품 데이터를 조회하고, useState를 통해 UI와 서버 데이터의 실시간 동기화.

**4. 설정 기반 동적 렌더링**
SNS 설정값 등 가변적인 데이터를 Config 파일로 분리하여 코드의 유지보수성 및 확장성 확보.

---

본 프로젝트는 [코드잇](https://www.codeit.kr)의 소유이며, 교육 목적으로만 사용됩니다. © 2026 Codeit. All rights reserved.
