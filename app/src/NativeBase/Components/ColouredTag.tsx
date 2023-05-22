/**
 * @file shows text in a coloured box, randomly choosing one of four colours
 */

import React from 'react'
import { Box, Text, useColorMode } from 'native-base'
import { getRoleGroupIndex } from '../../Services/modules/projects/roleGroups'

type ColouredTagProps = {
  title: string
}

/**
 * A functional component to display text in a coloured tag
 * @param {ColouredTagProps} props - the props for this component
 * @param {string} props.title - the text
 * @returns {JSX.Element|null} React element - renders the text in a coloured tag, or null if there is none
 */
const ColouredTag = ({ title }: ColouredTagProps) => {
  // Check accessibility at https://webaim.org/resources/contrastchecker/ if changing or adding to any of these colours or the box background colour
  const colours = {
    dark: ['blue.60', 'purple.100', 'primary.100'],
    light: ['blue.20', 'purple.20', 'primary.20'],
  }
  const { colorMode } = useColorMode()
  const coloursToUse = colours[colorMode ?? 'light']
  // const randomColour = coloursToUse[Math.floor(Math.random() * coloursToUse.length)]

  const roleIndex = getRoleGroupIndex(title)
  const selectedColour = coloursToUse[0]

  if (title) {
    return (
      <Box
        alignSelf="flex-start"
        _dark={{ backgroundColor: 'bg.100' }}
        _light={{ backgroundColor: selectedColour }}
        rounded="md"
        marginLeft={2}
        maxHeight="xs"
      >
        <Text _dark={{ color: selectedColour }} fontSize="xs">
          {title} {roleIndex}
        </Text>
      </Box>
    )
  }
  return null
}

export default ColouredTag
