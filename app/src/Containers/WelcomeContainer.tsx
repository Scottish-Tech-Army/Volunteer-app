import React, {useState, useRef} from 'react'
import { useTheme } from '@/Hooks'
import {View, Dimensions} from 'react-native'
import StaExtraLongLogo from '@/Components/StaExtraLongLogo'
import styled from 'styled-components/native'
import WelcomeButton from '@/Components/Welcome/WelcomeButton'
import WelcomeSlider from '@/Components/Welcome/WelcomeSlider'
import WelcomePaginationDots from '@/Components/Welcome/WelcomePaginationDots'

const windowWidth : number = Dimensions.get('window').width;

const WelcomeContainer = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const { Layout, Gutters, Fonts } = useTheme()
    const slideRef = useRef(null)

    return(
        <View style={[Layout.fill, Layout.colVCenter, {backgroundColor:'#FFFFFF'}]}>
            <StaExtraLongLogo />
            <WelcomeSlider  windowWidth={windowWidth}  setActiveIndex={setActiveIndex} slideRef={slideRef}/>
            <WelcomePaginationDots activeIndex={activeIndex} windowWidth={windowWidth} setActiveIndex={setActiveIndex} slideRef={slideRef}/> 
            <WelcomeButton />
        </View>
    )
}

export default WelcomeContainer