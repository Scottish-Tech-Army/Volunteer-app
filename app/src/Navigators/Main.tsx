/**
 * @file Defines the main screens that have tabs at the bottom of the app, e.g. Projects, Events.
 */

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ListContainer } from '@/Containers'
import { ListType } from '@/Containers/ListContainer'
import { ProfileContainer, VerticalStackContainer} from '@/NativeBase/Containers'
import { EventTicket, Home, Projects, User } from '@/NativeBase/Assets/Icons'
import { View, useColorMode } from 'native-base'
import StaTheme from '@/NativeBase/Theme/StaTheme'


const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const {colorMode} = useColorMode()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Example Container"
        component={VerticalStackContainer}
        options=
        {{
          tabBarIcon: ({ focused }) => (
            <>
              <View
                borderTopColor={focused
                  ? (colorMode === 'light'
                    ? StaTheme.colors.primary['100']
                    : StaTheme.colors.primary['40'])
                  : 'transparent'
                }
                borderTopWidth={2}
                style={{ width: 97 }}
              >
              </View>
              <View style={{ padding: 4 }}>
                <Home
                  color={focused
                    ? (colorMode === 'light'
                      ? StaTheme.colors.primary['100']
                      : StaTheme.colors.primary['40'])
                    : (colorMode === 'light'
                      ? StaTheme.colors.text['100']
                      : StaTheme.colors.textDarkMode['100'])
                  }
                />  
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
                borderTopColor={focused
                  ? (colorMode === 'light'
                    ? StaTheme.colors.primary['100']
                    : StaTheme.colors.primary['40'])
                  : 'transparent'
                }
                borderTopWidth={2}
                style={{ width: 97 }}
              >
              </View>
              <View style={{
                padding: 9
              }} >
                <Projects
                  color={focused
                    ? (colorMode === 'light'
                      ? StaTheme.colors.primary['100']
                      : StaTheme.colors.primary['40'])
                    : (colorMode === 'light'
                      ? StaTheme.colors.text['100']
                      : StaTheme.colors.textDarkMode['100'])
                  }
                />
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
                borderTopColor={focused
                  ? (colorMode === 'light'
                    ? StaTheme.colors.primary['100']
                    : StaTheme.colors.primary['40'])
                  : 'transparent'
                }
                borderTopWidth={2}
                style={{ width: 97 }}
              >
              </View>
              <View style={{ padding: 7 }}>
                <EventTicket
                  color={focused
                    ? (colorMode === 'light'
                      ? StaTheme.colors.primary['100']
                      : StaTheme.colors.primary['40'])
                    : (colorMode === 'light'
                      ? StaTheme.colors.text['100']
                      : StaTheme.colors.textDarkMode['100'])
                  }
                />
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
                borderTopColor={ focused
                  ? (colorMode === 'light'
                    ? StaTheme.colors.primary['100']
                    : StaTheme.colors.primary['40'])
                  : 'transparent'
                }
                borderTopWidth={2}
                style={{ width: 97 }}
              >
              </View>
              <View style={{ padding: 4 }}>
                <User
                  color={focused
                    ? (colorMode === 'light'
                      ? StaTheme.colors.primary['100']
                      : StaTheme.colors.primary['40'])
                    : (colorMode === 'light'
                      ? StaTheme.colors.text['100']
                      : StaTheme.colors.textDarkMode['100'])
                  }
                />
              </View>
            </>
          )
        }}
          />
      </Tab.Navigator>
  )
}

export default MainNavigator
