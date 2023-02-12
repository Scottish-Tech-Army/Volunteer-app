import { Box, Icon, Input } from 'native-base'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const FreeSearchBar = ({
  handleChangeText,
  handleSubmit,
}: {
  handleChangeText: (updatedText: string) => void
  handleSubmit: () => void
}) => {
  const [text, setText] = useState('')

  const onChangeText = (updatedText: string) => {
    setText(updatedText)
    handleChangeText(updatedText)
  }

  return (
    <Box alignItems="center">
      <Input
        InputLeftElement={
          <Icon
            as={MaterialIcons}
            name="search"
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        // onBlur={() => console.log('Blur')}
        // onChangeText={updatedText => onChangeText(updatedText)}
        // onFocus={() => console.log('Focus')}
        // onSubmitEditing={handleSubmit}
        placeholder="Search..."
        value={text}
      />
    </Box>
  )
}

export default FreeSearchBar
