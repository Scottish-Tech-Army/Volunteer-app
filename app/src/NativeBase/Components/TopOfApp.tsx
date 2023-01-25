import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base'
import React from 'react'
import StaLogo from '@/Components/StaLogo'
import styled from 'styled-components/native'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'

import SearchIcon from '@/NativeBase/Assets/Icons/material-symbols_search-rounded.svg'
import StaLogoSquare from '@/NativeBase/Assets/Images/Logos/sta-logo-square.svg'

const TopOfApp = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350"
      >
        <Icon size="sm" as={StaLogoSquare} name="sta-logo" color="white" />

        <HStack alignItems="flex-end">
          <IconButton
            icon={<Icon size="sm" as={SearchIcon} name="menu" color="white" />}
          />
        </HStack>
      </HStack>
    </>
  )
}

export default TopOfApp
