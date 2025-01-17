/**
 * @file Horizontal buttons for user to choose between 2-3 choices.
 */

import {
  Box,
  Divider,
  HStack,
  Pressable,
  Text,
} from '@gluestack-ui/themed-native-base'
import React, { FC } from 'react'

export interface SegmentedPickerOption {
  isSelected: boolean
  onPress: () => void
  text: string
}

interface SegmentedPickerProps {
  marginBottom?: string
  marginTop?: string
  options: SegmentedPickerOption[]
}

/**
 * Component showing horizontal buttons for user to choose between 2-3 choices.
 *
 * @param {SegmentedPickerProps} props The component props
 * @param {string} [props.marginBottom] Bottom margin
 * @param {string} [props.marginTop] Top margin
 * @param {SegmentedPickerOption[]} props.options The options to show
 * @returns {React.ReactElement} Component
 */
const SegmentedPicker: FC<SegmentedPickerProps> = ({
  marginBottom,
  marginTop,
  options,
}) => (
  <HStack
    _dark={{ backgroundColor: 'bgDarkMode.100' }}
    _light={{ backgroundColor: 'secondaryGrey.100' }}
    borderRadius="8"
    justifyContent="space-between"
    marginBottom={marginBottom ?? '4'}
    marginTop={marginTop ?? '0'}
    padding="1"
  >
    {options.map((option, index) => (
      <HStack alignItems="center" flexGrow="1" key={option.text}>
        <Pressable flexGrow="1" onPress={option.onPress}>
          <Box
            alignItems="center"
            _dark={{
              backgroundColor: option.isSelected
                ? 'darkGrey.50'
                : 'transparent',
            }}
            _light={{
              backgroundColor: option.isSelected ? 'white' : 'transparent',
            }}
            borderRadius={7}
            color="black"
            height="8"
            shadow={option.isSelected ? '1' : 'none'}
            width="100%"
          >
            <Text
              _dark={{
                color: 'white',
              }}
              _light={{
                color: 'black',
              }}
              fontSize="sm"
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
            <Divider
              height="4"
              marginY="1"
              orientation="vertical"
              _dark={{
                backgroundColor: 'darkGrey.50',
              }}
              _light={{
                backgroundColor: 'mediumGrey.100',
              }}
            />
          )}
      </HStack>
    ))}
  </HStack>
)

export default SegmentedPicker
