/**
 * @file 'Get Started' button allows user to go to main part of app from any slide
 */
import React from 'react'
import styled from 'styled-components/native'
import { Button, VStack } from 'native-base'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'

/** The welcome 'Get started' button is displayed in the welcome splash screen, regardless of which pagination slide it is on. */
const WelcomeButton = () => {
  const { Colors, Fonts } = useTheme()
  const dispatch = useDispatch()
  const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
    dispatch(changeWelcome({ welcome, show }))
  }

  const WelcomeButtonContainer = styled.TouchableOpacity`
        width:244px;
        height:42px;
        borderRadius:8px;
        display:flex;
        alignItems:center;
        justifyContent:center;
        elevation: 4;
        marginTop:20px;
    `

  const GetStartedText = styled.Text`
        color:#ffffff;
        lineHeight:24px;
        fontSize:18px;
        fontWeight:400;
    `

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
