import React from 'react'
import styled from 'styled-components/native'
import StaLogoUrl from '@/Assets/Images/RoundAvatar.png'

const StaLogoImage = styled.Image`
  width: 81px;
  height: 81px;
  margin-left: 16px;
  margin-top: 10px;
`

const StaLogo = () => {
  return <StaLogoImage source={StaLogoUrl} />
}

export default StaLogo
