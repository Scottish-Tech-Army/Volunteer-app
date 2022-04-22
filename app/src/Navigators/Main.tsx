import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer, ExampleContainer, ProjectSearchResultsContainer } from '@/Containers'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from '@/Hooks'

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

      {/* temporary tab to be able to see search result page during dev */}
      <Tab.Screen
        name="SearchResult"
        component={ProjectSearchResultsContainer}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo color={Colors.text} name="home" size={24} />
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
