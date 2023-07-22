import { Pressable } from 'native-base'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

/**
 * @file CheckBox component for the STA Volunteer App
 */

type CheckboxProps = {
  onChange: (value: string[]) => void
  checked: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
  return (
    <Pressable
      onPress={() => onChange([])}
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
      {checked && <Ionicons name="checkmark" size={20} color="red" />}
    </Pressable>
  )
}

export default Checkbox
