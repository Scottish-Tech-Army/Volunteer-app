/**
 * @file Defines the list of screens (apart from the main screens that have tabs at the bottom of the app e.g. Projects -- these are defined in Main.tsx).
 */

import { useColorMode } from 'native-base'
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import {
  EventDetailContainer,
  StartupContainer,
  ProjectDetailContainer,
  ProjectRegisterInterestContainer,
  ProjectSearchContainer,
  EventSearchContainer,
  WelcomeContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import ProjectScope from '@/Components/Project/ProjectScope'
import NavigationHeader from '@/NativeBase/Components/NavigationHeader'
import StaTheme from '@/NativeBase/Theme/StaTheme'

const Stack = createStackNavigator()

/**
 * Safe area and Stack Navigator for the app
 * @returns {SafeAreaView} safe area and navigator container
 */
const ApplicationNavigator = () => {
  const { colorMode } = useColorMode()
  const { Layout } = useTheme()
  const stackScreenDefaultOptions = {
    header: props => <NavigationHeader {...props} />,
    headerTitleAlign: 'center', //android defaults to left aligned otherwise (iOS is always centred)
    headerBackTitleVisible: false, //iOS defaults to title of previous screen
  } as StackNavigationOptions

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

  return (
    <SafeAreaView
      style={[
        Layout.fill,
        { backgroundColor: navigationTheme.colors.background },
      ]}
    >
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
