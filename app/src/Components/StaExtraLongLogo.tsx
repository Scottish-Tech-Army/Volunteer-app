import React from 'react'
import styled from 'styled-components/native'
import StaHeaderLogo from '@/Assets/Images/ExtraLongLogo.png'

const StaHeaderLogoImage = styled.Image`
  width: 339px;
  height: 58px;
  margin-top: 22px;
  margin-bottom: 22px;
`

const StaExtraLongLogo = () => {
    return <StaHeaderLogoImage source={StaHeaderLogo} />
  }

  export default StaExtraLongLogo