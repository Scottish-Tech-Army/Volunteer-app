import React from 'react'
import styled from 'styled-components/native'
import StaHeaderLogo from '@/Assets/Images/ExtraLongLogo.png'

const StaHeaderLogoImage = styled.Image`
  margin-top: 5%;
  margin-bottom: 5%;
`

const StaExtraLongLogo = () => {
    return <StaHeaderLogoImage source={StaHeaderLogo} />
  }

  export default StaExtraLongLogo