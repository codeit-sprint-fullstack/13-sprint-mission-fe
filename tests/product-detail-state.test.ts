import assert from "node:assert/strict";
import test from "node:test";

import {
  canSubmitComment,
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

test("수정 응답에서 생략된 댓글 필드를 보존하고 입력을 변경하지 않는다", () => {
  const comments = [
    { id: 1, content: "A", writer: { id: 7, nickname: "판다" } },
    { id: 2, content: "B", createdAt: "2026-08-11T00:00:00.000Z" },
  ];
  const updated = { id: 2, content: "수정" };

  const result = replaceComment(comments, updated);

  assert.deepEqual(result, [
    { id: 1, content: "A", writer: { id: 7, nickname: "판다" } },
    {
      id: 2,
      content: "수정",
      createdAt: "2026-08-11T00:00:00.000Z",
    },
  ]);
  assert.notStrictEqual(result, comments);
  assert.strictEqual(result[0], comments[0]);
  assert.notStrictEqual(result[1], comments[1]);
  assert.deepEqual(comments, [
    { id: 1, content: "A", writer: { id: 7, nickname: "판다" } },
    { id: 2, content: "B", createdAt: "2026-08-11T00:00:00.000Z" },
  ]);
  assert.deepEqual(updated, { id: 2, content: "수정" });
});

test("초기 댓글 조회가 끝날 때까지 댓글 등록을 허용하지 않는다", () => {
  assert.equal(canSubmitComment("새 댓글", true, false), false);
  assert.equal(canSubmitComment("새 댓글", false, false), true);
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
