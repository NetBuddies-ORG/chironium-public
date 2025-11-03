// ESLint flat config for Next.js + React + TypeScript
// Lightweight setup without type-aware linting (fast, zero-config)
import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      "dist",
      "build",
      "coverage",
      "*.min.*",
      "**/generated/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        // Not using project service for speed (no type-aware rules)
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      // Helps eslint-plugin-import resolve TS paths
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
    },
    rules: {
      ...js.configs.recommended.rules,

      // TypeScript (turned on minimally)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",

      // React
      "react/jsx-uses-react": "off", // Not needed for React 17+
      "react/react-in-jsx-scope": "off", // Next/React 17+

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // A11y
      ...jsxA11y.configs.recommended.rules,

      // Imports
      "import/order": [
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
            ["type"],
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
];
