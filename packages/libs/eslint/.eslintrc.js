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
    'prettier/prettier': 'warn',
    'no-undef': 'off',
    'camelcase': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-use-before-define': 'off',
    'react/no-children-prop': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'generator-star-spacing': ['warn', {'before': false, 'after': true}],
    'import/no-duplicates': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'space-before-function-paren': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'import/extensions': 'off',
    "no-unused-vars": "off",
    "padded-blocks":"warn",
    "react/jsx-no-undef": "warn",
    "@typescript-eslint/no-duplicate-imports": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "_",
      "varsIgnorePattern": "_",
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
          '/^@psdhub/',
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
    '@typescript-eslint/ban-types': [
      'error',
      {
        'types': {
          'extendDefaults': true,
          'Foo': "Don't use Foo because it is unsafe",
          'String': {
            'message': 'Use string instead',
            'fixWith': 'string'
          },
          '{}': {
            'message': 'Use object instead',
            'fixWith': 'object',
          },
          'object': false
        }
      }
    ],
    "@typescript-eslint/no-unused-vars": ["error",
    {
      "args": "after-used",
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_"
    }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      'babel-plugin-root-import': {}
    },
  }
}
