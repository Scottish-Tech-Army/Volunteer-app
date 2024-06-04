/**
 * @file Settings screen showing app configuration settings.
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

import React, { useState } from 'react'
import {
  Heading,
  VStack,
  Text,
  ScrollView,
  useColorMode,
  Button,
  View,
} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import Brand from '@/NativeBase/Components/Brand'
import PrivacyAndTermsLinks from '@/NativeBase/Components/PrivacyAndTermsLinks'
import YesNoChoice from '@/NativeBase/Components/Forms/YesNoChoice'
import { setPermissions, PermissionsState } from '@/Store/Permissions'
import { changeTheme, ThemeState } from '@/Store/Theme'
// import { changeWelcome, WelcomeState } from '@/Store/Welcome'     // currently not being used due to cleanup for MVP
import { version } from '../../../package.json'
import SegmentedPicker, {
  SegmentedPickerOption,
} from '../Components/SegmentedPicker'
import { capitaliseFirstLetter } from '@/Utils/Text'
import { useAuth } from '@/Services/auth'
import { navigate } from '@/Navigators/utils'
import { useFeatureFlags } from '@/Services/featureFlags'

const SettingsContainer = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useDispatch()

  // const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
  //   dispatch(changeWelcome({ welcome, show }))
  // }

  const dataPermissionsState = useSelector(
    (state: { permissions: PermissionsState }) => state.permissions.data,
  )
  const onChangeErrorLogsPermission = (errorLogs: boolean) => {
    dispatch(setPermissions({ data: { ...dataPermissionsState, errorLogs } }))
  }
  const useSystemColourMode = useSelector(
    (state: { theme: ThemeState }) => state.theme.useSystemColourMode,
  )
  // const welcomeState = useSelector(
  //   (state: { welcome: WelcomeState }) => state.welcome.show,
  // )

  const [colourModeChoice, setColourModeChoice] = useState<string>(
    useSystemColourMode ? 'system' : colorMode ?? 'light',
  )
  const colourModeOptions = ['system', 'dark', 'light'].map(
    option =>
      ({
        text: capitaliseFirstLetter(option),
        onPress: () => updateColourMode(option),
        isSelected: colourModeChoice === option,
      } as SegmentedPickerOption),
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

  const { authenticated: isLoggedIn, login, logout } = useAuth()

  const handleLogin = () => {
    navigate('Login', {})
  }

  const handleLogout = () => {
    logout()
  }

  const featureFlags = useFeatureFlags()

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} padding={4} space={4}>
        <Heading textAlign="center" size="lg" marginTop={8} fontFamily="title">
          SETTINGS
        </Heading>

        <View style={{ marginTop: 48 }}>
          <Brand />
        </View>

        <VStack space={4} flex={1}>
          <VStack space={2}>
            <Heading size="xs">Dark mode</Heading>
            <SegmentedPicker options={colourModeOptions} />
          </VStack>

          <VStack>
            <YesNoChoice
              description="Send bug reports?"
              onChange={() =>
                onChangeErrorLogsPermission(!dataPermissionsState.errorLogs)
              }
              value={dataPermissionsState.errorLogs}
            />
            <Text fontSize="xs">
              Automatically send bug reports to the STA team? May include
              personal data
            </Text>
          </VStack>

          {/* <Heading size="sm">Welcome screen</Heading>
          <Checkbox
            colorScheme={'pink'}
            value="welcome"
            accessibilityLabel="Show a splash screen when the app starts"
            isChecked={welcomeState}
            onChange={() => onChangeSplash({ show: !welcomeState })}
          >
            <Text fontSize="sm">Show splash screen on app launch</Text>
          </Checkbox> */}
        </VStack>

        <VStack alignItems="center" space={2} width="100%" paddingBottom={4}>
          <Text fontSize="xs">Version {version}</Text>
          <PrivacyAndTermsLinks />
          {featureFlags.login ? (
            !isLoggedIn ? (
              <Button width="90%" onPress={handleLogin}>
                Log in
              </Button>
            ) : (
              <Button
                width="90%"
                backgroundColor="white"
                _text={{ color: 'error.100', fontWeight: 'bold' }}
                onPress={handleLogout}
              >
                Log out
              </Button>
            )
          ) : null}
        </VStack>
      </VStack>
    </ScrollView>
  )
}

export default SettingsContainer
