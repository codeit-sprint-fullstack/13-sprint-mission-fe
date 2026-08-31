# 스프린트 미션 11 — 판다마켓 프론트엔드 (Vercel 배포)

## 배포 주소

| 구분 | 주소 |
|---|---|
| 프론트엔드 (Vercel) | `https://13-sprint-mission-fe-gilt.vercel.app` |
| 연결된 백엔드 API | `http://54.180.25.232` (AWS EC2) |

## 요구사항 체크리스트

- [x] AWS Amplify 혹은 Vercel을 활용해 배포 — Vercel
- [x] AWS에 배포된 백엔드 주소에 맞게 API 주소 변경
  - 코드는 환경 변수 기반이라 값 교체만으로 전환됩니다
  - HTTPS ↔ HTTP 혼합 문제를 프록시로 해결 (아래 참고)

---

## API 주소 관리 방식

API 주소는 코드에 하드코딩하지 않고 **환경 변수 하나로** 관리합니다.

```ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
```

이 변수를 사용하는 곳: `src/api/authApi.ts` · `userApi.ts` · `productApi.ts` · `articleApi.ts`

| 환경 | `NEXT_PUBLIC_API_URL` | `BACKEND_ORIGIN` |
|---|---|---|
| 로컬 개발 | `http://localhost:3000` | (설정 안 함) |
| Vercel 배포 | `/api` | `http://54.180.25.232` |

> `NEXT_PUBLIC_` 접두사가 붙은 변수는 **브라우저 번들에 포함**되어 누구나 볼 수 있습니다.
> API 경로처럼 공개되어도 되는 값만 넣어야 하며, 시크릿 키는 절대 이 접두사를 쓰면 안 됩니다.
> `BACKEND_ORIGIN`은 접두사가 없어 **서버에서만** 쓰입니다.

---

## Mixed Content 문제와 해결

### 문제

Vercel은 항상 **HTTPS**로 서비스되는데, EC2 백엔드는 **HTTP**입니다.
브라우저에서 직접 호출하면 보안 정책상 요청 자체가 차단됩니다.

```
Mixed Content: The page at 'https://....vercel.app' was loaded over HTTPS,
but requested an insecure resource 'http://54.180.25.232/products'.
This request has been blocked.
```

배포는 성공한 것처럼 보이지만 로그인·상품 조회가 전부 실패합니다.

### 해결 — Next.js rewrites 프록시

브라우저는 **같은 출처(`/api`)로만** 요청하고, **Vercel 서버가 대신** 백엔드를 호출하도록 넘깁니다.
서버 간 통신이라 프로토콜 제약을 받지 않습니다.

```
브라우저 ──HTTPS──> Vercel ──HTTP──> EC2
```

```js
// next.config.mjs
async rewrites() {
  const backendOrigin = process.env.BACKEND_ORIGIN;
  if (!backendOrigin) return [];        // 로컬에서는 프록시 없이 직접 호출
  return [
    { source: "/api/:path*", destination: `${backendOrigin}/:path*` },
  ];
}
```

### 이 방식의 장단점

| | 내용 |
|---|---|
| 장점 | 도메인·SSL 인증서 없이 HTTPS 사이트에서 HTTP 백엔드를 사용할 수 있음 |
| 장점 | 백엔드 주소가 브라우저에 노출되지 않음 |
| 한계 | 모든 API 요청이 Vercel 서버를 한 번 더 거쳐 지연이 조금 늘어남 |
| 정석 | Route 53 도메인 + ACM/Let's Encrypt 인증서로 백엔드 자체를 HTTPS화 (심화 요구사항) |

---

## Vercel 배포 절차

1. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub 저장소 import
2. **Root Directory**: 프론트엔드 폴더 지정
3. **Environment Variables** 에 두 개 등록:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `/api` |
   | `BACKEND_ORIGIN` | `http://54.180.25.232` |

4. **Deploy**
5. 배포된 도메인을 백엔드 `.env.production` 의 `CORS_ORIGIN` 에 추가하고 재시작

   ```bash
   pm2 restart panda-be
   ```

> 환경 변수를 나중에 바꾸면 **재배포(Redeploy)** 해야 반영됩니다.

---

## 배포 증빙

| # | 항목 | 캡쳐 |
|---|---|---|
| 1 | Vercel 배포 성공 화면 | _(이미지)_ |
| 2 | Vercel 환경 변수 설정 (`NEXT_PUBLIC_API_URL`, `BACKEND_ORIGIN`) | _(이미지)_ |
| 3 | 배포 사이트 로그인 성공 | _(이미지)_ |
| 4 | 배포 사이트에서 상품 등록 (S3 이미지 포함) | _(이미지)_ |
| 5 | 배포 사이트 상품 목록 조회 | _(이미지)_ |
| 6 | 개발자도구 Network 탭 — `/api/...` 요청이 200으로 응답 | _(이미지)_ |


---

<details>
<summary>원본 저장소 README (코드잇 제공)</summary>

# 🐼 판다마켓 프로젝트

> _이 저장소는 판다마켓 프로젝트의 프론트엔드 코드를 관리하는 곳입니다. 프로젝트를 클론하여 개발 환경을 설정하고, 각 브랜치에서 해당 스프린트 미션을 수행해 주세요!_ 🛠️

## 소개

안녕하세요! 판다마켓 프로젝트에 오신 것을 환영합니다! 🥳  
판다마켓은 따뜻한 중고거래를 위한 커뮤니티 플랫폼이에요. 여러분은 이곳에서 상품을 등록하고, 다른 사용자들과 소통하며, 자유롭게 이야기를 나눌 수 있어요. 매주 스프린트 미션을 통해 기능을 하나씩 만들어 가며 성장해 나가는 여정을 함께해요. 🚀

![PandaMarket](https://github.com/user-attachments/assets/3784b99f-73c9-4349-a9a9-92b2a7563574)  
_위 이미지는 판다마켓의 대표 이미지입니다._ 📸

## 스프린트 미션이란? 🤔

스프린트 미션은 **하나의 개인 프로젝트를 길게 진행하면서, 그 과정에서 주기적으로 피드백을 받을 수 있는 시스템**이에요. 각 스프린트마다 배운 이론을 적용해 보고, **멘토님께 코드 리뷰를 받아가며 실력을 쑥쑥 키워갈 수 있는 중요한 개인 과제**랍니다. 💪

## 주요 기능 ✨

1. **상품 등록**: 내가 가진 물건을 올리고, 사진과 설명을 추가해 직접 판매할 수 있어요!
2. **문의 댓글**: 상품에 대한 궁금한 점이나 의견을 자유롭게 남길 수 있답니다. 📝
3. **자유게시판**: 다양한 주제로 친구들과 이야기를 나누고, 정보를 공유할 수 있는 공간이에요! 🗣️

## 프로젝트 브랜치 구조 🏗️

프로젝트는 단계별로 나뉘어 있고, 각 스프린트 미션에 맞는 브랜치가 있어요. 각 브랜치를 통해 체계적으로 개발하며 학습할 수 있어요. 🎯

### 브랜치 설명

1. **basic (part1): 스프린트 미션 1 ~ 3 FE 요구사항**
   - 기본적인 웹 애플리케이션 기능 구현을 위한 초기 브랜치입니다. HTML, CSS, JavaScript 등을 사용해 기본을 다집니다.
   - **스프린트 미션 1부터 4까지**의 프론트엔드 내용을 포함하고 있어요.

2. **react (part2): 스프린트 미션 5 ~ 6 FE 요구사항**
   - React 라이브러리를 사용해 프론트엔드 기능을 구현하는 브랜치입니다. 컴포넌트 기반 아키텍처와 상태 관리를 배웁니다.
   - **스프린트 미션 5부터 6까지, 그 이후**의 프론트엔드 내용을 포함하고 있어요.
   - 만약 스프린트 미션 9부터 프론트엔드 코드를 Next가 아닌 React로 구현하고 싶다면 react 브랜치를 사용해요.

3. **next (part3,4): 스프린트 미션 7 FE 요구사항~**
   - Next.js를 사용해 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG) 등 고급 기능을 구현합니다.
   - **스프린트 미션 7부터** 시작하는 프론트엔드 내용을 포함하고 있어요.
   - 만약 스프린트 미션 8부터 프론트엔드 코드를 React가 아닌 Next로 구현하고 싶다면 next 브랜치를 사용해요.

> _스프린트 미션 내 백엔드 요구사항은 [백엔드 레포지토리](https://github.com/codeit-sprint-fullstack/11-sprint-mission-be)의 브랜치에서 관리해주세요_

---

본 프로젝트는 [코드잇](https://www.codeit.kr)의 소유이며, 교육 목적으로만 사용됩니다. © 2026 Codeit. All rights reserved.
...

</details>
