import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, View, TouchableOpacity, } from "react-native";

const WelcomePaginationDots = ({activeIndex, setActiveIndex, windowWidth, slideRef, slides, rtlSafeIndex, isAndroidRtl}) => {
    

    const goToSlide = (slideNum:number) => () => {
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
            flex: 0.05,
            justifyContent: 'center',
            alignContent: 'center',
        },
        paginationDots: {
            height: 24,
            margin: 16,
            flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dot: {
            width: 24,
            height: 24,
            borderRadius: 24,
            marginHorizontal: 16,
            borderColor:'#707070',
            borderWidth:2,
            overflow:'hidden',
            
          },
          activeDotStyle: {
            backgroundColor: '#707070',
          },
          dotStyle: {
            backgroundColor: '#ffffff',
          },
    })

    export default WelcomePaginationDots
   