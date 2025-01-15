/**
 * @file Login screen.
 */

import { useAuth } from '@/Services/auth'
import {
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  View,
} from 'native-base'
import React from 'react'
import { goBack, navigate } from '@/Navigators/utils'
import StaThemeLogo from '@/NativeBase/Assets/Images/Logos/sta-ribbon-logo.svg'
import { Project } from '@/Services/modules/projects'
import { useFeatureFlags } from '@/Services/featureFlags'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import { Keyboard } from 'react-native'

/**
 * A screen container that displays the login form.
 * @returns {JSX.Element} React element that renders the login form.
 */
const LoginContainer = (project: Project): JSX.Element => {
  const [userEmail, setUserEmail] = React.useState('')
  const { login, loading } = useAuth()
  const featureFlags = useFeatureFlags()

  const handleNoVerificationLogin = async () => {
    await login(userEmail)
      .then(() => {
        console.log(
          'Login action completed - please note the authenticated state is not persisted, this only enables use of the login screen when login feature flag is enabled.',
        )
        if (project) {
          navigate('ProjectRegisterInterest', { project })
        } else {
          goBack()
        }
      })
      .catch(error => {
        console.error('Failed to login', error)
      })
  }

  return (
    <>
      <View
        maxHeight="10%"
        justifyContent="flex-end"
        alignSelf="flex-end"
        maxWidth="55%"
      >
        <StaThemeLogo />
      </View>

      <View
        paddingX={8}
        alignItems="space-between"
        backgroundColor="transparant"
      >
        <FormControl>
          <View
            minHeight="60%"
            justifyContent="center"
            backgroundColor="transparant"
          >
            <HStack>
              <VStack>
                <Heading fontFamily="title" marginBottom={8}>
                  LOG IN
                </Heading>
                <FormControl.Label
                  _text={{ fontFamily: 'heading' }}
                  _dark={{
                    _text: { color: 'textDarkMode.100' },
                  }}
                >
                  Email address
                </FormControl.Label>

                <Input
                  onChangeText={value => setUserEmail(value)}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  backgroundColor="softGrey"
                  borderWidth={0}
                  borderRadius={10}
                  minWidth="full"
                  _dark={{
                    color: 'text.100',
                  }}
                />
              </VStack>
            </HStack>
          </View>

          <VStack minHeight="30%" justifyContent="flex-end">
            {featureFlags.login ? (
              <Button
                marginY={5}
                disabled={loading}
                onPress={handleNoVerificationLogin}
              >
                {loading ? 'Logging in...' : 'Log in (dev)'}
              </Button>
            ) : (
              <Button
                marginY={5}
                disabled={loading}
                onPress={underDevelopmentAlert}
              >
                {loading ? 'Loading...' : 'Get Code'}
              </Button>
            )}

            <HStack justifyContent="center" marginBottom={8}>
              <Text fontSize="xs">Don't have an account? </Text>
              <Link
                href="https://www.scottishtecharmy.org/volunteer-now"
                _text={{
                  color: 'primary.100',
                  fontSize: 'xs',
                  fontFamily: 'primaryBold',
                  textDecoration: 'none',
                }}
              >
                Sign up
              </Link>
            </HStack>
          </VStack>
        </FormControl>
      </View>
    </>
  )
}

export default LoginContainer
