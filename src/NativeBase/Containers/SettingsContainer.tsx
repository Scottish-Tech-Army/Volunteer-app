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

  const dataPermissionsState = useSelector(
    (state: { permissions: PermissionsState }) => state.permissions.data,
  )
  const onChangeErrorLogsPermission = (errorLogs: boolean) => {
    dispatch(setPermissions({ data: { ...dataPermissionsState, errorLogs } }))
  }
  const useSystemColourMode = useSelector(
    (state: { theme: ThemeState }) => state.theme.useSystemColourMode,
  )

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

  const { authenticated: isLoggedIn, logout } = useAuth()

  const handleLogin = () => {
    navigate('Login', {})
  }

  const handleLogout = () => {
    logout()
  }

  const featureFlags = useFeatureFlags()

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} padding={4} space={4}>
          <Heading
            textAlign="center"
            size="lg"
            marginTop={8}
            fontFamily="title"
          >
            SETTINGS
          </Heading>

          <View marginTop={'48px'} marginBottom={'48px'}>
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
          </VStack>

          <VStack alignItems="center" space={2} width="100%">
            <Text fontSize="xs">Version {version}</Text>
            <PrivacyAndTermsLinks />
          </VStack>
        </VStack>
      </ScrollView>

      <VStack alignItems="center">
        {featureFlags.login ? (
          !isLoggedIn ? (
            <Button width="90%" onPress={handleLogin} marginTop={'48px'}>
              Log in
            </Button>
          ) : (
            <Button
              width="90%"
              backgroundColor="white"
              marginTop={'48px'}
              _text={{ color: 'error.100', fontWeight: 'bold' }}
              borderColor="error.100"
              borderWidth={1}
              onPress={handleLogout}
            >
              Log out
            </Button>
          )
        ) : null}
      </VStack>
    </>
  )
}

export default SettingsContainer
