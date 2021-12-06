// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // Правила ESLint and typescript
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // Правило точки с запятой
    semi: "off",
    "@typescript-eslint/semi": ["warn"],
    // Пустой интерфейс => error
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        // если extend то ок
        allowSingleExtends: true,
      },
    ],
  },
};
