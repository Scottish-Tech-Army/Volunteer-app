/**
 * @file shows text in a coloured box, randomly choosing one of four colours
 */

import React from 'react'
import { Box } from 'native-base'

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
  const colours = ['blue.20', 'purple.40', 'primary.60', 'primary.40']
  const randomColour = colours[Math.floor(Math.random() * colours.length)]

  if (title) {
    return (
      <Box
        bgColor={randomColour}
        rounded="md"
        style={{ alignSelf: 'flex-start' }}
        marginLeft={2}
        maxHeight="xs"
        _text={{ fontSize: 'xs' }}
      >
        {title}
      </Box>
    )
  }
  return null
}

export default ColouredTag
