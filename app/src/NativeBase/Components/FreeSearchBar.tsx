/**
 * @file Text input for searching.
 */

import { Box, Icon, Input } from 'native-base'
import React, { FC, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export interface FreeSearchBarProps {
  handleChangeText?: (updatedText: string) => void
  handleSubmit: (submitText: string) => void
  marginBottom?: string
  marginTop?: string
}

/**
 * Component showing text input for searching.
 *
 * @param {FreeSearchBarProps} props The component props
 * @param {function} [props.handleChangeText] Function to fire when the user changes the text in the input
 * @param {function} props.handleSubmit Function to fire when the user submits the search (presses return/enter on their keyboard)
 * @param {string} [props.marginBottom] Bottom margin
 * @param {string} [props.marginTop] Top margin
 * @returns {React.ReactElement} Component
 */
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
        accessibilityLabel="Search for text"
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
        lineHeight="md"
        marginBottom={marginBottom ?? '4'}
        marginTop={marginTop ?? '0'}
        onChangeText={updatedText => onChangeText(updatedText)}
        onSubmitEditing={onSubmitEditing}
        paddingBottom="1"
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
