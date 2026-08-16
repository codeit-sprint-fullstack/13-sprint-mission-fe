# 판다마켓 프론트엔드

이 프로젝트는 Vite와 React로 구성된 프로젝트입니다.

## 폴더 구조

- `src/api`: Axios 요청 함수
- `src/components/UI`: 여러 페이지에서 사용하는 공통 UI
- `src/components/Layout`: 헤더와 푸터를 포함한 공통 레이아웃
- `src/components/Product`: 상품 등록·수정에서 함께 사용하는 컴포넌트
- `src/contexts`: 로그인 사용자 상태
- `src/hooks`: 폼 검증과 반응형 페이지 크기 등 커스텀 훅
- `src/pages`: 경로별 페이지와 해당 페이지에서만 사용하는 컴포넌트
- `src/styles`: 전역 스타일, 공통 스타일, 반응형 기준

## `.env` 파일 설정

백엔드 리퀘스트를 보낼 BASE URL을 설정해 주세요.
```
VITE_API_BASE_URL=http://localhost:3001
```

## 설치
필요한 패키지를 설치해 주세요.

```
npm install
```

## 실행

개발 모드로 실행하려면 아래 명령어를 사용합니다.

```
npm run dev
```

## TypeScript 검사와 빌드

모든 컴포넌트, 훅, API 응답 모델은 TypeScript로 작성되어 있습니다.

```shell
npm run typecheck
npm run build
```

- `npm run typecheck`: JavaScript 파일을 만들지 않고 타입만 검사합니다.
- `npm run build`: 타입 검사를 통과한 뒤 Vite 배포 파일을 생성합니다.
