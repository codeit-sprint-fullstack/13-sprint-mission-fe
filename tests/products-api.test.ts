import assert from "node:assert/strict";
import test, { afterEach, beforeEach } from "node:test";

import * as products from "../src/lib/products.ts";

const BASE_URL = "https://panda-market-api-crud.vercel.app";

interface CapturedRequest {
  url: string;
  init?: RequestInit;
}

const originalFetch = globalThis.fetch;
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
let requests: CapturedRequest[] = [];

function headers(request: CapturedRequest): Headers {
  return new Headers(request.init?.headers);
}

beforeEach(() => {
  requests = [];
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => (key === "accessToken" ? "token" : null),
      },
    },
  });
  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), init });

    if (init?.method === "DELETE") {
      return new Response(null, { status: 204 });
    }

    return new Response(
      JSON.stringify({
        id: 4,
        name: "상품",
        description: "설명",
        price: 1000,
        createdAt: "2026-08-11T00:00:00.000Z",
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalWindow) {
    Object.defineProperty(globalThis, "window", originalWindow);
  } else {
    delete (globalThis as { window?: unknown }).window;
  }
});

test("상품 상세 요청은 저장된 액세스 토큰을 전송한다", async () => {
  await products.getProduct(4);

  assert.equal(requests[0].url, `${BASE_URL}/products/4`);
  assert.equal(headers(requests[0]).get("Authorization"), "Bearer token");
});

test("상품 상호작용 요청은 올바른 메서드와 경로를 사용한다", async () => {
  await products.likeProduct(4);
  assert.equal(requests[0].init?.method, "POST");
  assert.equal(requests[0].url, `${BASE_URL}/products/4/like`);
  assert.equal(headers(requests[0]).get("Authorization"), "Bearer token");

  await products.unlikeProduct(4);
  assert.equal(requests[1].init?.method, "DELETE");
  assert.equal(headers(requests[1]).get("Authorization"), "Bearer token");

  await products.deleteProduct(4);
  assert.equal(requests[2].init?.method, "DELETE");
  assert.equal(requests[2].url, `${BASE_URL}/products/4`);
  assert.equal(headers(requests[2]).get("Authorization"), "Bearer token");
});

test("상품 댓글 목록은 공개 커서 요청으로 조회한다", async () => {
  await products.getProductComments(4, { cursor: 8, limit: 5 });

  const lastRequest = requests.at(-1);
  assert.equal(
    lastRequest?.url,
    `${BASE_URL}/products/4/comments?limit=5&cursor=8`,
  );
  assert.equal(headers(lastRequest!).get("Authorization"), null);
});

test("상품 댓글 생성과 수정은 인증된 JSON 요청을 사용한다", async () => {
  await products.createProductComment(4, { content: "구매하고 싶어요" });
  let lastRequest = requests.at(-1)!;
  assert.equal(lastRequest.init?.method, "POST");
  assert.equal(lastRequest.url, `${BASE_URL}/products/4/comments`);
  assert.deepEqual(JSON.parse(String(lastRequest.init?.body)), {
    content: "구매하고 싶어요",
  });
  assert.equal(headers(lastRequest).get("Authorization"), "Bearer token");

  await products.updateProductComment(4, 9, { content: "내용 수정" });
  lastRequest = requests.at(-1)!;
  assert.equal(lastRequest.init?.method, "PATCH");
  assert.equal(lastRequest.url, `${BASE_URL}/products/4/comments/9`);
  assert.deepEqual(JSON.parse(String(lastRequest.init?.body)), {
    content: "내용 수정",
  });
  assert.equal(headers(lastRequest).get("Authorization"), "Bearer token");
});

test("상품 댓글 삭제는 인증된 DELETE 요청을 사용한다", async () => {
  await products.deleteProductComment(4, 9);

  const lastRequest = requests.at(-1)!;
  assert.equal(lastRequest.init?.method, "DELETE");
  assert.equal(lastRequest.url, `${BASE_URL}/products/4/comments/9`);
  assert.equal(headers(lastRequest).get("Authorization"), "Bearer token");
});
