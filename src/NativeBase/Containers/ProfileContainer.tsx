/**
 * @file Profile screen showing user's personal profile.
 */

import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  Box,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import React from 'react'

import ChoicesList, {
  ChoicesListColour,
  ChoicesListFontStyle,
} from '../Components/ChoicesList'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'
import { navigate } from '@/Navigators/utils'
import { useAuth } from '@/Services/auth'

// Define the colour and font style for the profile menu
const colourChoice = ChoicesListColour.purple
const fontStyleChoice = ChoicesListFontStyle.smallSemiBold

const profileMenuChoices: { text: string; onPress: any }[] = [
  {
    text: 'My Projects',
    onPress: underDevelopmentAlert,
  },
  {
    text: 'My Experience',
    onPress: () =>
      navigate('MyExperience', {
        skills: undefined,
      }),
  },
  {
    text: 'Volunteer Vibes',
    onPress: underDevelopmentAlert,
  },
  {
    text: 'Notifications & Settings',
    onPress: underDevelopmentAlert,
  },
]

/**
 * A screen container that displays the user's profile.
 * @returns {JSX.Element} React element that renders the ProfileContainer component.
 */

const ProfileContainer = () => {
  const { authenticated } = useAuth()
  return (
    <ScrollView>
      <VStack alignItems="center" marginBottom={7}>
        <Heading fontFamily="title" size="lg">
          My Profile
        </Heading>
        {!authenticated && <Text>Placeholder for login</Text>}
        <Box
          height="93px"
          width="93px"
          borderColor="darkGrey.100"
          _dark={{ borderColor: 'secondaryGrey.40' }}
          borderWidth="4px"
          borderRadius="full"
          marginTop={8}
          marginBottom={2}
        />

        <HStack space={2}>
          <Heading fontSize="md" fontFamily="heading" paddingLeft="24px">
            Full Name
          </Heading>
          <Text fontSize="xs">(She)</Text>
          <Pressable
            width="24px"
            height="24px"
            marginTop={-4}
            borderBottomWidth={2}
            borderBottomColor="darkGrey.100"
            _dark={{ borderBottomColor: 'secondaryGrey.40' }}
            onPress={underDevelopmentAlert}
          >
            <Icon as={MaterialCommunityIcons} name="pencil-outline" size={6} />
          </Pressable>
        </HStack>

        <Text fontSize="xs">P-R-O-N-O-U-N-C-I-A-T-I-O-N</Text>

        <VStack alignItems="center" space={4} marginY={4}>
          <Text fontSize="xs">Role</Text>
          <Text fontSize="xs">Status</Text>
          <Heading fontSize="md" fontFamily="heading">
            My volunteering
          </Heading>
        </VStack>

        <Box
          bg="secondaryGrey.60"
          _dark={{ bg: 'bgDarkMode.200' }}
          shadow="4"
          paddingX="4"
          paddingY="2"
          width="95%"
        >
          <HStack space={2} marginBottom={2}>
            <Icon as={Feather} name="award" size={6} />
            <Text fontSize="sm">Completed projects</Text>
          </HStack>

          <HStack space={2}>
            <Icon as={AntDesign} name="rocket1" size={6} />
            <Text fontSize="sm">Ongoing projects</Text>
          </HStack>
        </Box>
      </VStack>

      <ChoicesList
        choices={profileMenuChoices}
        colour={colourChoice}
        style={fontStyleChoice}
      />
    </ScrollView>
  )
}

export default ProfileContainer
