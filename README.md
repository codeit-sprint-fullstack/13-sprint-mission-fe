# 🐼 판다마켓 (Panda Market)

## ✨ 프로젝트 소개

판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다.
단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다. 🥳

![PandaMarket](https://github.com/user-attachments/assets/3784b99f-73c9-4349-a9a9-92b2a7563574)  
_위 이미지는 판다마켓의 대표 이미지입니다._ 📸

<br>

## 🛠 Tech Stack
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)


<br>

## 💡 Key Experience

**1. 웹 표준 및 접근성 준수**
- 시맨틱 태그를 활용한 구조적 마크업 설계로 웹 접근성과 검색 엔진 최적화(SEO) 강화.

**2. 효율적인 모듈화 스타일링**
- CSS Modules를 적용하여 스타일 충돌을 방지하고, 컴포넌트 단위의 독립적인 스타일 관리로 유지보수성 극대화.

**3. 사용자 중심의 반응형 UX 설계**
- 다양한 해상도 환경에서 일관된 사용자 경험을 제공하기 위한 최적의 레이아웃 구현.

**4. 고도화된 유효성 검증 및 상태 관리**

- useInputValidation 커스텀 훅을 개발하여 복잡한 입력 폼의 유효성 검사 로직을 모듈화.

- 한글 조합형 문자(Composition) 이슈를 고려한 태그 입력 시스템 구축.

**5. 성능 최적화 및 안정성 확보**

- AbortController의 signal을 활용하여 불필요한 비동기 요청을 취소함으로써 네트워크 자원 낭비 방지.

- 관심사 분리(SoC) 원칙에 따른 디렉토리 구조 재설계(Hooks, API, Constants, Utils).

<br>

## 🚀 실행 방법

**1. 저장소를 클론**

```bash
  git clone https://github.com/codeit-sprint-fullstack/13-sprint-mission-fe.git
```

**2. 패키지 설치**

```bash
  npm install
```

**3. 로컬 서버 실행**

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
src
├── api            # API 통신 함수 (products.js 등)
├── components     # 재사용 가능한 UI 컴포넌트
│   ├── common     # 공통 컴포넌트 (Button, Pagination, Input 등)
│   ├── landing    # 랜딩 페이지 전용 컴포넌트
│   ├── layout     # Header, Footer 등 레이아웃 구성 요소
│   └── product    # 상품 목록 및 필터링 관련 컴포넌트
├── constants      # 앱 내 상숫값 관리 (PAGE_SIZE_CONFIG 등)
├── hooks          # 커스텀 훅 (useInputValidation, usePageSize 등)
├── layouts        # 페이지 전체 레이아웃 (MainLayout 등)
├── pages          # 라우트별 페이지 컴포넌트 (Items, Registration 등)
├── styles         # 글로벌 스타일 및 CSS 변수 (reset, variables)
├── utils          # 유틸리티 함수 (getPaginationInfo 등)
├── App.jsx        # 앱 메인 엔트리 및 라우팅 설정
└── main.jsx       # 리액트 돔 렌더링 시작점
```

<br>

## 🎯 주요 기능

**1. 자동 검색 및 실시간 필터링**

- ProductFilterBar에 엔터 입력 없이도 타이핑 시 데이터를 자동으로 호출하는 최적화된 검색 환경 구현.

- URLSearchParams를 연동하여 검색 조건(키워드, 정렬, 페이지)이 새로고침 후에도 유지되도록 설계.

**2. 반응형 및 지능형 페이지네이션**

- PAGE_SIZE_CONFIG 상수를 통한 기기별 노출 개수 관리 및 usePageSize 훅을 이용한 동적 뷰포트 대응.

- 204 No Content 대응 및 예외 처리를 포함한 견고한 데이터 페칭 로직.

**3. 멀티미디어 및 태그 관리 시스템**

- InputTag 컴포넌트를 통한 동적 태그 생성/삭제 기능 및 입력값의 실시간 유효성 피드백 제공.

**4. 접근성 및 표준 준수**

- 시맨틱 마크업 설계 및 스크린 리더 대응(aria-label 등)을 통해 웹 표준 및 접근성 가이드라인 준수.

---

본 프로젝트는 [코드잇](https://www.codeit.kr)의 소유이며, 교육 목적으로만 사용됩니다. © 2026 Codeit. All rights reserved.
