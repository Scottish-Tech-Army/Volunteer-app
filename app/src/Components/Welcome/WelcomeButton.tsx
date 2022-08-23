import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import styled from 'styled-components/native'
import { goBack, navigateAndSimpleReset } from '@/Navigators/utils'

const WelcomeButton = () => {

    const WelcomeButton = styled.TouchableOpacity`
        backgroundColor:#EC6730;
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
        color:white;
        lineHeight:24px;
        fontSize:18px;
        fontWeight:400;
    `

    const handlePress = () => {
        navigateAndSimpleReset('Main')
    }

    return (
        <WelcomeButton onPress={handlePress}>
            <GetStartedText>Get Started</GetStartedText>
        </WelcomeButton>
    )
}

export default WelcomeButton