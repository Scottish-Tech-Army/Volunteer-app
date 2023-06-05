/**
 * @file 'Get Started' button allows user to go to main part of app from any slide
 */
import React from 'react'
import { Button, VStack } from 'native-base'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useDispatch } from 'react-redux'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'

/** The welcome 'Get started' button is displayed in the welcome splash screen, regardless of which pagination slide it is on. */
const WelcomeButton = () => {
  const dispatch = useDispatch()
  const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
    dispatch(changeWelcome({ welcome, show }))
  }

  const handlePress = () => {
    onChangeSplash({ show: false })
    navigateAndSimpleReset('Main')
  }

  return (
    <VStack marginTop="6" paddingX="4" width="100%">
      <Button onPress={handlePress}>Get Started</Button>
    </VStack>
  )
}

export default WelcomeButton
