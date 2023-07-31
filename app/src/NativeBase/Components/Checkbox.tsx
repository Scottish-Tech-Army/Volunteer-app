/**
 * @file CheckBox component for the STA Volunteer App
 */

import { Pressable } from 'native-base'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import StaTheme from '../Theme/StaTheme'
type CheckboxProps = {
  onChange: () => void
  checked: boolean
}

/**
 * Component that displays a checkbox that can be checked or unchecked.
 *
 * @param { CheckboxProps} props The component props
 * @param {value: string[] => void} props.onChange function called when the checkbox is pressed
 * @param {boolean} props.checked whether the checkbox is checked or not
 * @returns {React.ReactElement} Component
 */

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
  return (
    <Pressable
      onPress={onChange}
      flexDirection={'row'}
      alignItems={'center'}
      borderColor={'purple.100'}
      borderWidth={2}
      borderRadius={2}
      width={30}
      height={30}
      justifyContent={'center'}
      _dark={{
        borderColor: 'white',
      }}
    >
      {checked && (
        <Ionicons
          name="checkmark"
          size={20}
          color={StaTheme.colors.primary[100]}
        />
      )}
    </Pressable>
  )
}

export default Checkbox
