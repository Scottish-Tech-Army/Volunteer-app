/**
 * @file Loading screen showing animated NativeBase Skeleton components to be shown whilst a list is loading.
 */

import { Skeleton, VStack } from 'native-base'
import React from 'react'

const SkeletonLoading = () => {
  return (
    <>
      <VStack
        w="100%"
        borderWidth="1"
        space={4}
        overflow="hidden"
        rounded="md"
        py="4"
        px="2"
        _dark={{
          borderColor: 'coolGray.600',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton />
        <Skeleton.Text w="75%" lines={2} />
        <Skeleton.Text lines={4} />
      </VStack>
    </>
  )
}

export default SkeletonLoading
