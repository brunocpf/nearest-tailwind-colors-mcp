// @ts-check
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-ignore
import onlyWarn from "eslint-plugin-only-warn";
import tseslint from "typescript-eslint";

/**
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      // @ts-ignore
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**", "eslint.config.mjs", "lint-staged.config.mjs"],
  },
  ...tseslint.configs.recommended,
];

export default config;
