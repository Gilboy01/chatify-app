import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly"
      }
    },
    rules: {
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-console": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 4]

    }
  }
];
