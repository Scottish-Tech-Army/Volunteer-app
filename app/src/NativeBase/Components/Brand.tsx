import { Center } from 'native-base'
import React from 'react'
import StaLogoWide from '@/NativeBase/Assets/Images/Logos/sta-logo-wide.svg'

interface Props {
  width?: number | string
}

const Brand = ({ width }: Props) => (
  <Center marginY={2} padding={0} width="100%">
    <StaLogoWide width={width} />
  </Center>
)

Brand.defaultProps = {
  width: 200,
}

export default Brand
