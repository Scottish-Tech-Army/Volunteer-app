import { Box, Icon, Input } from 'native-base'
import React, { FC, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export interface FreeSearchBarProps {
  handleChangeText?: (updatedText: string) => void
  handleSubmit: (submitText: string) => void
  marginBottom?: string
  marginTop?: string
}

const FreeSearchBar: FC<FreeSearchBarProps> = ({
  handleChangeText,
  handleSubmit,
  marginBottom,
  marginTop,
}) => {
  const [text, setText] = useState('')

  const onChangeText = (updatedText: string) => {
    setText(updatedText)

    if (handleChangeText) handleChangeText(updatedText)
  }

  const onSubmitEditing = () => handleSubmit(text)

  return (
    <Box alignItems="center">
      <Input
        height="12"
        InputLeftElement={
          <Icon
            as={MaterialIcons}
            color="accentPurple.100"
            ml="2"
            name="search"
            size={6}
          />
        }
        lineHeight="lg"
        marginBottom={marginBottom ?? '4'}
        marginTop={marginTop ?? '0'}
        onChangeText={updatedText => onChangeText(updatedText)}
        onSubmitEditing={onSubmitEditing}
        paddingLeft="2"
        paddingTop="2"
        placeholder="Search..."
        textAlignVertical="center"
        value={text}
      />
    </Box>
  )
}

export default FreeSearchBar
