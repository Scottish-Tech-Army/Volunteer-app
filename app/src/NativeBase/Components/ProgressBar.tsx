/**
 * @file for Sta Progress Bar component
 */
import { Box, HStack } from 'native-base'
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
            role="progressbar"
            aria-valuemax={4}
            aria-valuemin={0}
            aria-valuenow={index + 1}
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
