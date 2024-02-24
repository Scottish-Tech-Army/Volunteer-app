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

interface LoginContainerProps {
  sourceScreen?: string
  project?: Project
}

/**
 * A screen container that displays the login form.
 * @returns {JSX.Element} React element that renders the login form.
 */
const LoginContainer = ({
  sourceScreen,
  project,
}: LoginContainerProps): JSX.Element => {
  const [userEmail, setUserEmail] = React.useState('')
  const { login, loading } = useAuth()
  const featureFlags = useFeatureFlags()

  const handleNoVerificationLogin = async () => {
    await login(userEmail)
      .then(() => {
        console.log(
          'Login action completed - please note the authenticated state is not persisted, this only enables use of the login screen when login feature flag is enabled.',
        )
        if (project && sourceScreen) {
          navigate('ProjectRegisterInterest', { project })
        } else {
          goBack()
        }
        console.log('sourceScreen', sourceScreen)
      })
      .catch(error => {
        console.error('Failed to login', error)
      })
  }

  return (
    <>
      <View
        maxHeight="18%"
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
            minHeight="70%"
            justifyContent="center"
            backgroundColor="transparant"
          >
            <HStack>
              <VStack>
                <Heading fontFamily="title" marginBottom={8}>
                  LOG IN
                </Heading>
                <FormControl.Label _text={{ fontFamily: 'heading' }}>
                  Email address
                </FormControl.Label>
                <Input
                  onChangeText={value => setUserEmail(value)}
                  backgroundColor="softGrey"
                  borderWidth={0}
                  borderRadius={10}
                  minWidth="full"
                />
              </VStack>
            </HStack>
          </View>

          <VStack minHeight="20%" justifyContent="flex-end">
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
