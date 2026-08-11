import assert from "node:assert/strict";
import test from "node:test";

import {
  isResourceOwner,
  removeComment,
  replaceComment,
} from "../src/app/items/product-detail-state.ts";

test("로그인 사용자가 리소스 작성자인지 판별한다", () => {
  assert.equal(isResourceOwner(7, 7), true);
  assert.equal(isResourceOwner(7, 8), false);
  assert.equal(isResourceOwner(undefined, 7), false);
  assert.equal(isResourceOwner(7, undefined), false);
});

test("수정된 댓글만 교체한다", () => {
  assert.deepEqual(
    replaceComment(
      [
        { id: 1, content: "A" },
        { id: 2, content: "B" },
      ],
      { id: 2, content: "수정" },
    ),
    [
      { id: 1, content: "A" },
      { id: 2, content: "수정" },
    ],
  );
});

test("삭제된 댓글을 목록에서 제거한다", () => {
  assert.deepEqual(
    removeComment(
      [
        { id: 1, content: "A" },
        { id: 2, content: "B" },
      ],
      1,
    ),
    [{ id: 2, content: "B" }],
  );
});
