/**
 * @file Extended ESLint checks to require a minimum level of JSDoc comment coverage
 */

export const extends = ['.eslintrc.js', 'plugin:jsdoc/recommended'];
export const rules = {
  'jsdoc/check-alignment': ['off'],
  'jsdoc/newline-after-description': ['off'],
  'jsdoc/require-file-overview': 'error',
  'jsdoc/require-jsdoc': [
    'warn',
    {
      publicOnly: true,
      require: {
        ArrowFunctionExpression: true,
        FunctionExpression: true,
      },
      minLineCount: 5,
    },
  ],
};
