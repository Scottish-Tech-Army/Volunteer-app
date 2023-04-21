import { useColorMode } from 'native-base'
import React from 'react'
import styled from 'styled-components/native'
import { useTheme } from '@/Hooks'

const StaHeaderLogoImage = styled.Image``

const HeaderView = styled.View`
  height:58px;
  width:85%;
  marginVertical:5%;
`

const StaExtraLongLogo = () => {
  const { colorMode } = useColorMode()
  const { Images, Layout } = useTheme()

  return (
    <HeaderView>
      <StaHeaderLogoImage
        style={Layout.fullSize}
        resizeMode={'contain'}
        source={
          colorMode === 'dark' ? Images.extraLongLogoDark : Images.extraLongLogo
        }
      />
    </HeaderView>
  )
}

export default StaExtraLongLogo
