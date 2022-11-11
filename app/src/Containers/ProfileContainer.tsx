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
} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'
import { useTheme } from '@/Hooks'
import { version } from '../../package.json'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { Brand } from '@/Components'

const ProfileContainer = () => {
  const { Fonts, Gutters } = useTheme()
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
        <Center>
          <Brand />
        </Center>
        <Heading>Theme</Heading>
        <Radio.Group
          name="themeRadioGroup"
          accessibilityLabel="Application theme"
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
          value="welcome"
          accessibilityLabel="Show a splash screen when the app starts"
          isChecked={welcomeState}
          onChange={() => onChangeSplash({ show: !welcomeState })}
        >
          Show a splash screen when the app starts
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
  )
}

export default ProfileContainer
