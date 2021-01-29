module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'prettier/react',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier/standard'
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
    'no-undef': 'off',
    'camelcase': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    'react/no-children-prop': 'off',
    "generator-star-spacing": ["error", {"before": false, "after": true}],
    'import/no-duplicates': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'space-before-function-paren': 'off',
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
          'module',
          '/^react-redux/',
          '/^redux/',
          '/^~/store/',
          '/^@hub/',
          '/^@chakra/',
          '/^~/services/',
          '/^~/utils/',
          '/^~/pages/',
          '/^~/components/',
          '/^~/assets/',
          '/^~/',
          ['parent', 'sibling', 'index']
        ],
        'alphabetize': { 'order': 'desc', 'ignoreCase': true }
      }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "extendDefaults": true,
          "Foo": "Don't use Foo because it is unsafe",
          "String": {
            "message": "Use string instead",
            "fixWith": "string"
          },

          "{}": {
            "message": "Use object instead",
            "fixWith": "object",
          },
          "object": false
        }
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
