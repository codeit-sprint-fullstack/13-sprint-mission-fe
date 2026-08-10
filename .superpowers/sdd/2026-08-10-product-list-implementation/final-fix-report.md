# Final Fix Wave Report

Date: 2026-08-10
Branch: `feature/product-list-improvements`
Base commit: `913ac1c`

## Status

**DONE — final review의 승인된 fix wave를 최소 범위로 반영했다.**

## Addressed findings

1. 모바일 검색 controls
   - 검색 form을 모바일에서 세로 배치하고 `sm` 이상에서 기존 가로 배치로 복원했다.
   - 검색 input wrapper에 `min-w-0`를 추가해 320–375px 화면에서 flex item이 컨테이너보다 넓어질 수 있는 조건을 제거했다.

2. 베스트 상품 이미지 preload
   - `ArticleImage` → `ProductCard` → `ItemsPageContent`의 prop을 deprecated `priority`에서 Next.js 16의 `preload`로 일관되게 변경했다.
   - 베스트 상품의 첫 카드(`index === 0`)만 preload한다. 나머지 베스트 카드와 전체 상품 카드는 preload하지 않는다.

3. 상태 로직 회귀 테스트
   - `PRODUCT_PAGE_SIZE === 10` assertion을 추가했다.
   - `getVisiblePages(1, 0) === []` assertion을 추가했다.
   - 두 조건은 테스트 추가 전 구현이 이미 만족하고 있어 최초 baseline 실행은 통과했다. assertion의 검출력을 확인하기 위해 일시적으로 페이지 크기를 `11`, 빈 페이지 결과를 `[1]`로 mutation한 실행에서는 새 테스트들이 기대대로 실패했고, mutation을 즉시 원복한 뒤 GREEN을 확인했다.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Mutation check | PASS | `PRODUCT_PAGE_SIZE: 10 → 11`, empty pages: `[] → [1]`의 일시적 mutation에서 관련 assertions가 실패했다. mutation은 최종 diff에 남지 않는다. |
| `npm test` | PASS | Exit 0; 8 tests passed, 0 failed. 기존 `MODULE_TYPELESS_PACKAGE_JSON` 경고 1건은 비치명적이다. |
| `npm run lint` | PASS | Exit 0; ESLint 오류 없음. |
| `npx tsc --noEmit` | PASS | Exit 0; 출력 없음. |
| `npm run build` | PASS | Exit 0; Next.js 16.2.9 production build, TypeScript, 9개 static page generation 완료. |
| `git diff --check` | PASS | 최종 실행에서 출력 없음. |

## Self-review

- 승인된 네 finding과 최종 diff를 대조했다.
- `priority`가 `ArticleImage`/`ProductCard` 경로에 남아 있지 않고 `preload`가 첫 베스트 카드에만 전달되는 것을 확인했다.
- 모바일 외 breakpoint의 검색 controls 배치와 기존 검색/정렬 동작은 변경하지 않았다.
- 새 데이터 처리, API 호출, 상태 전이는 추가하지 않았다.
- Critical/Important/Minor 추가 finding 없음.

## Deferred / follow-up

- 비동기 UI 컴포넌트 테스트 런타임은 도입하지 않았다. 현재 `npm test`는 Node 내장 test runner로 상태 모듈만 실행하며, 저장소에는 DOM/React UI test runtime(jsdom, Testing Library 등)이 없다. 이번 minor fix에 새 라이브러리와 테스트 기반을 추가하면 승인 범위를 넘어가므로 타입 검사, lint, production build 및 diff 자체 리뷰로 UI 변경을 검증했다.
- recommendation 재시도 버튼은 승인된 범위 밖이므로 구현하지 않았다. 별도 UX 요구사항과 비동기 UI 테스트 기반을 정한 뒤 후속 작업으로 다룬다.
- 기존 Node의 `MODULE_TYPELESS_PACKAGE_JSON` 경고는 이번 변경과 무관하며 기능 실패는 아니다.
