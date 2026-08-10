# Product List Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 프론트 린트 범위를 정상화하고 상품 목록에 URL 기반 검색, 좋아요순 베스트 상품, 번호 페이지네이션, 독립적인 로딩·오류·빈 상태를 추가한다.

**Architecture:** URL 쿼리를 목록 상태의 기준으로 삼고 파싱·직렬화·페이지 계산을 순수 TypeScript 함수로 분리한다. `page.tsx`는 `Suspense` 경계를 제공하고 클라이언트 컴포넌트가 URL 상태와 두 개의 독립적인 API 요청을 관리한다. 카드 렌더링은 재사용 컴포넌트로 분리한다.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS 4, Node.js 24 내장 test runner

## Global Constraints

- 베스트 상품은 좋아요순 4개이며 검색, 정렬, 페이지와 독립적이다.
- 전체 상품은 페이지당 10개다.
- 검색은 버튼 또는 Enter 제출로만 실행한다.
- 검색 또는 정렬 변경 시 1페이지로 초기화한다.
- 페이지네이션은 이전, 최대 5개 번호, 다음으로 구성한다.
- 모바일 베스트 상품은 2열, 태블릿 이상은 4열이다.
- `backend/`는 별도 저장소이므로 루트 ESLint 검사에서 제외하며 내부 파일은 수정하지 않는다.
- 상품 상세, 인증, 게시판은 변경하지 않는다.

---

### Task 1: URL 상태와 페이지 계산 유틸리티

**Files:**
- Create: `src/app/items/product-list-state.ts`
- Create: `tests/product-list-state.test.ts`
- Modify: `package.json`
- Modify: `tsconfig.json`

**Interfaces:**
- Produces: `ProductListState { keyword: string; orderBy: ProductOrderBy; page: number }`
- Produces: `parseProductListState(searchParams: Pick<URLSearchParams, "get">): ProductListState`
- Produces: `createItemsUrl(state: ProductListState): string`
- Produces: `getTotalPages(totalCount: number, pageSize?: number): number`
- Produces: `getVisiblePages(currentPage: number, totalPages: number, maxVisible?: number): number[]`

- [ ] **Step 1: 테스트 명령을 추가하고 테스트 파일을 TypeScript 빌드 범위에서 제외한다**

`package.json` scripts에 다음을 추가한다.

```json
"test": "node --test tests/product-list-state.test.ts"
```

`tsconfig.json`의 `exclude`를 다음처럼 설정한다.

```json
"exclude": ["node_modules", "tests"]
```

- [ ] **Step 2: URL 상태 파싱의 실패 테스트를 작성한다**

`tests/product-list-state.test.ts`에 Node 내장 `node:test`, `node:assert/strict`를 사용해 다음을 검증한다.

```ts
test("상품 목록 쿼리를 파싱한다", () => {
  const params = new URLSearchParams("keyword=%EC%9E%90%EC%A0%84%EA%B1%B0&orderBy=favorite&page=3");
  assert.deepEqual(parseProductListState(params), {
    keyword: "자전거",
    orderBy: "favorite",
    page: 3,
  });
});

test("잘못된 정렬과 페이지를 기본값으로 보정한다", () => {
  const params = new URLSearchParams("keyword=%20%20&orderBy=unknown&page=-2");
  assert.deepEqual(parseProductListState(params), {
    keyword: "",
    orderBy: "recent",
    page: 1,
  });
});
```

- [ ] **Step 3: 테스트를 실행해 모듈 부재로 실패하는지 확인한다**

Run: `npm test`

Expected: FAIL because `src/app/items/product-list-state.ts` does not exist.

- [ ] **Step 4: 최소 URL 상태 파싱 구현을 작성한다**

`src/app/items/product-list-state.ts`에 `ProductOrderBy` 타입을 가져오고 공백 제거, 정렬 화이트리스트, 양의 정수 페이지 보정을 구현한다.

```ts
export const PRODUCT_PAGE_SIZE = 10;

export interface ProductListState {
  keyword: string;
  orderBy: ProductOrderBy;
  page: number;
}

export function parseProductListState(
  searchParams: Pick<URLSearchParams, "get">,
): ProductListState {
  const keyword = (searchParams.get("keyword") ?? "").trim();
  const orderBy = searchParams.get("orderBy") === "favorite" ? "favorite" : "recent";
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  return { keyword, orderBy, page };
}
```

- [ ] **Step 5: 파싱 테스트가 통과하는지 확인한다**

Run: `npm test`

Expected: 2 tests PASS.

- [ ] **Step 6: URL 직렬화와 페이지 계산의 실패 테스트를 추가한다**

다음을 검증한다.

```ts
assert.equal(
  createItemsUrl({ keyword: " 자전거 ", orderBy: "favorite", page: 2 }),
  "/items?keyword=%EC%9E%90%EC%A0%84%EA%B1%B0&orderBy=favorite&page=2",
);
assert.equal(createItemsUrl({ keyword: "", orderBy: "recent", page: 1 }), "/items");
assert.equal(getTotalPages(21), 3);
assert.equal(getTotalPages(0), 0);
assert.deepEqual(getVisiblePages(1, 10), [1, 2, 3, 4, 5]);
assert.deepEqual(getVisiblePages(6, 10), [4, 5, 6, 7, 8]);
assert.deepEqual(getVisiblePages(10, 10), [6, 7, 8, 9, 10]);
```

- [ ] **Step 7: 새 테스트가 함수 부재로 실패하는지 확인한다**

Run: `npm test`

Expected: FAIL because serialization and pagination exports are missing.

- [ ] **Step 8: 최소 직렬화와 페이지 계산 구현을 작성한다**

기본값은 쿼리에서 생략하고, 페이지 번호 창은 현재 페이지를 가운데 두되 처음과 끝에서 범위를 보정한다.

- [ ] **Step 9: 테스트와 타입 검사를 실행한다**

Run: `npm test && npx tsc --noEmit`

Expected: all tests PASS and TypeScript exits 0.

- [ ] **Step 10: 커밋한다**

```bash
git add package.json tsconfig.json src/app/items/product-list-state.ts tests/product-list-state.test.ts
git commit -m "test: 상품 목록 상태 계산 검증 추가"
```

---

### Task 2: 프론트 린트 범위 정상화

**Files:**
- Modify: `eslint.config.mjs`

**Interfaces:**
- Consumes: 루트 `npm run lint` 스크립트
- Produces: 중첩 `backend/` 저장소를 제외한 프론트 전용 린트 범위

- [ ] **Step 1: 현재 린트 실패를 재현한다**

Run: `npm run lint`

Expected: FAIL with errors under `backend/frontend/src/pages/`.

- [ ] **Step 2: ESLint 전역 제외 경로를 추가한다**

`globalIgnores` 배열에 다음 항목을 추가한다.

```js
"backend/**",
```

- [ ] **Step 3: 루트 린트가 통과하는지 확인한다**

Run: `npm run lint`

Expected: exits 0 without inspecting `backend/`.

- [ ] **Step 4: 커밋한다**

```bash
git add eslint.config.mjs
git commit -m "chore: 백엔드를 프론트 린트에서 제외"
```

---

### Task 3: 재사용 가능한 상품 카드

**Files:**
- Create: `src/app/items/ProductCard.tsx`
- Modify: `src/app/components/ArticleImage.tsx`

**Interfaces:**
- Consumes: `Product`, `getProductImageUrl(product)`
- Produces: `ProductCard({ product, priority?, sizes? })`
- Produces: `ArticleImageProps.sizes?: string` and `ArticleImageProps.priority?: boolean`

- [ ] **Step 1: ArticleImage가 반응형 이미지 힌트를 받을 수 있게 확장한다**

`ArticleImageProps`에 `sizes?: string`, `priority?: boolean`을 추가하고 두 값을 `Image`에 전달한다.

- [ ] **Step 2: 상품 카드 컴포넌트를 작성한다**

카드는 `/items/{id}`로 연결하고 이미지, 한 줄 상품명, 한국어 가격, 좋아요 수를 표시한다. `sizes`를 `ArticleImage`에 전달하고 베스트 첫 카드만 선택적으로 `priority`를 사용할 수 있게 한다.

- [ ] **Step 3: 프론트 린트와 타입 검사를 실행한다**

Run: `npm run lint && npx tsc --noEmit`

Expected: exits 0.

- [ ] **Step 4: 커밋한다**

```bash
git add src/app/components/ArticleImage.tsx src/app/items/ProductCard.tsx
git commit -m "refactor: 상품 목록 카드 컴포넌트 분리"
```

---

### Task 4: URL 기반 상품 목록 화면

**Files:**
- Create: `src/app/items/ItemsPageContent.tsx`
- Modify: `src/app/items/page.tsx`

**Interfaces:**
- Consumes: `parseProductListState`, `createItemsUrl`, `getTotalPages`, `getVisiblePages`, `PRODUCT_PAGE_SIZE`
- Consumes: `getProducts`, `ProductCard`
- Produces: `/items`의 검색, 정렬, 베스트 상품, 페이지네이션 UI

- [ ] **Step 1: 페이지를 Suspense 래퍼로 변경한다**

`page.tsx`는 서버 컴포넌트로 유지하고 다음 형태로 클라이언트 콘텐츠를 감싼다.

```tsx
export default function ItemsPage() {
  return (
    <Suspense fallback={<ItemsPageFallback />}>
      <ItemsPageContent />
    </Suspense>
  );
}
```

fallback에는 헤더, 목록 로딩 문구, 푸터를 표시한다.

- [ ] **Step 2: URL 상태와 검색 폼을 구현한다**

`ItemsPageContent`에서 `useSearchParams`, `useRouter`로 상태를 읽는다. 검색 입력은 로컬 상태로 두고 제출 시 `createItemsUrl({ keyword: searchInput, orderBy, page: 1 })`로 이동한다. 정렬 변경도 페이지를 1로 초기화한다.

- [ ] **Step 3: 베스트 상품을 독립적으로 조회한다**

마운트 시 좋아요순 4개를 요청한다. `bestProducts`, `isBestLoading`, `bestError` 상태를 별도로 두며 정렬과 검색 변경으로 다시 요청하지 않는다. 영역은 `grid-cols-2 md:grid-cols-4`를 사용한다.

- [ ] **Step 4: 전체 상품을 URL 조건으로 조회한다**

`page`, `keyword`, `orderBy` 변경 시 10개를 요청한다. effect 내부 `cancelled` 플래그로 오래된 응답을 무시하고 `products`, `totalCount`, `isLoading`, `error`를 갱신한다.

- [ ] **Step 5: 빈 상태와 페이지네이션을 렌더링한다**

검색 결과가 없으면 `“{keyword}”에 대한 상품이 없습니다.`를, 일반 빈 목록이면 `아직 등록된 상품이 없습니다.`를 표시한다. 전체 페이지가 2 이상일 때 이전·번호·다음 버튼을 렌더링하고 현재 번호에 `aria-current="page"`를 설정한다.

- [ ] **Step 6: 린트, 테스트, 타입 검사를 실행한다**

Run: `npm test && npm run lint && npx tsc --noEmit`

Expected: all commands exit 0.

- [ ] **Step 7: 커밋한다**

```bash
git add src/app/items/page.tsx src/app/items/ItemsPageContent.tsx
git commit -m "feat: 상품 검색과 페이지네이션 추가"
```

---

### Task 5: 전체 검증

**Files:**
- Verify only

**Interfaces:**
- Consumes: Tasks 1-4의 완성된 프론트엔드
- Produces: 제출 가능한 검증 결과

- [ ] **Step 1: 변경 파일의 whitespace 오류를 확인한다**

Run: `git diff --check`

Expected: no output.

- [ ] **Step 2: 전체 자동 검증을 실행한다**

Run: `npm test && npm run lint && npm run build`

Expected: tests PASS, ESLint exits 0, Next.js production build succeeds.

- [ ] **Step 3: 작업 트리와 커밋을 확인한다**

Run: `git status --short --branch && git log -6 --oneline`

Expected: planned source changes are committed and the working tree is clean.
