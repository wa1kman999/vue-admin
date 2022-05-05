module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
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
  rules: {
    // 关闭组件的命名规则
    'vue/multi-word-component-names': 'off',
    // 关闭没有使用在定义之前
    'no-use-before-define': 'off'
  },
  // 禁用掉api文档里的驼峰监测
  overrides: [
    {
      files: ['src/api/**/*.ts'],
      rules: {
        camelcase: 'off'
      }
    }
  ]
}
