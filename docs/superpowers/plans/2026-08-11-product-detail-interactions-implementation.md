# Product Detail Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 상품 상세에서 인증된 좋아요·삭제와 상품 댓글 CRUD를 제공하고 작성자에게만 관리 UI를 노출한다.

**Architecture:** 중첩 백엔드 저장소는 상품과 댓글 응답에 소유자 정보를 추가하고, 프론트 API 계층은 기존 `requestApi` 패턴으로 인증 요청을 캡슐화한다. 상세 화면은 로그인 사용자, 상품, 좋아요, 댓글을 독립 상태로 관리하며 순수 권한·댓글 상태 함수로 핵심 판별과 갱신을 테스트한다.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6/7, Node.js test runner, Express 5, Prisma 7

## Global Constraints

- `backend/`는 별도 Git 저장소이며 루트 저장소와 별도로 테스트하고 커밋한다.
- 기존 `.gitignore` 변경과 `backend/.omc/` 미추적 파일은 건드리지 않는다.
- 인증 토큰 저장 키는 기존 `accessToken`을 그대로 사용한다.
- 비로그인 사용자의 인증 필요 동작은 `/login`으로 이동한다.
- 상품과 댓글의 수정·삭제 UI는 저장된 사용자 ID와 응답의 작성자 ID가 일치할 때만 노출한다.
- 백엔드의 401·403 검사를 최종 권한 경계로 유지한다.
- 게시판 목록, 공통 API 클라이언트 전면 리팩터링, 댓글 추가 페이지 로딩은 변경하지 않는다.

---

### Task 1: 백엔드 상품·댓글 소유자 응답 계약

**Files:**
- Create: `backend/utils/productResponses.ts`
- Create: `backend/tests/productResponses.test.ts`
- Modify: `backend/controllers/productController.ts`
- Modify: `backend/controllers/productCommentController.ts`
- Modify: `backend/package.json`

**Interfaces:**
- Consumes: Prisma 상품의 `userId`, 상품 댓글의 `user { id, nickname }`
- Produces: `serializeProductResponse(product)` returning `ownerId`
- Produces: `serializeProductCommentResponse(comment)` returning `writer`

- [ ] **Step 1: 백엔드 테스트 명령과 실패 테스트를 추가한다**

`backend/package.json`에 `"test": "tsx --test tests/*.test.ts"`를 추가하고 `backend/tests/productResponses.test.ts`에 다음 계약을 작성한다.

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  serializeProductCommentResponse,
  serializeProductResponse,
} from '../utils/productResponses.js';

test('상품의 내부 userId를 ownerId로 노출한다', () => {
  const result = serializeProductResponse({
    id: 1,
    name: '자전거',
    userId: 7,
  });

  assert.deepEqual(result, { id: 1, name: '자전거', ownerId: 7 });
  assert.equal('userId' in result, false);
});

test('상품 댓글의 user를 writer로 노출한다', () => {
  const result = serializeProductCommentResponse({
    id: 3,
    content: '구매 가능한가요?',
    userId: 7,
    user: { id: 7, nickname: '판다' },
  });

  assert.deepEqual(result, {
    id: 3,
    content: '구매 가능한가요?',
    writer: { id: 7, nickname: '판다' },
  });
  assert.equal('userId' in result, false);
  assert.equal('user' in result, false);
});
```

- [ ] **Step 2: 백엔드 테스트가 모듈 부재로 실패하는지 확인한다**

Run: `npm test` in `backend/`

Expected: FAIL because `utils/productResponses.ts` does not exist.

- [ ] **Step 3: 최소 응답 직렬화 함수를 구현한다**

`backend/utils/productResponses.ts`에 내부 키를 제거하고 공개 키를 추가하는 제네릭 함수를 작성한다.

```ts
type WithOwner = { userId?: number } & Record<string, unknown>;
type WithWriter = {
  userId?: number;
  user?: { id: number; nickname: string };
} & Record<string, unknown>;

export function serializeProductResponse<T extends WithOwner>(product: T) {
  const { userId, ...rest } = product;
  return userId === undefined ? rest : { ...rest, ownerId: userId };
}

export function serializeProductCommentResponse<T extends WithWriter>(comment: T) {
  const { userId: _userId, user, ...rest } = comment;
  return user ? { ...rest, writer: user } : rest;
}
```

- [ ] **Step 4: 직렬화 테스트가 통과하는지 확인한다**

Run: `npm test` in `backend/`

Expected: 2 tests PASS.

- [ ] **Step 5: 상품 컨트롤러에 `ownerId` 계약을 연결한다**

`productController.ts`의 기존 로컬 `serializeProduct`를 새 직렬화 함수로 교체한다. 상세 조회의 Prisma `select`에 `userId: true`를 추가하고 생성·수정·좋아요 응답에도 동일 함수를 사용해 내부 `userId`가 노출되지 않게 한다.

- [ ] **Step 6: 상품 댓글 컨트롤러에 `writer` 계약을 연결한다**

댓글 생성·목록·수정 쿼리에서 다음 관계를 선택하고 모든 댓글 응답을 `serializeProductCommentResponse`로 변환한다.

```ts
user: { select: { id: true, nickname: true } }
```

목록의 커서 계산은 직렬화 전 원본 댓글 ID로 유지한다.

- [ ] **Step 7: 백엔드 전체 검증을 실행한다**

Run: `npm test && npx tsc --noEmit && npm run build` in `backend/`

Expected: all commands exit 0.

- [ ] **Step 8: 백엔드 변경을 별도 커밋한다**

```bash
git -C backend add package.json controllers/productController.ts controllers/productCommentController.ts utils/productResponses.ts tests/productResponses.test.ts
git -C backend commit -m "feat: 상품 상세 소유자 응답 추가"
```

---

### Task 2: 프론트 상품 상호작용 API

**Files:**
- Create: `tests/products-api.test.ts`
- Modify: `package.json`
- Modify: `src/lib/products.ts`
- Modify: `src/types/index.ts`

**Interfaces:**
- Consumes: localStorage의 `accessToken`
- Produces: `getProduct`, `deleteProduct`, `likeProduct`, `unlikeProduct`
- Produces: `getProductComments`, `createProductComment`, `updateProductComment`, `deleteProductComment`

- [ ] **Step 1: 모든 프론트 테스트를 실행하도록 명령을 확장한다**

`package.json`에 `"type": "module"`을 추가하고 테스트 명령을 다음처럼 변경한다.

```json
"test": "node --test tests/*.test.ts"
```

- [ ] **Step 2: 인증된 상품 상세·삭제·좋아요 요청의 실패 테스트를 작성한다**

`tests/products-api.test.ts`에서 가짜 `window.localStorage`와 `globalThis.fetch`를 설치한 뒤 다음을 검증한다.

```ts
await getProduct(4);
assert.equal(requests[0].url, `${BASE_URL}/products/4`);
assert.equal(headers(requests[0]).get('Authorization'), 'Bearer token');

await likeProduct(4);
assert.equal(requests[1].init?.method, 'POST');
assert.equal(requests[1].url, `${BASE_URL}/products/4/like`);

await unlikeProduct(4);
assert.equal(requests[2].init?.method, 'DELETE');

await deleteProduct(4);
assert.equal(requests[3].init?.method, 'DELETE');
assert.equal(requests[3].url, `${BASE_URL}/products/4`);
```

가짜 fetch는 JSON 응답과 204 응답을 모두 지원하고 각 테스트 후 원래 전역 값을 복원한다.

- [ ] **Step 3: 새 API 테스트가 export 부재와 인증 헤더 누락으로 실패하는지 확인한다**

Run: `npm test`

Expected: FAIL because interaction functions are missing and `getProduct` omits auth headers.

- [ ] **Step 4: 상품 상세·삭제·좋아요 API를 최소 구현한다**

`getProduct`에 `{ headers: getAuthHeaders() }`를 전달하고 다음 함수를 추가한다.

```ts
export async function deleteProduct(id: number | string): Promise<void>
export async function likeProduct(id: number | string): Promise<Product>
export async function unlikeProduct(id: number | string): Promise<Product>
```

각 변경 요청은 `getAuthHeaders()`를 사용한다.

- [ ] **Step 5: 상품 요청 테스트가 통과하는지 확인한다**

Run: `npm test`

Expected: existing product list tests and new product request tests PASS.

- [ ] **Step 6: 댓글 CRUD 요청의 실패 테스트를 추가한다**

다음 동작을 각각 검증한다.

```ts
await getProductComments(4, { cursor: 8, limit: 5 });
assert.equal(lastRequest.url, `${BASE_URL}/products/4/comments?limit=5&cursor=8`);

await createProductComment(4, { content: '구매하고 싶어요' });
assert.equal(lastRequest.init?.method, 'POST');
assert.deepEqual(JSON.parse(String(lastRequest.init?.body)), { content: '구매하고 싶어요' });

await updateProductComment(4, 9, { content: '내용 수정' });
assert.equal(lastRequest.init?.method, 'PATCH');
assert.equal(lastRequest.url, `${BASE_URL}/products/4/comments/9`);

await deleteProductComment(4, 9);
assert.equal(lastRequest.init?.method, 'DELETE');
```

- [ ] **Step 7: 댓글 테스트가 export 부재로 실패하는지 확인한다**

Run: `npm test`

Expected: FAIL because product comment functions do not exist.

- [ ] **Step 8: 댓글 CRUD API와 타입을 최소 구현한다**

`products.ts`가 `Comment`, `CursorListResponse`를 가져오고 설계 문서의 네 댓글 함수를 구현한다. 생성·수정은 `jsonBody`, 삭제는 인증 헤더, 목록은 공개 GET을 사용한다. `Product`에는 다음 필드를 추가한다.

```ts
ownerId?: number;
isLiked?: boolean;
```

- [ ] **Step 9: 프론트 API 테스트와 타입 검사를 실행한다**

Run: `npm test && npx tsc --noEmit`

Expected: all commands exit 0 without module warnings.

- [ ] **Step 10: 프론트 API 변경을 커밋한다**

```bash
git add package.json src/lib/products.ts src/types/index.ts tests/products-api.test.ts
git commit -m "feat: 상품 상세 상호작용 API 추가"
```

---

### Task 3: 상품 상세 권한과 상태 계산

**Files:**
- Create: `src/app/items/product-detail-state.ts`
- Create: `tests/product-detail-state.test.ts`

**Interfaces:**
- Produces: `isResourceOwner(currentUserId, ownerId): boolean`
- Produces: `replaceComment(comments, updated): Comment[]`
- Produces: `removeComment(comments, commentId): Comment[]`

- [ ] **Step 1: 권한과 댓글 상태의 실패 테스트를 작성한다**

```ts
test('로그인 사용자가 리소스 작성자인지 판별한다', () => {
  assert.equal(isResourceOwner(7, 7), true);
  assert.equal(isResourceOwner(7, 8), false);
  assert.equal(isResourceOwner(undefined, 7), false);
  assert.equal(isResourceOwner(7, undefined), false);
});

test('수정된 댓글만 교체한다', () => {
  assert.deepEqual(
    replaceComment([{ id: 1, content: 'A' }, { id: 2, content: 'B' }], { id: 2, content: '수정' }),
    [{ id: 1, content: 'A' }, { id: 2, content: '수정' }],
  );
});

test('삭제된 댓글을 목록에서 제거한다', () => {
  assert.deepEqual(removeComment([{ id: 1, content: 'A' }, { id: 2, content: 'B' }], 1), [
    { id: 2, content: 'B' },
  ]);
});
```

- [ ] **Step 2: 상태 테스트가 모듈 부재로 실패하는지 확인한다**

Run: `npm test`

Expected: FAIL because `product-detail-state.ts` does not exist.

- [ ] **Step 3: 순수 상태 함수를 최소 구현한다**

`Comment` 타입을 type-only import하고 ID 비교, `map`, `filter`만 사용해 세 함수를 구현한다. `replaceComment`는 기존 댓글의 누락 필드를 보존하도록 `{ ...comment, ...updated }`로 합친다.

- [ ] **Step 4: 상태 테스트와 전체 프론트 검증을 실행한다**

Run: `npm test && npm run lint && npx tsc --noEmit`

Expected: all commands exit 0.

- [ ] **Step 5: 상태 함수 변경을 커밋한다**

```bash
git add src/app/items/product-detail-state.ts tests/product-detail-state.test.ts
git commit -m "test: 상품 상세 권한 상태 검증 추가"
```

---

### Task 4: 상품 상세 좋아요·삭제·댓글 UI

**Files:**
- Modify: `src/app/items/[id]/page.tsx`

**Interfaces:**
- Consumes: Task 2의 상품·댓글 API 함수
- Consumes: Task 3의 `isResourceOwner`, `replaceComment`, `removeComment`
- Produces: 인증·권한이 반영된 상품 상세 상호작용 화면

- [ ] **Step 1: 로그인 사용자와 독립 요청 상태를 추가한다**

`useSyncExternalStore(subscribeToAuthChange, getStoredUser, () => null)`로 사용자를 구독한다. 다음 상태를 추가한다.

```ts
const [comments, setComments] = useState<Comment[]>([]);
const [commentInput, setCommentInput] = useState('');
const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
const [editingContent, setEditingContent] = useState('');
const [isDeleting, setIsDeleting] = useState(false);
const [isLiking, setIsLiking] = useState(false);
const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
const [deleteError, setDeleteError] = useState('');
const [likeError, setLikeError] = useState('');
const [commentError, setCommentError] = useState('');
```

- [ ] **Step 2: 상품과 댓글을 독립적으로 조회한다**

기존 상품 effect는 유지하되 인증된 `getProduct` 결과를 사용한다. 별도 effect에서 `getProductComments(id)`를 호출해 목록을 설정하고 실패 시 댓글 영역 오류를 설정한다. 두 effect 모두 정리 플래그로 오래된 응답을 무시한다.

- [ ] **Step 3: 작성자 전용 수정·삭제 동작을 구현한다**

`isResourceOwner(user?.id, product.ownerId)`로 `canManageProduct`를 계산한다. 참일 때만 수정·삭제 버튼을 렌더링한다. 삭제는 확인 후 `deleteProduct(id)`를 호출하고 성공 시 `/items`로 이동하며 처리 중 중복 요청을 막는다.

- [ ] **Step 4: 좋아요 토글을 구현한다**

비로그인이면 `/login`으로 이동한다. 로그인 상태에서는 `product.isLiked`에 따라 `likeProduct` 또는 `unlikeProduct`를 호출하고 성공 응답을 기존 상품에 병합한다. 처리 중 버튼을 비활성화하고 실패 시 좋아요 오류를 표시한다.

- [ ] **Step 5: 댓글 등록을 구현한다**

댓글 폼 제출 시 로그인 여부, 공백 제거, 중복 제출을 확인한다. 성공하면 댓글을 배열 끝에 추가하고 입력을 비운다. 비로그인 textarea는 클릭 또는 포커스 시 `/login`으로 이동하며 안내 placeholder를 표시한다.

- [ ] **Step 6: 작성자 전용 댓글 수정·삭제를 구현한다**

`isResourceOwner(user?.id, comment.writer?.id)`가 참인 댓글에만 수정·삭제 버튼을 표시한다. 수정 성공은 `replaceComment`, 삭제 성공은 `removeComment`로 상태를 갱신한다. 빈 수정 내용과 중복 삭제 요청을 막는다.

- [ ] **Step 7: 접근성과 오류 피드백을 확인한다**

- 좋아요 버튼에 `aria-pressed`를 설정한다.
- 오류 문구에 `role="alert"`를 설정한다.
- 처리 중 버튼에 `disabled`를 설정한다.
- 댓글 textarea와 버튼에 명확한 label 또는 `aria-label`을 제공한다.
- 삭제 확인 문구는 `정말 삭제하시겠습니까?`를 사용한다.

- [ ] **Step 8: 프론트 정적 검증을 실행한다**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build`

Expected: all commands exit 0.

- [ ] **Step 9: 브라우저에서 핵심 흐름을 검증한다**

개발 서버와 로컬 백엔드를 사용해 다음을 확인한다.

1. 비로그인 좋아요와 댓글 작성 시 로그인 화면으로 이동한다.
2. 로그인 후 상품 좋아요가 토글되고 새로고침 후 유지된다.
3. 상품 작성자에게만 수정·삭제 버튼이 보인다.
4. 댓글 등록·수정·삭제가 새로고침 후에도 유지된다.
5. 다른 사용자의 댓글에는 수정·삭제 버튼이 보이지 않는다.

- [ ] **Step 10: 상품 상세 UI를 커밋한다**

```bash
git add src/app/items/[id]/page.tsx
git commit -m "feat: 상품 상세 좋아요와 댓글 연결"
```

---

### Task 5: 최종 교차 저장소 검증

**Files:**
- Verify only

**Interfaces:**
- Consumes: Task 1~4의 백엔드와 프론트 변경
- Produces: 제출 가능한 검증 결과와 깨끗한 변경 범위

- [ ] **Step 1: 프론트 전체 검증을 새로 실행한다**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build`

Expected: all commands exit 0.

- [ ] **Step 2: 백엔드 전체 검증을 새로 실행한다**

Run: `npm test && npx tsc --noEmit && npm run build` in `backend/`

Expected: all commands exit 0.

- [ ] **Step 3: 변경 범위와 커밋 상태를 확인한다**

Run: `git status --short --branch && git -C backend status --short --branch`

Expected: 루트의 기존 `.gitignore`와 백엔드의 기존 `.omc/`만 남고, 이번 미션 파일은 모두 커밋되어 있다.
