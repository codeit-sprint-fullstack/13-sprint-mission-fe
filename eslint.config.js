import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      import: importPlugin,
    },

    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "import/order": [
        "warn", // 경고로 띄움 (에러는 아님)
        {
          groups: [
            "external", // 외부 라이브러리 (예: react, axios)
            "internal", // 프로젝트 내부 import (@/components 등)
            ["parent", "sibling", "index"], // 상대경로 import (../, ./)
          ],
          pathGroups: [
            {
              pattern: "@/**", // @로 시작하는 경로를 internal로 인식
              group: "internal",
            },
          ],
          "newlines-between": "always-and-inside-groups", // 그룹 간 줄바꿈
          alphabetize: {
            order: "asc", // 알파벳순 정렬
            caseInsensitive: true, // 대소문자 구분 X
          },
        },
      ],
    },
  },
]);
