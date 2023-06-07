/**
 * @file Useful functions for working with text.
 */

import React from 'react'
import * as Linking from 'expo-linking'
import { Text } from 'native-base'

/**
 * Capitalise the first letter of a string - the rest of the string remains the same.
 * e.g. 'something' becomes 'Something'
 *
 * @param {string} text The string you want to change
 * @returns {string} Updated string
 */
export const capitaliseFirstLetter = (text: string): string =>
  text.replace(/(^\w|\s\w)/g, m => m.toUpperCase())

/**
 * Make URLs clickable in a string of text - the rest of the string remains the same.
 * @param {string} text The string you want to change
 * @returns {JSX.Element} Updated string
 */

export const makeUrlsClickable = (text: string): JSX.Element => {
  const findUrlsRegex = /(https?:\/\/[^\s]+)/g
  const url = text.match(findUrlsRegex)
  const allTextParts = text.split(findUrlsRegex).map((textPart, index) => {
    if (url) {
      return (
        <Text
          key={index}
          onPress={() => Linking.openURL(textPart)}
          color="blue"
        >
          {textPart}
        </Text>
      )
    }
    return <Text key={index}>{textPart}</Text>
  })
  return <Text>{allTextParts}</Text>
}
