/**
 * @file Core ESLint config, for use pre-commit
 */

export const env = {
  'jest/globals': true,
};
export const root = true;
export const extends = [
  '@react-native-community',
  'prettier',
  'plugin:@typescript-eslint/recommended',
];
export const plugins = ['jest', 'prettier'];
export const rules = {
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
};
export const settings = {
  'import/resolver': {
    'babel-module': {},
  },
};
