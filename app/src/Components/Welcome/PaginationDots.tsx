import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, View, TouchableOpacity, I18nManager, Platform } from "react-native";
import { MySlides } from './Slides'
const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android';

const PaginationDots = ({activeIndex, setActiveIndex, windowWidth, slideRef}) => {
    const rtlSafeIndex = (i) => (isAndroidRTL ? slides.length - 1 - i : i);
    const slides = MySlides()
    

    const goToSlide = (slideNum) => () => {
        setActiveIndex(slideNum)
        slideRef.current?.scrollToOffset({
            offset: rtlSafeIndex(slideNum) * windowWidth,
        });
        };

    return (
        <View style={styles.paginationContainer}>
        <SafeAreaView>
            <View style={styles.paginationDots}>
            {slides.length > 1 &&
                slides.map((_, i) => (
                <TouchableOpacity
                    hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
                    key={i}
                    style={[
                    styles.dot,
                    rtlSafeIndex(i) === activeIndex ? styles.activeDotStyle : styles.dotStyle,
                    ]}
                    onPress={goToSlide(i)}
                />
                ))}
            </View>
        </SafeAreaView>
        </View>
    );
                }

    const styles = StyleSheet.create({
       
        paginationContainer: {
            flex: 0.01,
            justifyContent: 'center',
            alignContent: 'center',
        },
        paginationDots: {
            height: 16,
            margin: 16,
            flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dot: {
            width: 10,
            height: 10,
            borderRadius: 6,
            marginHorizontal: 16,
          },
          activeDotStyle: {
            backgroundColor: 'rgba(255, 255, 255, .9)',
          },
          dotStyle: {
            backgroundColor: 'rgba(0, 0, 0, .2)',
          },
    })

    export default PaginationDots
   