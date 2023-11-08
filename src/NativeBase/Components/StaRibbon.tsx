/**
 * @file for StaRibbon component
 */
import { HStack, Box } from 'native-base'
import React from 'react'

type StaRibbonProps = {
  colour: string
}

const StaRibbon: React.FC<StaRibbonProps> = ({ colour }) => (
  <HStack space="2">
    <Box bgColor={colour} height="15" width="70%" />
    <Box bgColor={colour} height="15" width="5%" borderRightRadius={10} />
  </HStack>
)

export default StaRibbon
