import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  EventDetailContainer,
  StartupContainer,
  ProjectDetailContainer,
  ProjectRegisterInterestContainer,
  ProjectSearchResultsContainer,
  ProjectSearchContainer,
  EventSearchContainer,
  WelcomeContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
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
              title: 'Project Details',
              headerTitleAlign: 'center', //android defaults to left aligned (ios is always centered)
              headerBackTitleVisible: false, //ios defaults to title of previous screen
            }}
          />
          <Stack.Screen
            name="ProjectRegisterInterest"
            component={ProjectRegisterInterestContainer}
            options={{
              title: 'Register Interest',
              headerTitleAlign: 'center', //android defaults to left aligned (ios is always centered)
              headerBackTitleVisible: false, //ios defaults to title of previous screen
            }}
          />
          <Stack.Screen
            name="ProjectSearch"
            component={ProjectSearchContainer}
            options={{
              headerTitleAlign: 'center',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="ProjectSearchResults"
            component={ProjectSearchResultsContainer}
            options={{
              headerBackTitleVisible: false,
              title: 'Project Search Results',
            }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetailContainer}
            options={{
              title: 'Event Details',
              headerTitleAlign: 'center', //android defaults to left aligned (ios is always centered)
              headerBackTitleVisible: false, //ios defaults to title of previous screen
            }}
          />
          <Stack.Screen
            name="EventSearch"
            component={EventSearchContainer}
            options={{
              headerTitleAlign: 'center',
              headerBackTitleVisible: false,
              title: 'Event Search',
            }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeContainer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
