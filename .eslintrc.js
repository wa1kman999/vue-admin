module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // "plugin:vue/essential",
    // 使用 vue3的规则
    // https://eslint.vuejs.org/
    'plugin:vue/vue3-strongly-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
