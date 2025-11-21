/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parserOptions: {
    parser: "@typescript-eslint/parser", // 交给 TS 解析
    ecmaVersion: 2021,
    sourceType: "module",
  },

  extends: [
    "eslint:recommended", // ESLint 默认推荐规则
    "plugin:vue/vue3-recommended", // Vue 3 推荐规则
    "plugin:@typescript-eslint/recommended", // TS 推荐规则
    "vue/typescript/recommended",
  ],

  rules: {
    "vue/multi-word-component-names": "off", // 允许单词组件名
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleling-html-element-content-newline": "off",
    "@typescript-eslint/no-unused-vars": "off", // TS ESLint 规则关闭
    "no-unused-vars": "off",
  },

  globals: {
    defineProps: "readonly",
    defineOptions: "readonly",
  },
};
