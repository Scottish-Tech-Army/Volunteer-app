/**
 * @file ErrorMessage.
 */

import React, { FC } from 'react'
import { Text } from 'native-base'

interface ErrorMessageProps {
  errorType?: 'invalid' | 'missing'
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorType }) => {
  let text = ''

  switch (errorType) {
    case 'invalid':
      text = "Please check - this doesn't look right"
      break
    case 'missing':
    default:
      text = 'Please complete this'
      break
  }

  return (
    <Text color="error.100" paddingLeft="0" fontSize="sm" fontWeight="600">
      X {text}
    </Text>
  )
}

export default ErrorMessage
