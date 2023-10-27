/**
 * @file Extended ESLint checks to require a minimum level of JSDoc comment coverage
 */

module.exports = {
  extends: ['.eslintrc.js', 'plugin:jsdoc/recommended'],
  ignorePatterns: ['**/*.test.ts'],
  rules: {
    'jsdoc/check-alignment': ['off'], // leave this to prettier to handle
    'jsdoc/newline-after-description': ['off'],
    'jsdoc/require-file-overview': 'warn',
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
  },
}
