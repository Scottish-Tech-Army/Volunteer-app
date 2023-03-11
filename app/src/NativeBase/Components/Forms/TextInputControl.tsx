/**
 * @file Form input.
 */

import React, { FC } from 'react'
import { Input, FormControl, Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface TextInputControlProps {
  error: boolean
  required: boolean
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
  required,
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
    <FormControl marginBottom="6" isRequired={required} isInvalid={error}>
      <FormControl.Label>{label.toString()}</FormControl.Label>
      <Input
        accessibilityLabel={`${label} text`}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        onBlur={onBlur}
        size="sm"
        onChangeText={onChange}
        textContentType={textContentType}
        value={value}
      />

      <FormControl.ErrorMessage
        leftIcon={<Icon as={MaterialIcons} name={'close'} size="lg" />}
      >
        {text}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
export default TextInputControl
