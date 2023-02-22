/**
 * @file Profile screen showing app configuration settings (and later probably the user's profile).
 *
 * The user's dark mode preference (which NativeBase calls colour mode) is handled in two ways:
 *
 * 1) 'System default' choice: we use the Redux store for our 'useSystemColourMode' flag -- this says whether or not the user's chosen 'Use system default'
 * (NativeBase doesn't seem to have an easy built-in way to handle this option that works.)
 * Then we use NativeBase's toggleColorMode to set the colour mode to reflect whether the OS is set to dark or light -- this happens in Navigators/Application.
 *
 * 2) 'Dark'/'Light' choice: if they choose to manually set the colour to dark or light, we ignore the OS's setting and simply use NativeBase's toggleColorMode
 * to set the colour mode to dark or light based on the user's preference.
 *
 * See more about dark mode in APP_DEVELOPMENT.md
 */

import {
  Button,
  Heading,
  VStack,
  HStack,
  Icon,
  Link,
  Checkbox,
  Text,
  Spacer,
  ScrollView,
  useColorMode,
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Brand from '@/NativeBase/Components/Brand'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'
import { version } from '../../../package.json'

const ProfileContainer = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useDispatch()
  const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
    dispatch(changeWelcome({ welcome, show }))
  }
  const useSystemColourMode = useSelector(
    (state: { theme: ThemeState }) => state.theme.useSystemColourMode,
  )
  const welcomeState = useSelector(
    (state: { welcome: WelcomeState }) => state.welcome.show,
  )
  const [colourModeChoice, setColourModeChoice] = useState<string>(
    useSystemColourMode ? 'system' : colorMode ?? 'light',
  )

  const updateColourMode = (newColourMode: string) => {
    switch (newColourMode) {
      case 'system':
        dispatch(
          changeTheme({
            theme: undefined,
            darkMode: undefined,
            useSystemColourMode: true,
          }),
        )
        break

      case 'dark':
      case 'light':
        dispatch(
          changeTheme({
            theme: undefined,
            darkMode: undefined,
            useSystemColourMode: false,
          }),
        )

        if (colorMode !== newColourMode) toggleColorMode()
        break
    }

    setColourModeChoice(newColourMode)
  }

  return (
    <ScrollView>
      <VStack safeAreaTop space={4} padding={4}>
        <Brand />

        <Heading>Dark mode</Heading>
        <HStack space={2}>
          <Button
            onPress={() => updateColourMode('system')}
            // variant={colourModeChoice === 'system' ? 'solid' : 'outline'}
            _text={{
              fontWeight: '300',
              fontSize: 'sm',
              padding: '0',
              color: 'text.100',
            }}
            borderWidth="1"
            bg={colourModeChoice === 'system' ? 'primary.80' : 'primary.20'}
            rounded="md"
          >
            Use system default
          </Button>
          <Button
            onPress={() => updateColourMode('dark')}
            _text={{
              fontWeight: '300',
              fontSize: 'sm',
              padding: '0',
              color: 'text.100',
            }}
            borderWidth="1"
            bg={colourModeChoice === 'dark' ? 'primary.80' : 'primary.20'}
            rounded="md"
            // variant={ colourModeChoice === 'dark' ? 'solid' : 'outline'}
          >
            Dark
          </Button>
          <Button
            onPress={() => updateColourMode('light')}
            // variant={colourModeChoice === 'light' ? 'solid' : 'outline'}
            _text={{
              fontWeight: '300',
              fontSize: 'sm',
              padding: '0',
              color: 'text.100',
            }}
            borderWidth="1"
            bg={colourModeChoice === 'light' ? 'primary.80' : 'primary.20'}
            rounded="md"
          >
            Light
          </Button>
        </HStack>

        <Heading>Welcome screen</Heading>
        <Checkbox
          colorScheme={'pink'}
          value="welcome"
          accessibilityLabel="Show a splash screen when the app starts"
          isChecked={welcomeState}
          onChange={() => onChangeSplash({ show: !welcomeState })}
        >
          Show splash screen on app launch
        </Checkbox>
        <Spacer />
        <HStack justifyContent="center">
          <Icon
            size={8}
            as={MaterialIcons}
            name="info"
            color="black"
            mx={0}
            px={0}
          />
          <Text>Version {version}</Text>
        </HStack>
        <HStack safeAreaBottom space="4" justifyContent={'center'}>
          <Link href="https://www.scottishtecharmy.org/app-privacy-policy">
            Privacy policy
          </Link>
          <Link href="https://www.scottishtecharmy.org/app-terms-conditions">
            Terms and conditions
          </Link>
        </HStack>
      </VStack>
    </ScrollView>
  )
}

export default ProfileContainer
