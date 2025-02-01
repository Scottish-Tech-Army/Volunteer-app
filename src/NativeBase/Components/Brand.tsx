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

/**
 * Component showing STA branding (logo).
 *
 * @param {Props} props The component props
 * @returns {React.ReactElement} Component
 */
const Brand = ({ width = 200 }: Props) => {
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

export default Brand
