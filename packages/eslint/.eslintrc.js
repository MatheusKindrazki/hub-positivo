module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'prettier/react',
    'prettier/standard',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react','react-hooks', '@typescript-eslint', 'prettier', 'eslint-plugin-import-helpers'],
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    'import/no-duplicates': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/extensions': 'off',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "_"
    }],
    'import-helpers/order-imports': [
      'warn',
      {
        'newlinesBetween': 'always',
        'groups': [
          '/^react$/',
          '/^react-redux/',
          '/^redux/',
          '/^@hub/',
          '/^@chackra/',
          'module',
          '/^~/components/',
          '/^~/assets/',
          '/^~/',
          ['parent', 'sibling', 'index']
        ],
        'alphabetize': { 'order': 'asc', 'ignoreCase': true }
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {},
      'babel-plugin-root-import': {}
    },
  }
}
