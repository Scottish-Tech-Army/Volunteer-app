/**
 * @file Profile screen showing user's personal profile.
 */

import { Heading, VStack, Center } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
/**
 * A screen container that displays the user's profile.
 * @returns {JSX.Element} React element that renders the ProfileContainer component.
 */

const ProfileContainer = () => {
  const navigation = useNavigation<any>()
  return (
    <VStack
      paddingTop="4"
      paddingBottom="2"
      alignItems="center"
      space="4"
      backgroundColor="secondaryGrey.60"
      _dark={{ backgroundColor: 'bgDarkMode.100' }}
    >
      <Center
        backgroundColor="bg.100"
        _dark={{ backgroundColor: 'bgDarkMode.100' }}
        width="100%"
      >
        {/* onPress should navigate to MyExperienceContainer screen */}
        <Pressable
          onPress={() => {
            navigation.navigate('MyExperience')
          }}
        >
          <Heading size="sm" fontStyle="normal" fontWeight="extrabold">
            My Profile
          </Heading>
        </Pressable>
      </Center>
    </VStack>
  )
}

export default ProfileContainer
