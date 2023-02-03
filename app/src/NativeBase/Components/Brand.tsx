/**
 * @file STA branding (logo).
 */

import { Center, useColorMode } from 'native-base'
import React from 'react'
import StaLogoWide from '@/NativeBase/Assets/Images/Logos/sta-logo-wide.svg'
import StaLogoWideDarkMode from '@/NativeBase/Assets/Images/Logos/sta-logo-wide-dark-mode.svg'

interface Props {
  width?: number | string
}

const Brand = ({ width }: Props) => {
  const { colorMode } = useColorMode()

  return (
    <Center marginY={2} padding={0} width="100%">
      {colorMode === 'dark' ? (
        <StaLogoWideDarkMode width={width} />
      ) : (
        <StaLogoWide width={width} />
      )}
    </Center>
  )
}

Brand.defaultProps = {
  width: 200,
}

export default Brand
