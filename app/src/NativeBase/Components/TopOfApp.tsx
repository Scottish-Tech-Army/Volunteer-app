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
import StaLogoWide from '@/NativeBase/Assets/Images/Logos/sta-logo-wide.svg'
import StaLogoWideDarkMode from '@/NativeBase/Assets/Images/Logos/sta-logo-wide-dark-mode.svg'
import StaTheme from '../Theme/StaTheme'

interface TopOfAppProps {
  showSearchButton: boolean
  onSearchButtonPress?: () => void // only needed if showSearchButton is set to true
}

const TopOfApp: FC<TopOfAppProps> = ({
  showSearchButton,
  onSearchButtonPress,
}) => {
  const logoSize = {
    height: 32,
    width: 101,
  }
  const logo = useColorModeValue(
    <StaLogoWide height={logoSize.height} width={logoSize.width} />,
    <StaLogoWideDarkMode height={logoSize.height} width={logoSize.width} />,
  )
  const statusBarStyle = useColorModeValue('dark-content', 'light-content')

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />

      <Box
        _dark={{ backgroundColor: StaTheme.colors.bgDarkMode['100'] }}
        _light={{ backgroundColor: StaTheme.colors.bg['100'] }}
        safeAreaTop
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          marginY={2}
          paddingX={4}
          paddingY={2}
          width="100%"
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
          </HStack>
        </HStack>
      </Box>
    </>
  )
}

export default TopOfApp
