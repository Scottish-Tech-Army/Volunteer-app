//'Get Started' button allows user to go to main part of app from any slide

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components/native'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'

const WelcomeButton = () => {
  const { Colors, Fonts } = useTheme()
  const dispatch = useDispatch()
  const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
    dispatch(changeWelcome({ welcome, show }))
  }

  const WelcomeButton = styled.TouchableOpacity`
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
    <WelcomeButton
      style={{ backgroundColor: Colors.welcomeButton }}
      onPress={handlePress}
    >
      <GetStartedText style={[Fonts.poppins]}>Get Started</GetStartedText>
    </WelcomeButton>
  )
}

export default WelcomeButton
