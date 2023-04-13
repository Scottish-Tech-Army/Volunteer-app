import React from 'react'
import { View, Image } from 'react-native'
import styled from 'styled-components/native'

import { useTheme } from '@/Hooks'

const StaHeaderLogoImage = styled.Image` 
 
  
`

const HeaderView = styled.View`
  height:58px;
  width:85%;
  marginVertical:5%;
`

const StaExtraLongLogo = () => {
  const { Images, Layout } = useTheme()
  return (
    <HeaderView>
      <StaHeaderLogoImage
        style={Layout.fullSize}
        resizeMode={'contain'}
        source={Images.extraLongLogo}
      />
    </HeaderView>
  )
}

export default StaExtraLongLogo
