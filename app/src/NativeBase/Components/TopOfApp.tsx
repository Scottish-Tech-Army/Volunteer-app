import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  StatusBar,
  Text,
} from 'native-base'
import React from 'react'
import StaLogo from '@/Components/StaLogo'
import styled from 'styled-components/native'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'

import MenuIcon from '@/NativeBase/Assets/Images/Icons/material-symbols_menu-rounded.svg'
import SearchIcon from '@/NativeBase/Assets/Images/Icons/material-symbols_search-rounded.svg'
import StaLogoSquare from '@/NativeBase/Assets/Images/Logos/sta-logo-square.svg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const TopOfApp = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Box safeAreaTop bg="white" />
      <HStack
        borderColor="red.600"
        borderWidth={1}
        alignItems="center"
        justifyContent="space-between"
        marginY={2}
        paddingX={2}
        w="100%"
      >
        <StaLogoSquare width={42} height={42} />

        <HStack
          borderColor="red.600"
          borderWidth="1"
          alignItems="center"
          justifyContent="flex-end"
          space={0}
          paddingRight={0}
        >
          <IconButton
            icon={
              <Icon
                borderColor="red.600"
                borderWidth="1"
                size={8}
                as={MaterialIcons}
                name="search"
                color="black"
                mx={0}
                px={0}
              />
            }
          />
          <IconButton
            icon={
              <Icon
                borderColor="red.600"
                borderWidth="1"
                size={8}
                as={MaterialIcons}
                name="menu"
                color="black"
                mx={0}
                px={0}
              />
            }
          />
        </HStack>
      </HStack>
    </>
  )
}

export default TopOfApp
