/**
 * @file for Sta Progress Bar component
 */
import { Box, HStack } from 'native-base'
import React from 'react'

type ProgressBarProps = {
  bgColor: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ bgColor }) => {
  return (
    <>
      <HStack marginX={5} space="3">
        <Box bgColor={bgColor} height="15" width="22%" />
        <Box bgColor={'secondaryGrey.80'} height="15" width="22%" />
        <Box bgColor="secondaryGrey.80" height="15" width="22%" />
        <Box bgColor="secondaryGrey.80" height="15" width="22%" />
      </HStack>
    </>
  )
}

export default ProgressBar
