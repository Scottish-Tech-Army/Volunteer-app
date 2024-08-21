/**
 * @file Text input for searching.
 */

import { Box, Icon, IconButton, Input } from 'native-base'
import React, { FC, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SearchIconHighlighted from './SearchIconHighlighted'

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

  const clearText = () => setText('')

  return (
    <Box alignItems="center">
      <Input
        accessibilityLabel="Search for text"
        height="12"
        InputLeftElement={<SearchIconHighlighted />}
        InputRightElement={
          text ? (
            <IconButton
              icon={
                <Icon
                  as={MaterialIcons}
                  name="close"
                  size={5}
                  color="gray.500"
                />
              }
              onPress={clearText}
              variant="link"
              _pressed={{ bg: 'gray.200' }}
            />
          ) : undefined
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
        borderWidth={0}
        backgroundColor={text ? 'gray.200' : 'gray.100'}
        borderRadius={15}
        placeholderTextColor="gray.400"
        color="gray.800"
        _focus={{
          borderColor: 'transparent', // Ensure no border color on focus
        }}
      />
    </Box>
  )
}

export default FreeSearchBar
