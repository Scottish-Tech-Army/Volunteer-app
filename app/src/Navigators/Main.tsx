import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import { HomeContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Example" component={ExampleContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
