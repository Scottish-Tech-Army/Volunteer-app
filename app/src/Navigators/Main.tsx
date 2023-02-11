/**
 * @file Defines the main screens that have tabs at the bottom of the app, e.g. Projects, Events.
 */

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ListContainer } from '@/Containers'
import { ListType } from '@/Containers/ListContainer'
import {
  ProfileContainer,
  VerticalStackContainer,
} from '@/NativeBase/Containers'
import { EventTicket, Home, Projects, User } from '@/NativeBase/Assets/Icons'
import { View, useColorMode, ColorMode } from 'native-base'
import StaTheme from '@/NativeBase/Theme/StaTheme'

type navBarProps = {
  focused: boolean,
  colorMode: ColorMode,
}

const Tab = createBottomTabNavigator()

const TabBarIconWrapper = ({
  focused,
  colorMode,
}: navBarProps ) => (
  <View
    borderTopColor={
      focused
        ? colorMode === 'light'
          ? StaTheme.colors.primary['100']
          : StaTheme.colors.primary['40']
        : 'transparent'
    }
    borderTopWidth={2}
    style={{ width: 97 }}
  />
)

const iconColor = ({
  focused,
  colorMode,
}: navBarProps ) => {
  return focused
    ? colorMode === 'light'
      ? StaTheme.colors.primary['100']
      : StaTheme.colors.primary['40']
    : colorMode === 'light'
     ? StaTheme.colors.text['100']
      : StaTheme.colors.textDarkMode['100']
}

const HomeTabBarIcon = ({
  focused,
  colorMode,
}: navBarProps ) => (
  <>
    <TabBarIconWrapper focused={ focused } colorMode={ colorMode } />
      <View style={{ padding: 4 }} >
        <Home
        color={ iconColor({ focused, colorMode }) } />
      </View>
  </>
)
const ProjectsTabBarIcon = ({
  focused,
  colorMode,
}: navBarProps) => (
  <>
    <TabBarIconWrapper focused={ focused } colorMode={ colorMode } />
      <View style={{ padding: 9 }} >
        <Projects
        color={ iconColor({ focused, colorMode }) } />
      </View>
  </>
)
const EventsTabBarIcon = ({ 
  focused,
  colorMode,
}: navBarProps) => (
  <>
    <TabBarIconWrapper focused={ focused } colorMode={ colorMode } />
      <View style={{ padding: 7 }} >
        <EventTicket
        color={ iconColor({ focused, colorMode }) } />
      </View>
  </>
)
const ProfileTabBarIcon = ({ 
  focused,
  colorMode,
}: navBarProps) => (
  <>
    <TabBarIconWrapper focused={ focused } colorMode={ colorMode } />
      <View style={{ padding: 4 }} >
        <User
        color={ iconColor({ focused, colorMode }) } />
      </View>
  </>
)
  
// @refresh reset
const MainNavigator = () => {
  const { colorMode } = useColorMode()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Example Container"
        component={VerticalStackContainer}
        options= {{
          tabBarIcon: ({ focused }) => (
            <HomeTabBarIcon focused={ focused } colorMode={ colorMode } />
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
              <ProjectsTabBarIcon focused={ focused } colorMode={ colorMode } />
          )
        }}
      />
      <Tab.Screen
        name="Events"
        component={ListContainer}
        initialParams={{ type: ListType.Events }}
        options={{
          tabBarIcon: ({ focused }) => (
            <EventsTabBarIcon focused={ focused } colorMode={ colorMode } />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileTabBarIcon focused={ focused } colorMode={ colorMode } />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
