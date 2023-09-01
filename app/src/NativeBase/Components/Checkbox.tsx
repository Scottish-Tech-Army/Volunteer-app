/**
 * @file CheckBox component for the STA Volunteer App
 */

import { Pressable, Icon } from 'native-base'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StaTheme from '../Theme/StaTheme'

type CheckboxProps = {
  onChange: () => void
  checked: boolean
}

/**
 * Component that displays a checkbox that can be checked or unchecked.
 *
 * @param { CheckboxProps} props The component props
 * @param {() => void} props.onChange function to call when the checkbox is changed
 * @param {boolean} props.checked whether the checkbox is checked or not
 * @returns {React.ReactElement} Component
 */

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
  return (
    <Pressable
      onPress={onChange}
      flexDirection="row"
      alignItems="center"
      borderColor="purple.100"
      borderWidth="2"
      borderRadius="2"
      width="30"
      height="30"
      justifyContent="center"
      _dark={{
        borderColor: 'white',
      }}
    >
      {checked && (
        <Icon
          as={MaterialIcons}
          aria-label="checked"
          aria-checked={checked}
          name="check"
          size={5}
          color={StaTheme.colors.primary[100]}
        />
      )}
    </Pressable>
  )
}

export default Checkbox
