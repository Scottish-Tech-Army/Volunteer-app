import React from 'react'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import {View, Text, Image, Button} from 'react-native'
import Logo from '@/Assets/Images/LongLogo.png'
import styled from 'styled-components/native'
import GetStartedButton from '@/Components/Welcome/GetStartedButton'


const StaHeaderImage = styled.Image`
  width: 90%;
  height: 120px;
  margin-left: 16px;
  margin-top: 10px;
`



const WelcomeContainer = () => {
    const { Layout, Gutters, Fonts } = useTheme()
    const { t } = useTranslation()

    return(
        <View style={[Layout.fill, Layout.colVCenter]}>
            <StaHeaderImage source={Logo} />
            <GetStartedButton />
        </View>
    )
}

export default WelcomeContainer