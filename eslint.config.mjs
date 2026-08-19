import nextVitals from "eslint-config-next/core-web-vitals";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    extends: [eslintPluginTailwindcss.configs.recommended],
    settings: {
      tailwindcss: {
        cssConfigPath: "./src/app/globals.css",
      },
    },
    rules: {
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
    },
  },
]);

export default eslintConfig;
