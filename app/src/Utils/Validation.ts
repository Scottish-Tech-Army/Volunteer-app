/**
 * @file Validation utilities
 */

/**
 * Returns true if and only if email represents a syntactically valid email address.
 * @param {string} email Email address to validate
 * @returns
 */
export const validateEmail = (email: string): boolean =>
  Boolean(
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ),
  )
