import React, { FC } from 'react'
import { Input, Box } from 'native-base'
import ErrorMessage from './ErrorMessage'

interface TextInputControlProps {
  error: boolean
  errorType?: 'invalid' | 'missing'
  label: string
  onBlur?: () => void
  onChange: (value: string) => void
  type: 'email' | 'firstName' | 'lastName'
  value: string
}

const TextInputControl: FC<TextInputControlProps> = ({
  error,
  errorType,
  label,
  onBlur,
  onChange,
  type,
  value,
}) => {
  let autoCapitalize = 'none' as
    | 'none'
    | 'sentences'
    | 'words'
    | 'characters'
    | undefined
  let autoComplete = 'off' as
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'gender'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'username'
    | 'username-new'
    | 'off'
    | undefined
  let textContentType = 'none' as
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined
  const textInputStyle = { fontSize: 16 }

  switch (type) {
    case 'email':
      autoComplete = 'email'
      textContentType = 'emailAddress'
      break
    case 'firstName':
      autoCapitalize = 'words'
      autoComplete = 'name-given'
      textContentType = 'givenName'
      break
    case 'lastName':
      autoCapitalize = 'words'
      autoComplete = 'name-family'
      textContentType = 'familyName'
      break
  }

  return (
    <Box>
      <Input
        borderColor="#604696"
        marginX="10px"
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholder={label}
        style={textInputStyle}
        textContentType={textContentType}
        value={value}
      />

      {error && <ErrorMessage errorType={errorType} />}
    </Box>
  )
}
export default TextInputControl
