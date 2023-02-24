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
import SelectionIcons from '@/NativeBase/Assets/Icons/Icomoon/SelectionIcons'
import { View, useColorMode, Text } from 'native-base'
import StaTheme from '@/NativeBase/Theme/StaTheme'
import { Platform } from 'react-native'

const Tab = createBottomTabNavigator()

interface BottomTabOptionsProps extends BottomTabNavigationOptions {
  focused?: boolean
}

const BottomTabIcon = ({ focused }: BottomTabOptionsProps) => {
  const { colorMode } = useColorMode()
  const route = useRoute()
  let iconName = ''

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
      borderTopWidth={2}
      borderTopColor={
        focused
          ? colorMode === 'light'
            ? StaTheme.colors.primary['100']
            : StaTheme.colors.primary['40']
          : 'transparent'
      }
      width={97}
      paddingTop={1}
      alignItems="center"
      justifyContent="flex-end"
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

const BottomTabLabel = ({ focused }: BottomTabOptionsProps) => {
  const { colorMode } = useColorMode()
  const route = useRoute()

  return (
    <Text
      fontSize={StaTheme.fontSizes.xs}
      paddingTop={1}
      color={
        focused
          ? colorMode === 'light'
            ? StaTheme.colors.primary['100']
            : StaTheme.colors.primary['40']
          : colorMode === 'light'
          ? StaTheme.colors.text['100']
          : StaTheme.colors.textDarkMode['100']
      }
    >
      {route.name}
    </Text>
  )
}

/**
 * @returns {import('@react-navigation/bottom-tabs').BottomTabNavigator} A bottom tab navigator component from the '@react-navigation/bottom-tabs' package
 */
const MainNavigator = () => {
  const bottomTabOptions = {
    tabBarIcon: props => BottomTabIcon(props),
    tabBarLabel: props => BottomTabLabel(props),
    tabBarStyle: {
      borderTopWidth: 0,
      height: Platform.OS === 'android' ? 56 : 85,
    },
  } as BottomTabNavigationOptions

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={VerticalStackContainer}
        options={{
          ...bottomTabOptions,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ListContainer}
        initialParams={{ type: ListType.Projects }}
        options={{
          headerShown: false,
          ...bottomTabOptions,
        }}
      />
      <Tab.Screen
        name="Events"
        component={ListContainer}
        initialParams={{ type: ListType.Events }}
        options={{
          ...bottomTabOptions,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          ...bottomTabOptions,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
