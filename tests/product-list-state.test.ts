import assert from "node:assert/strict";
import test from "node:test";

import {
  createItemsUrl,
  getTotalPages,
  getVisiblePages,
  parseProductListState,
} from "../src/app/items/product-list-state.ts";

test("상품 목록 쿼리를 파싱한다", () => {
  const params = new URLSearchParams(
    "keyword=%EC%9E%90%EC%A0%84%EA%B1%B0&orderBy=favorite&page=3",
  );

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

test("기본값을 생략해 상품 목록 URL을 만든다", () => {
  assert.equal(
    createItemsUrl({ keyword: " 자전거 ", orderBy: "favorite", page: 2 }),
    "/items?keyword=%EC%9E%90%EC%A0%84%EA%B1%B0&orderBy=favorite&page=2",
  );
  assert.equal(createItemsUrl({ keyword: "", orderBy: "recent", page: 1 }), "/items");
});

test("상품 수에서 전체 페이지 수를 계산한다", () => {
  assert.equal(getTotalPages(21), 3);
  assert.equal(getTotalPages(0), 0);
});

test("현재 페이지 주변의 페이지 번호 창을 계산한다", () => {
  assert.deepEqual(getVisiblePages(1, 10), [1, 2, 3, 4, 5]);
  assert.deepEqual(getVisiblePages(6, 10), [4, 5, 6, 7, 8]);
  assert.deepEqual(getVisiblePages(10, 10), [6, 7, 8, 9, 10]);
});
