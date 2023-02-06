/**
 * @file Defines the main screens that have tabs at the bottom of the app, e.g. Projects, Events.
 */

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ListContainer } from '@/Containers'
import { ListType } from '@/Containers/ListContainer'
import { useTheme } from '@/Hooks'
import { ProfileContainer, VerticalStackContainer} from '@/NativeBase/Containers'
import { EventTicket, Home, Projects, User } from '@/NativeBase/Assets/Icons'
import { View } from 'react-native'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const { Colors } = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {
          height: 56,
        }
      }}
    >
      <Tab.Screen
        name="Example Container"
        component={VerticalStackContainer}
        options=
        {{
          tabBarIcon: ({ focused }) => (
            <>
            <View
              style={{
                width: 97,
                borderTopWidth: 2, borderTopColor: focused ? Colors.primary : "transparent",
              }}
            >
              </View>
              <View style={{
                padding: 10
              }} >
              <Home color={focused ? Colors.primary : Colors.text} />  
              </View>
            </>
          )
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ListContainer}
        initialParams={{ type: ListType.Projects }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View
                style={{
                  width: 97,
                  borderTopWidth: 2, borderTopColor: focused ? Colors.primary : "transparent",
                }}
              >
              </View>
              <View style={{
                padding: 12.5
              }} >
                <Projects color={focused ? Colors.primary : Colors.text} />
              </View>
            </>
          )
        }}
      />
      <Tab.Screen
        name="Events"
        component={ListContainer}
        initialParams={{ type: ListType.Events }}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View
                style={{
                  width: 97,
                  borderTopWidth: 2, borderTopColor: focused ? Colors.primary : "transparent",
                }}
              >
              </View>
              <View style={{
                padding: 11
              }} >
                <EventTicket color={focused ? Colors.primary : Colors.text} />
              </View>
            </>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View
                style={{
                  width: 97,
                  borderTopWidth: 2, borderTopColor: focused ? Colors.primary : "transparent",
                }}
              >
              </View>
              <View style={{
                padding: 9
              }} >
                <User color={focused ? Colors.primary : Colors.text} />
              </View>
            </>
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
