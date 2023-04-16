/**
 * @file Dots that indicate which slide user is on.  Clickable to navigate to next slide
 */

import React, { FC, Ref } from 'react'
import styled from 'styled-components/native'
import { useTheme } from '@/Hooks'

const PaginationContainer = styled.View`
    justifyContent: center;
    alignContent: center;
    margin:22px;
`

const DotsContainer = styled.View`
    height: 16px;
    marginTop: 16px;
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
`

const Dot = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    borderRadius: 24px;
    marginHorizontal: 16px;
    borderColor:#707070;
    borderWidth:2px;
    overflow:hidden;
`
interface PaginationProps {
  activeIndex: number
  setActiveIndex: Function
  slideRef: Ref<null>
  rtlSafeIndex: Function
  slides: Array<Object>
}

const PaginationDots: FC<PaginationProps> = ({
  activeIndex,
  setActiveIndex,
  slideRef,
  rtlSafeIndex,
  slides,
}) => {
  const { Colors } = useTheme()

  const goToSlide = (slideNum: number) => () => {
    setActiveIndex(slideNum)
    slideRef.current?.scrollToOffset({
      offset: rtlSafeIndex(slideNum) * 378,
    })
  }

  return (
    <PaginationContainer>
      <DotsContainer>
        {slides.length > 1 &&
          slides.map((_, i: number) => (
            <Dot
              hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
              key={i}
              style={[
                rtlSafeIndex(i) === activeIndex
                  ? { backgroundColor: Colors.dotActive }
                  : { backgroundColor: Colors.dot },
              ]}
              onPress={goToSlide(i)}
            />
          ))}
      </DotsContainer>
    </PaginationContainer>
  )
}

export default PaginationDots
