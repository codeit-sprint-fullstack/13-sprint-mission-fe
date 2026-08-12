# 스프린트 미션 10 제출 마무리 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 프론트엔드와 백엔드의 TypeScript 요구사항을 검증하고 두 GitHub PR을 멘토 리뷰가 가능한 상태로 만든다.

**Architecture:** 프론트엔드는 현재 Next.js TypeScript 구현과 기존 PR을 유지하면서 기준 브랜치를 동기화하고 PR 메타데이터를 갱신한다. 백엔드는 Express TypeScript 구현에 `nodemon + ts-node` 개발 실행 경로를 추가하며, 설정 계약 테스트로 요구사항을 고정한다.

**Tech Stack:** Next.js 16, React 19, TypeScript, Express 5, Node.js Test Runner, nodemon, ts-node, Git, GitHub CLI

## Global Constraints

- 현재 프론트엔드 head 브랜치 `feature/sprint-mission-next-pr`와 PR #2를 유지한다.
- 현재 백엔드 head 브랜치 `part1-seungjae`를 유지한다.
- `any` 타입을 새로 도입하지 않는다.
- `.omc/`와 확인용 `modern-js-practice/`를 제품 커밋에 포함하지 않는다.
- 테스트 또는 빌드가 실패하면 PR을 Ready for review로 전환하지 않는다.
- 사용자 포크에만 push하고 코드잇 조직 원본에는 직접 push하지 않는다.

---

### Task 1: 프론트엔드 작업 트리와 기준 브랜치 정리

**Files:**
- Move outside worktree: `modern-js-practice/`
- Commit: `docs/superpowers/plans/2026-08-11-mission-10-submission.md`

**Interfaces:**
- Consumes: `origin/basic`, `origin/feature/sprint-mission-next-pr`
- Produces: 불필요한 중첩 저장소가 없고 `basic` 최신 커밋을 포함한 프론트엔드 head

- [ ] **Step 1: 확인용 저장소를 임시 경로로 이동**

Run:

```bash
mv modern-js-practice /private/tmp/modern-js-practice
```

Expected: `git status --short`에 `modern-js-practice/`가 나타나지 않는다.

- [ ] **Step 2: 실행 계획 문서 커밋**

```bash
git add docs/superpowers/plans/2026-08-11-mission-10-submission.md
git commit -m "docs: 미션 10 제출 실행 계획 추가"
```

- [ ] **Step 3: 원격 갱신 및 기준 브랜치 병합**

```bash
git fetch origin
git merge --no-edit origin/basic
```

Expected: 충돌 없이 merge되거나 `Already up to date.`가 출력된다.

- [ ] **Step 4: 브랜치 관계 확인**

```bash
git status -sb
git rev-list --left-right --count origin/basic...HEAD
```

Expected: 작업 트리가 깨끗하고 `origin/basic` 기준 behind 값이 `0`이다.

### Task 2: 백엔드 개발 도구 계약 테스트

**Files:**
- Create: `backend/tests/dev-tooling.test.ts`

**Interfaces:**
- Consumes: `backend/package.json`
- Produces: `dev` 명령이 nodemon과 ts-node를 실제로 조합하고 두 패키지가 devDependencies에 존재함을 검증하는 테스트

- [ ] **Step 1: 실패하는 설정 계약 테스트 작성**

```typescript
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJsonUrl = new URL('../package.json', import.meta.url);

test('개발 서버는 nodemon과 ts-node로 TypeScript 변경을 감시한다', async () => {
  const packageJson = JSON.parse(await readFile(packageJsonUrl, 'utf8')) as {
    scripts?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  assert.match(packageJson.scripts?.dev ?? '', /nodemon/);
  assert.match(packageJson.scripts?.dev ?? '', /ts-node/);
  assert.ok(packageJson.devDependencies?.nodemon);
  assert.ok(packageJson.devDependencies?.['ts-node']);
});
```

- [ ] **Step 2: 테스트가 올바른 이유로 실패하는지 확인**

Run:

```bash
npx tsx --test tests/dev-tooling.test.ts
```

Expected: `dev` 명령에 `nodemon` 또는 `ts-node`가 없다는 assertion failure.

### Task 3: 백엔드 nodemon + ts-node 개발환경 구현

**Files:**
- Modify: `backend/package.json`
- Modify: `backend/package-lock.json`
- Modify: `backend/.gitignore`

**Interfaces:**
- Consumes: Node ESM, `app.ts`, `tsconfig.json`의 `module: nodenext`
- Produces: `npm run dev`가 `.ts` 변경을 감시하고 ts-node ESM loader로 서버를 실행하는 개발환경

- [ ] **Step 1: ts-node 설치**

Run:

```bash
npm install --save-dev ts-node
```

Expected: `package.json`과 `package-lock.json`에 `ts-node`가 추가된다.

- [ ] **Step 2: dev 명령과 로컬 도구 제외 설정 수정**

`package.json`의 `scripts.dev`를 다음 값으로 변경한다.

```json
"dev": "nodemon --watch . --ext ts --exec \"node --loader ts-node/esm\" app.ts"
```

`.gitignore` 끝에 다음 내용을 추가한다.

```gitignore
.omc/
```

- [ ] **Step 3: 설정 계약 테스트 통과 확인**

Run:

```bash
npx tsx --test tests/dev-tooling.test.ts
```

Expected: 1 test passed, 0 failed.

- [ ] **Step 4: 개발 서버 실행 경로 스모크 테스트**

Run:

```bash
npm run dev
```

Expected: nodemon이 `ts` 확장자를 감시하고 ts-node ESM loader로 `app.ts`를 시작한다. 서버 시작 로그를 확인한 뒤 `Ctrl-C`로 종료한다.

- [ ] **Step 5: 백엔드 전체 검증**

```bash
npm test
npm run build
```

Expected: 4 tests passed, 0 failed; `tsc` exit 0.

- [ ] **Step 6: 백엔드 변경 커밋**

```bash
git add .gitignore package.json package-lock.json tests/dev-tooling.test.ts
git commit -m "chore: ts-node와 nodemon 개발환경 구성"
```

### Task 4: 두 저장소 push 및 최종 검증

**Files:**
- Verify only: frontend and `backend/`

**Interfaces:**
- Consumes: Task 1과 Task 3의 커밋
- Produces: 사용자 포크의 원격 head와 일치하는 두 로컬 브랜치

- [ ] **Step 1: 프론트엔드 전체 검증**

```bash
npm test
npm run lint
npm run build
```

Expected: 17 tests passed, ESLint exit 0, Next.js production build exit 0.

- [ ] **Step 2: TypeScript 요구사항 정적 검사**

```bash
rg -n --glob '*.ts' --glob '*.tsx' '\bany\b' src tests backend/app.ts backend/controllers backend/lib backend/routes backend/src backend/types backend/utils
rg -n --glob '*.ts' --glob '*.tsx' 'interface|type .*=' src backend/types backend/controllers backend/utils
```

Expected: 제품 코드에서 명시적 `any` 없음; 인터페이스, 타입 별칭, Union, Intersection, Generics, 유틸리티 타입의 기존 사용 확인.

- [ ] **Step 3: 프론트엔드 push**

```bash
git push -u origin feature/sprint-mission-next-pr
```

- [ ] **Step 4: 백엔드 push**

```bash
git -C backend push -u seungjae part1-seungjae
```

- [ ] **Step 5: 로컬과 원격 일치 확인**

```bash
git status -sb
git -C backend status -sb
```

Expected: 두 브랜치 모두 ahead/behind 없음, 작업 트리 깨끗함.

### Task 5: GitHub PR 제출 상태 정리

**Files:**
- Create temporary: `/private/tmp/mission-10-fe-pr.md`
- Create temporary: `/private/tmp/mission-10-be-pr.md`

**Interfaces:**
- Consumes: push된 프론트 `feature/sprint-mission-next-pr`, 백엔드 `part1-seungjae`
- Produces: `basic ← feature/sprint-mission-next-pr`, `node ← part1-seungjae`의 Ready for review PR

- [ ] **Step 1: 프론트 PR 본문 준비**

`/private/tmp/mission-10-fe-pr.md`에 다음 내용을 저장한다.

```markdown
## 변경 사항

- 기존 Next.js 프로젝트를 TypeScript로 마이그레이션했습니다.
- 도메인 모델, API 요청, 컴포넌트 props와 상태에 타입을 적용했습니다.
- Union, Generics, 인터페이스, 타입 별칭과 유틸리티 타입을 사용했습니다.
- 상품·게시글·인증 기능과 TypeScript 상태/API 테스트를 정리했습니다.

## 검증

- `npm test` — 17개 통과
- `npm run lint` — 통과
- `npm run build` — 통과
```

- [ ] **Step 2: 프론트 PR 갱신 및 Ready 전환**

```bash
gh pr edit 2 --repo seungjael508-oss/13-sprint-mission-fe --title "스프린트 미션 10: Next.js TypeScript 마이그레이션" --body-file /private/tmp/mission-10-fe-pr.md
gh pr ready 2 --repo seungjael508-oss/13-sprint-mission-fe
```

- [ ] **Step 3: 백엔드 PR 본문 준비**

`/private/tmp/mission-10-be-pr.md`에 다음 내용을 저장한다.

```markdown
## 변경 사항

- 기존 Express 프로젝트를 TypeScript로 마이그레이션했습니다.
- `tsconfig.json`에 NodeNext, strict, rootDir, outDir을 설정했습니다.
- API 요청·응답, 인증, Prisma 도메인 데이터에 타입을 적용했습니다.
- nodemon과 ts-node를 조합해 TypeScript 개발 서버 자동 재시작 환경을 구성했습니다.

## 검증

- `npm test` — 4개 통과
- `npm run build` — 통과
- `npm run dev` — nodemon + ts-node 실행 확인
```

- [ ] **Step 4: 백엔드 Draft PR 생성 후 Ready 전환**

```bash
gh pr create --repo seungjael508-oss/13-sprint-mission-be --base node --head part1-seungjae --draft --title "스프린트 미션 10: Express TypeScript 마이그레이션" --body-file /private/tmp/mission-10-be-pr.md
gh pr ready part1-seungjae --repo seungjael508-oss/13-sprint-mission-be
```

- [ ] **Step 5: 두 PR 최종 상태 확인**

```bash
gh pr view 2 --repo seungjael508-oss/13-sprint-mission-fe --json title,isDraft,state,url,headRefName,baseRefName
gh pr list --repo seungjael508-oss/13-sprint-mission-be --head part1-seungjae --state open --json number,title,isDraft,state,url,headRefName,baseRefName
```

Expected: 두 PR 모두 `isDraft: false`, `state: OPEN`, 올바른 head/base와 미션 10 제목.
