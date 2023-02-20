/**
 * @file Defines the main screens that have tabs at the bottom of the app, e.g. Projects, Events.
 */
import React from 'react'
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { useRoute } from '@react-navigation/native'
import { ListContainer } from '@/Containers'
import { ListType } from '@/Containers/ListContainer'
import {
  ProfileContainer,
  VerticalStackContainer,
} from '@/NativeBase/Containers'

import SelectionIcons from '@/NativeBase/Assets/Icons/SelectionIcons'
import { Icon as IconifyIcon } from '@iconify/react'

import { View, useColorMode } from 'native-base'
import StaTheme from '@/NativeBase/Theme/StaTheme'

const Tab = createBottomTabNavigator()

interface CustomNavBarIconProps extends BottomTabNavigationOptions {
  focused?: boolean
}

const NavBarIcon = ({ focused }: CustomNavBarIconProps) => {
  const { colorMode } = useColorMode()
  const route = useRoute()
  let iconName = route.name

  switch (route.name) {
    case 'Home':
      iconName = 'home'
      break
    case 'Projects':
      iconName = 'six-dots'
      break
    case 'Events':
      iconName = 'ticket'
      break
    case 'Profile':
      iconName = 'user'
      break
  }

  return (
    <View
      borderTopColor={
        focused
          ? colorMode === 'light'
            ? StaTheme.colors.primary['100']
            : StaTheme.colors.primary['40']
          : 'transparent'
      }
      borderTopWidth={2}
      style={{
        flexDirection: 'row-reverse',
        width: 97,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SelectionIcons
        name={iconName}
        color={
          focused
            ? colorMode === 'light'
              ? StaTheme.colors.primary['100']
              : StaTheme.colors.primary['40']
            : colorMode === 'light'
            ? StaTheme.colors.text['100']
            : StaTheme.colors.textDarkMode['100']
        }
        size={18}
      />
    </View>
  )
}

/**
 * @returns {import('@react-navigation/bottom-tabs').BottomTabNavigator} A bottom tab navigator component from the '@react-navigation/bottom-tabs' package
 */
const MainNavigator = () => {
  const tabScreenOptions = {
    tabBarIcon: props => NavBarIcon(props),
  } as BottomTabNavigationOptions

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={VerticalStackContainer}
        options={{
          ...tabScreenOptions,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ListContainer}
        initialParams={{ type: ListType.Projects }}
        options={{
          headerShown: false,
          ...tabScreenOptions,
        }}
      />
      <Tab.Screen
        name="Events"
        component={ListContainer}
        initialParams={{ type: ListType.Events }}
        options={{
          ...tabScreenOptions,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          ...tabScreenOptions,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
