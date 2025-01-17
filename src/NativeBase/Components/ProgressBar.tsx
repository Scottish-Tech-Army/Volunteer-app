/**
 * @file for Sta Progress Bar component
 */
import { Box, HStack } from '@gluestack-ui/themed-native-base'
import React from 'react'

interface ProgressBarProps {
  colours: string[]
}

const ProgressBar: React.FC<ProgressBarProps> = ({ colours }) => {
  return (
    <>
      <HStack marginX={5} space="3">
        {colours.map((colour, index) => (
          <Box
            key={index}
            bgColor={colour}
            height="15"
            width="22%"
            borderRadius={5}
          />
        ))}
      </HStack>
    </>
  )
}

export default ProgressBar
