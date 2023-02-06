/**
 * @file STA branding (logo).
 */

import { Center, useColorModeValue } from 'native-base'
import React from 'react'
import StaLogoWide from '@/NativeBase/Assets/Images/Logos/sta-logo-wide.svg'
import StaLogoWideDarkMode from '@/NativeBase/Assets/Images/Logos/sta-logo-wide-dark-mode.svg'

interface Props {
  width?: number | string
}

const Brand = ({ width }: Props) => {
  const logo = useColorModeValue(
    <StaLogoWide width={width} />,
    <StaLogoWideDarkMode width={width} />,
  )

  return (
    <Center marginY={2} padding={0} width="100%">
      {logo}
    </Center>
  )
}

Brand.defaultProps = {
  width: 200,
}

export default Brand
