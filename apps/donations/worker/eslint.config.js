// @ts-check
import eslint from "@eslint/js";
import prettiereslint from "eslint-config-prettier";
import { flatConfigs as importXPluginConfigs } from "eslint-plugin-import-x";
import globals from "globals";
import tseslint, { configs as tseslintConfigs } from "typescript-eslint";

export default tseslint.config(
  {
    name: "eslint/recommended",
    ...eslint.configs.recommended,
  },
  ...tseslintConfigs.recommended,
  {
    name: "typescript-eslint/tsconfig",
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  importXPluginConfigs.recommended,
  importXPluginConfigs.typescript,
  {
    name: "import-x/custom",
    settings: {
      "import-x/resolver": {
        typescript: {
          project: import.meta.dirname,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import-x/ignore": ["^cloudflare:"],
    },
  },
  {
    name: "import-x/cloudflare-override",
    rules: {
      "import-x/no-unresolved": [
        "error",
        {
          ignore: ["^cloudflare:"],
        },
      ],
    },
  },
  {
    name: "prettier/config",
    ...prettiereslint,
  },
  {
    name: "custom/ignores",
    ignores: ["dist/", ".wrangler/*", "worker-configuration.d.ts"],
  },
  {
    name: "custom/rules",
    rules: {
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error"
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: ["**/__tests__/*"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-declaration-merging": "warn",
      "@typescript-eslint/no-unsafe-enum-comparison": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-type-assertion": "warn",
      "@typescript-eslint/no-unsafe-unary-minus": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
);
