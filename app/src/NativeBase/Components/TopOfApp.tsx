/**
 * @file This goes at the top of containers where you want to show the logo, a hamburger menu, and optionally a search button e.g. projects list, events list screens
 *
 * Follows example here https://docs.nativebase.io/building-app-bar
 */

import {
  Box,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  useColorModeValue,
} from 'native-base'
import React, { FC } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StaLogoSquare from '@/NativeBase/Assets/Images/Logos/sta-logo-square.svg'
import StaLogoSquareDarkMode from '@/NativeBase/Assets/Images/Logos/sta-logo-square-dark-mode.svg'
import StaTheme from '../Theme/StaTheme'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'

interface TopOfAppProps {
  showSearchButton: boolean
  onSearchButtonPress?: () => void
}

const TopOfApp: FC<TopOfAppProps> = ({
  showSearchButton,
  onSearchButtonPress,
}) => {
  const logoWidthHeight = 42
  const logo = useColorModeValue(
    <StaLogoSquare height={logoWidthHeight} width={logoWidthHeight} />,
    <StaLogoSquareDarkMode height={logoWidthHeight} width={logoWidthHeight} />,
  )

  return (
    <>
      <StatusBar />

      <Box
        _dark={{ backgroundColor: StaTheme.colors.text['100'] }}
        _light={{ backgroundColor: StaTheme.colors.bg['100'] }}
        safeAreaTop
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          marginY={2}
          paddingX={4}
          paddingY={2}
        >
          {logo}

          <HStack
            alignItems="center"
            justifyContent="flex-end"
            paddingRight={0}
            space={4}
          >
            {showSearchButton && Boolean(onSearchButtonPress) && (
              <IconButton
                icon={<Icon as={MaterialIcons} name="search" />}
                onPress={onSearchButtonPress}
              />
            )}

            <IconButton
              icon={<Icon as={MaterialIcons} name="menu" />}
              onPress={underDevelopmentAlert}
            />
          </HStack>
        </HStack>
      </Box>
    </>
  )
}

export default TopOfApp
