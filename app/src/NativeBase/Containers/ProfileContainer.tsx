/**
 * @file App configuration settings.
 */
import React from 'react'
import {
  Heading,
  VStack,
  HStack,
  Icon,
  Link,
  Radio,
  Checkbox,
  Text,
  Center,
  Spacer,
  ScrollView,
} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'
import { version } from '../../../package.json'
import { changeTheme, ThemeState } from '@/Store/Theme'
import Brand from '@/NativeBase/Components/Brand'

const ProfileContainer = () => {
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
    <ScrollView>
      <VStack safeAreaTop space={4} padding={4}>
        <Brand />
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
