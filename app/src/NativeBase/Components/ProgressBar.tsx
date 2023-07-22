/**
 * @file for Sta Progress Bar component
 */
import { HStack, Box } from 'native-base'
import React from 'react'

const ProgressBar = () => (
  <HStack marginX={5} space="3">
    <Box bgColor="purple.20" height="15" width="22%" />
    <Box bgColor="secondaryGrey.80" height="15" width="22%" />
    <Box bgColor="secondaryGrey.80" height="15" width="22%" />
    <Box bgColor="secondaryGrey.80" height="15" width="22%" />
  </HStack>
)

export default ProgressBar
