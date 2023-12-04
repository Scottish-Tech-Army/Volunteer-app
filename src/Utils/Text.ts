/**
 * @file Useful functions for working with text.
 */

/**
 * Capitalise the first letter of a string - the rest of the string remains the same.
 * e.g. 'something' becomes 'Something'
 *
 * @param {string} text The string you want to change
 * @returns {string} Updated string
 */
export const capitaliseFirstLetter = (text: string): string =>
  text.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
