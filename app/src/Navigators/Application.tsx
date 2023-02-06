/**
 * @file Defines the list of screens (apart from the main screens that have tabs at the bottom of the app e.g. Projects -- these are defined in Main.tsx).
 */

import { useColorMode } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { AppState, SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import {
  EventDetailContainer,
  StartupContainer,
  ProjectDetailContainer,
  ProjectRegisterInterestContainer,
  ProjectSearchContainer,
  EventSearchContainer,
  WelcomeContainer,
} from '@/Containers'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import ProjectScope from '@/Components/Project/ProjectScope'
import NavigationHeader from '@/NativeBase/Components/NavigationHeader'
import StaTheme from '@/NativeBase/Theme/StaTheme'
import { ThemeState } from '@/Store/Theme'

const Stack = createStackNavigator()

const renderNavigationHeader = (props: StackHeaderProps) => (
  <NavigationHeader {...props} />
)

/**
 * Safe area and Stack Navigator for the app
 * @returns {SafeAreaView} safe area and navigator container
 */
const ApplicationNavigator = () => {
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const { colorMode, toggleColorMode } = useColorMode()
  const stackScreenDefaultOptions = {
    header: props => renderNavigationHeader(props),
    headerTitleAlign: 'center', //android defaults to left aligned otherwise (iOS is always centred)
    headerBackTitleVisible: false, //iOS defaults to title of previous screen
  } as StackNavigationOptions
  const systemColourMode = useColorScheme()
  const useSystemColourMode = useSelector(
    (state: { theme: ThemeState }) => state.theme.useSystemColourMode,
  )

  // When the user sets the dark/light mode choice to 'Use system default',
  // or when they've already done that and the system dark/light mode setting changes (e.g. the user changes their OS settings or the OS changes mode on a timer),
  // then toggle NativeBase's colour mode to reflect it if necessary
  useEffect(() => {
    if (useSystemColourMode && colorMode !== systemColourMode) toggleColorMode()
  }, [
    appStateVisible,
    colorMode,
    systemColourMode,
    toggleColorMode,
    useSystemColourMode,
  ])

  // On Android, React Native's useColorScheme hook may not actually fire when the user updates their OS dark/light mode settings
  // so here we add an extra check -- the event listener below is triggered when the user switches back to our app from another app
  // and this in turn triggers the useEffect above which has appStateVisible as a dependency
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  const navigationTheme =
    colorMode === 'dark'
      ? {
          colors: {
            primary: StaTheme.colors.primary['100'],
            background: StaTheme.colors.bgDarkMode['100'],
            card: StaTheme.colors.bgDarkMode['100'],
            text: StaTheme.colors.textDarkMode['100'],
            border: StaTheme.colors.textDarkMode['100'],
            notification: StaTheme.colors.primary['100'],
          },
          dark: true,
        }
      : {
          colors: {
            primary: StaTheme.colors.primary['100'],
            background: StaTheme.colors.bg['100'],
            card: StaTheme.colors.bg['100'],
            text: StaTheme.colors.text['100'],
            border: StaTheme.colors.text['100'],
            notification: StaTheme.colors.primary['100'],
          },
          dark: false,
        }
  const safeAreaViewStyle = [
    { backgroundColor: navigationTheme.colors.background, flex: 1 },
  ]

  return (
    <SafeAreaView style={safeAreaViewStyle}>
      <NavigationContainer theme={navigationTheme} ref={navigationRef}>
        <StatusBar />

        <Stack.Navigator>
          <Stack.Screen
            name="Startup"
            component={StartupContainer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ProjectDetail"
            component={ProjectDetailContainer}
            options={{
              ...stackScreenDefaultOptions,
              title: 'Projects',
            }}
          />

          <Stack.Screen
            name="ProjectRegisterInterest"
            component={ProjectRegisterInterestContainer}
            options={{
              ...stackScreenDefaultOptions,
              title: 'Register Interest',
            }}
          />

          <Stack.Screen
            name="ProjectSearch"
            component={ProjectSearchContainer}
            options={{
              ...stackScreenDefaultOptions,
              title: 'Project Search',
            }}
          />

          <Stack.Screen
            name="EventDetail"
            component={EventDetailContainer}
            options={{
              ...stackScreenDefaultOptions,
              title: 'Event Details',
            }}
          />

          <Stack.Screen
            name="EventSearch"
            component={EventSearchContainer}
            options={{
              ...stackScreenDefaultOptions,
              title: 'Event Search',
            }}
          />

          <Stack.Screen
            name="Welcome"
            component={WelcomeContainer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProjectScope"
            component={ProjectScope}
            options={{
              ...stackScreenDefaultOptions,
              title: 'Project Scope',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
