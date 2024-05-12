// module.exports = {
//     env: {
//         browser: true,
//         es2021: true,
//     },
//     extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/recommended',
//         'prettier',
//     ],
//     overrides: [
//         {
//             env: {
//                 node: true,
//             },
//             files: ['.eslintrc.{js,cjs}'],
//             parserOptions: {
//                 sourceType: 'script',
//             },
//         },
//     ],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         ecmaVersion: 'latest',
//     },
//     plugins: ['@typescript-eslint'],
//     rules: {
//         'prettier/prettier': [true, { singleQuote: true, tabWidth: 4 }],
//         '@typescript-eslint/no-explicit-any': 'off',
//     },
//     ignorePatterns: ['dist', 'node_modules'],
// }

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  ignorePatterns: ['dist', 'node_modules'],
}
