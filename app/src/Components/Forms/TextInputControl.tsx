import React, { FC } from 'react'
import { TextInput } from 'react-native'
import styled from 'styled-components/native'
import ErrorMessage from './ErrorMessage'

interface TextInputControlProps {
  error: Boolean
  errorType?: 'missing'
  label: String
  onBlur?: () => void
  onChange: (value: String) => void
  type: 'email' | 'firstName' | 'lastName';
  value: String
}

const TextInputControlView = styled.View`
  display: flex;
  flex-direction: column;
`

const TextInputControl: FC<TextInputControlProps> = ({ error, errorType, label, onBlur, onChange, type, value }) => {
  let autoCapitalize = 'none';
  let autoComplete = 'off';
  let textContentType = 'none';

  switch (type) {
    case 'email':
      autoComplete = "email"
      textContentType = "emailAddress"
      break;
    case 'firstName':
      autoCapitalize = 'words'
      autoComplete = "name-given"
      textContentType = "givenName"
      break;
    case 'lastName':
      autoCapitalize = 'words'
      autoComplete = "name-family"
      textContentType = "familyName"
      break;
  }

  return (
    <TextInputControlView>
      <TextInput
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholder={label}
        style={{fontSize:16}}
        textContentType={textContentType}
        value={value}
      />

      {error && (
        <ErrorMessage errorType={errorType} />
      )}
    </TextInputControlView>
  )
}

export default TextInputControl
