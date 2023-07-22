/**
 * @file for Sta Progress Bar component
 */
import { Box, HStack } from 'native-base'
import React from 'react'

interface ProgressBarColors {
  box1: string
  box2: string
  box3: string
  box4: string
}

const ProgressBar: React.FC<{ progressBarColors: ProgressBarColors }> = ({
  progressBarColors,
}) => {
  return (
    <>
      <HStack marginX={5} space="3">
        <Box bgColor={progressBarColors.box1} height="15" width="22%" />
        <Box bgColor={progressBarColors.box2} height="15" width="22%" />
        <Box bgColor={progressBarColors.box3} height="15" width="22%" />
        <Box bgColor={progressBarColors.box4} height="15" width="22%" />
      </HStack>
    </>
  )
}

export default ProgressBar
