/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    "jest/globals": true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    eqeqeq: "error",
    "no-console": 0,
    "react/prop-types": 0,
  },
};
