/**
 * @file Profile screen showing user's personal profile.
 */

import { Heading, VStack, Center } from 'native-base'
import React from 'react'

/**
 * A screen container that displays the user's profile.
 * @returns {JSX.Element} React element that renders the ProfileContainer component.
 */

const ProfileContainer = () => {
  return (
    <VStack
      paddingTop="4"
      paddingBottom="2"
      alignItems="center"
      space="4"
      backgroundColor="secondaryGrey.60"
      _dark={{ backgroundColor: 'bg.100' }}
    >
      <Center
        backgroundColor="bg.100"
        _dark={{ backgroundColor: 'bgDarkMode.100' }}
        width="100%"
      >
        <Heading size="sm">My Profile</Heading>
      </Center>
    </VStack>
  )
}

export default ProfileContainer
