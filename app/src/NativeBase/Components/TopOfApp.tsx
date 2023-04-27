/**
 * @file This goes at the top of containers where you want to show the logo, and optionally a search button e.g. projects list, events list screens
 *
 * Follows example here https://docs.nativebase.io/building-app-bar
 */

import {
  Box,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  useColorMode,
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

/**
 * Component showing logo and optional search button at top of screen.
 *
 * @param {TopOfAppProps} props The component props
 * @param {boolean} props.showSearchButton Whether to show the search button
 * @param {function} [props.onSearchButtonPress] Event handler for when the search button is pressed
 * @returns {React.ReactElement} Component
 */
const TopOfApp: FC<TopOfAppProps> = ({
  showSearchButton,
  onSearchButtonPress,
}) => {
  const { colorMode } = useColorMode()
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
      <StatusBar
        backgroundColor={
          colorMode === 'light'
            ? StaTheme.colors.bg['100']
            : StaTheme.colors.bgDarkMode['100']
        }
        barStyle={statusBarStyle}
      />

      <Box
        _dark={{ backgroundColor: StaTheme.colors.bgDarkMode['100'] }}
        _light={{ backgroundColor: StaTheme.colors.bg['100'] }}
        safeAreaTop
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
          px={4}
          py={3}
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
