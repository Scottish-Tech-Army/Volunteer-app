/**
 * @file Defines the main screens that have tabs at the bottom of the app, e.g. Projects, Events.
 */

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer, ListContainer } from '@/Containers'
import Entypo from 'react-native-vector-icons/Entypo'
import { ListType } from '@/Containers/ListContainer'
import { useTheme } from '@/Hooks'
import ProfileContainer from '@/NativeBase/Containers/ProfileContainer'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const { Colors } = useTheme()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Projects"
        component={ListContainer}
        initialParams={{ type: ListType.Projects }}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo color={Colors.text} name="home" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={ListContainer}
        initialParams={{ type: ListType.Events }}
        options={{
          tabBarIcon: () => (
            <Entypo color={Colors.text} name="megaphone" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Example"
        component={ExampleContainer}
        options={{
          tabBarIcon: () => <Entypo color={Colors.text} name="cog" size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          tabBarIcon: () => (
            <Entypo color={Colors.text} name="user" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
