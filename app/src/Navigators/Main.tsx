import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import { HomeContainer } from '@/Containers'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from '@/Hooks'
import EventList from '@/Components/Event/EventList'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const { Colors } = useTheme()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo color={Colors.text} name="home" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventList}
        options={{
          tabBarIcon: () => <Entypo color={Colors.text} name="cog" size={24} />,
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
