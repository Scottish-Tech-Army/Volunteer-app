/**
 * @file for StaRibbon component
 */
import { HStack, Box } from 'native-base'
import React from 'react'

const StaRibbon = () => {
  return (
    <HStack space="2">
      <Box bgColor="primary.100" height="15" width="70%" />
      <Box
        bgColor="primary.100"
        height="15"
        width="5%"
        borderRightRadius={10}
      />
    </HStack>
  )
}
export default StaRibbon
