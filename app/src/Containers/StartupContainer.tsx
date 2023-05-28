/**
 * @file Main container scaffold used on startup.
 */
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from '@/Hooks'
import Brand from '@/NativeBase/Components/Brand'
import { setDefaultTheme } from '@/Store/Theme'
import { setDefaultWelcome, WelcomeState } from '@/Store/Welcome'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useSelector } from 'react-redux'
import { Text } from 'native-base'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  const showWelcome = useSelector(
    (state: { welcome: WelcomeState }) => state.welcome.show,
  )

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    await setDefaultWelcome({ welcome: 'default', show: true })

    // Don't show the welcome screen if it's deselcted in Example.
    showWelcome
      ? navigateAndSimpleReset('Welcome')
      : navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        fontSize="18"
        padding="8"
        textAlign="center"
      >
        Welcome to the Scottish Tech Army App
      </Text>
    </View>
  )
}

export default StartupContainer
