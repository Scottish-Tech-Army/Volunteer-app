import React, {useState, useRef, FC} from 'react'
import { useTheme } from '@/Hooks'
import {View, Dimensions, I18nManager, Platform, SafeAreaView} from 'react-native'
import StaExtraLongLogo from '@/Components/StaExtraLongLogo'
import WelcomeButton from '@/Components/Welcome/WelcomeButton'
import WelcomeSlider from '@/Components/Welcome/WelcomeSlider'
import { WelcomeSlides } from '@/Components/Welcome/WelcomeSlides'
import WelcomePaginationDots from '@/Components/Welcome/WelcomePaginationDots'
import styled from 'styled-components/native'

const windowWidth : number = Dimensions.get('window').width;
const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android';

const PageBottom = styled.View`
    flex:0.25;
`


const WelcomeContainer = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const {Layout} = useTheme()
    const slideRef = useRef(null)
    const rtlSafeIndex = (i:number) => (isAndroidRTL ? slides.length - 1 - i : i);
    const slides = WelcomeSlides()

    return(
        <SafeAreaView style={[Layout.fill, Layout.colVCenter, {backgroundColor:'#FFFFFF'}]}>
            <StaExtraLongLogo />
            <WelcomeSlider  windowWidth={windowWidth}  setActiveIndex={setActiveIndex} slideRef={slideRef} slides={slides} isAndroidRTL={isAndroidRTL}/>
            <PageBottom>
                <WelcomePaginationDots activeIndex={activeIndex} setActiveIndex={setActiveIndex} slideRef={slideRef} slides={slides} rtlSafeIndex={rtlSafeIndex} /> 
                <WelcomeButton />
            </PageBottom>
        </SafeAreaView>
    )
}

export default WelcomeContainer