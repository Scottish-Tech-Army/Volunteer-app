import React, { FC } from 'react'
import styled from 'styled-components/native'

interface ErrorMessageProps {
  errorType?: 'missing'
}

const ErrorMessageText = styled.Text`
  color: red;
  font-size: 14px;
  margin-bottom: 12px;
`

const ErrorMessage: FC<ErrorMessageProps> = ({ errorType }) => {
  let text = '';
  switch (errorType) {
    case 'invalid':
      text = "Please check - this doesn't look right";
      break;
    case 'missing':
    default:
      text = 'Please complete this'
      break;
  }

  return (
    <ErrorMessageText>{text}</ErrorMessageText>
  )
}

export default ErrorMessage
