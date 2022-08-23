import React, {useState, useRef, FC} from 'react'
import { useTheme } from '@/Hooks'
import {View, Dimensions, I18nManager, Platform} from 'react-native'
import StaExtraLongLogo from '@/Components/StaExtraLongLogo'
import WelcomeButton from '@/Components/Welcome/WelcomeButton'
import WelcomeSlider from '@/Components/Welcome/WelcomeSlider'
import { WelcomeSlides } from '@/Components/Welcome/WelcomeSlides'
import WelcomePaginationDots from '@/Components/Welcome/WelcomePaginationDots'

const windowWidth : number = Dimensions.get('window').width;
const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android';


const WelcomeContainer:FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const {Layout} = useTheme()
    const slideRef = useRef(null)
    const rtlSafeIndex = (i) => (isAndroidRTL ? slides.length - 1 - i : i);
    const slides = WelcomeSlides()

    return(
        <View style={[Layout.fill, Layout.colVCenter, {backgroundColor:'#FFFFFF'}]}>
            <StaExtraLongLogo />
            <WelcomeSlider  windowWidth={windowWidth}  setActiveIndex={setActiveIndex} slideRef={slideRef} slides={slides} rtlSafeIndex={rtlSafeIndex} isAndroidRTL={isAndroidRTL}/>
            <WelcomePaginationDots activeIndex={activeIndex} windowWidth={windowWidth} setActiveIndex={setActiveIndex} slideRef={slideRef} slides={slides} rtlSafeIndex={rtlSafeIndex} /> 
            <WelcomeButton />
        </View>
    )
}

export default WelcomeContainer