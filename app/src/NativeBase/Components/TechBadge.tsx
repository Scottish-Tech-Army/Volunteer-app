/**
 * @file NativeBase Badge component used in projects
 * @url  https://docs.nativebase.io/next/badge
 */

import React from 'react'
import { Badge, HStack } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'

// Didn't use React.FC after reading:
// https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript
type TechBadgeProps = {
  caption: string
  color: ColorType
}
interface TechBadgePropsArray {
  badges: TechBadgeProps[]
}

const TechBadge = ({ badges }: TechBadgePropsArray) => {
  if (typeof badges !== 'undefined') {
    return (
      <HStack paddingLeft="2" space="2" size="sm">
        {badges.map(({ caption, color }: TechBadgeProps, index) => (
          <Badge
            key={index}
            size="sm"
            alignSelf="flex-start"
            colorScheme={color}
            variant="outline"
          >
            {caption}
          </Badge>
        ))}
      </HStack>
    )
  }
  return null
}

export default TechBadge
