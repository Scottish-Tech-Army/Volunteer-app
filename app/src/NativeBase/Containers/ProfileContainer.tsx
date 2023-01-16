/**
 * @file App configuration settings.
 */
import React from 'react'
import {
  Heading,
  VStack,
  HStack,
  Link,
  Radio,
  Checkbox,
  Text,
  Center,
  Spacer,
  ScrollView,
  extendTheme,
  NativeBaseProvider,
} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'
import { version } from '../../../package.json'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { Brand } from '@/Components'

const ProfileContainer = () => {
  const StaTheme = extendTheme({
    components: {
      Text: {
        baseStyle: {
          color: '#3C3C3B',
          fontFamily: 'Poppins-Medium',
        },
      },
      Heading: {
        baseStyle: {
          color: '#D1338A',
          fontFamily: 'Poppins-Medium',
        },
      },
    },
  })
  const welcomeState = useSelector(
    (state: { welcome: WelcomeState }) => state.welcome.show,
  )
  const themeState = useSelector((state: { theme: ThemeState }) => {
    return String(state.theme.darkMode)
  })
  const dispatch = useDispatch()
  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }
  const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
    dispatch(changeWelcome({ welcome, show }))
  }
  return (
    // NativeBase would normally wrap the top level component but
    // I've put it here to separate concerns while evaluating NativeBase.
    <NativeBaseProvider theme={StaTheme}>
      <ScrollView>
        <VStack safeAreaTop space={4} padding={4}>
          <Center>
            <Brand />
          </Center>
          <Heading>Theme</Heading>
          <Radio.Group
            colorScheme={'pink'}
            name="themeRadioGroup"
            accessibilityLabel="Application theme"
            // This is hacky sorry. Depending on the theming system
            // we employ this would be tidied up.
            onChange={value => {
              if (value === 'null') {
                onChangeTheme({ darkMode: null })
              }
              if (value === 'true') {
                onChangeTheme({ darkMode: true })
              } else {
                onChangeTheme({ darkMode: false })
              }
            }}
            defaultValue={themeState}
          >
            <Radio value="null" my={1}>
              Follow system setting
            </Radio>
            <Radio value="true" my={1}>
              Dark mode
            </Radio>
            <Radio value="false" my={1}>
              Light mode
            </Radio>
          </Radio.Group>
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
          <Center>
            <Text>Version</Text>
            <Text>{version}</Text>
          </Center>
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
    </NativeBaseProvider>
  )
}

export default ProfileContainer
