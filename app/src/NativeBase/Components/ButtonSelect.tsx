import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import React, { FC } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export interface ButtonSelectOption {
  isSelected: boolean
  onPress: () => void
  text: string
}

interface ButtonSelectProps {
  marginBottom?: string
  marginTop?: string
  options: ButtonSelectOption[]
}

const ButtonSelect: FC<ButtonSelectProps> = ({
  marginBottom,
  marginTop,
  options,
}) => (
  <HStack
    backgroundColor="secondaryGrey.100"
    borderRadius="8"
    justifyContent="space-between"
    marginBottom={marginBottom ?? '4'}
    marginTop={marginTop ?? '0'}
    padding="1"
  >
    {options.map((option, index) => (
      <HStack
        alignItems="center"
        // borderColor="primary.100"
        // borderWidth="1"
        flexGrow="1"
        key={option.text}
      >
        <Pressable
          // borderColor="blue.100"
          // borderWidth="1"
          flexGrow="1"
          onPress={option.onPress}
          // width="33%"
        >
          <Box
            alignItems="center"
            backgroundColor={option.isSelected ? 'white' : 'transparent'}
            // borderColor="secondary.100"
            // borderWidth={1}
            borderRadius={7}
            color="black"
            height="7"
            shadow={option.isSelected ? '1' : 'none'}
            width="100%"
          >
            <Text
              borderColor="border.100"
              borderWidth="0"
              fontSize="lg"
              lineHeight="sm"
              padding="1"
              textAlign="center"
              width="100%"
            >
              {option.text}
            </Text>
          </Box>
        </Pressable>
        {index !== options.length - 1 && // don't show divider to right of this option if it's the last option
          !options[index + 1].isSelected && // don't show divider to right of this option if the next option is selected (doesn't look good next to white selected button)
          !option.isSelected && (
            <Divider height="4" marginY="1" orientation="vertical" />
          )}
      </HStack>
    ))}
  </HStack>
)

export default ButtonSelect
