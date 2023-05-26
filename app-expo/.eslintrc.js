/**
 * @file Core ESLint config, for use pre-commit
 */

module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['jest', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': 'off',
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
}
