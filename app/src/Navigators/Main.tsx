import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  HomeContainer,
  EventsContainer,
  ExampleContainer,
  ListContainer,
} from '@/Containers'
import Entypo from 'react-native-vector-icons/Entypo'
import { ListType } from '@/Containers/ListContainer'
import { useTheme } from '@/Hooks'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const { Colors } = useTheme()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
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
    </Tab.Navigator>
  )
}

export default MainNavigator
