/**
 * @file Profile screen showing user's personal profile.
 */

import { AntDesign, Feather } from '@expo/vector-icons'
import {
  Heading,
  VStack,
  Center,
  Icon,
  HStack,
  Box,
  Text,
  ScrollView,
} from 'native-base'
import React from 'react'
import ChoicesList, { ChoicesListChoice } from '../Components/ChoicesList'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'

const profileMenuItems: string[] = [
  'My Projects',
  'My Experience',
  'Volunteer Vibes',
  'Notifications & Settings',
]

const profileMenuChoices = profileMenuItems.map(
  (item: string) =>
    ({
      text: item,
      color: 'purple.100',
      darkModeColor: 'purple.40',
      fontSize: 'sm',
      fontWeight: '600',
      onPress: underDevelopmentAlert,
    } as ChoicesListChoice),
)

/**
 * A screen container that displays the user's profile.
 * @returns {JSX.Element} React element that renders the ProfileContainer component.
 */

const ProfileContainer = () => {
  return (
    <VStack
      padding={2}
      backgroundColor="bg.100"
      _dark={{ backgroundColor: 'bgDarkMode.100' }}
    >
      <Center>
        <Heading fontFamily="title" size="lg">
          My Profile
        </Heading>
        <Box
          marginTop={6}
          height="93px"
          width="90px"
          borderColor="darkGrey.100"
          borderWidth="4px"
          borderRadius="full"
        />
        <HStack>
          <Heading fontSize="md" fontWeight="700">
            Full Name
          </Heading>
          <Text fontSize="xs" paddingLeft="-2">
            (She)
          </Text>
        </HStack>
        <Text fontSize="xs" marginTop="-4">
          P-R-O-N-O-U-N-C-I-A-T-I-O-N
        </Text>
        <Text fontSize="xs" paddingTop={-2}>
          Role
        </Text>
        <Text fontSize="xs" paddingTop={-2}>
          Status
        </Text>
        <Heading fontSize="md" fontWeight="700" paddingTop={-2}>
          My volunteering
        </Heading>
        <Box
          bg="secondaryGrey.60"
          _dark={{ bg: 'bgDarkMode.200' }}
          paddingLeft={4}
          shadow="9"
          marginTop={2}
          padding={2}
          width="92%"
        >
          <HStack>
            <Icon
              as={Feather}
              color="darkGrey.100"
              name="award"
              size={6}
              marginTop={2}
            />
            <Text fontSize="sm">Completed projects</Text>
          </HStack>
          <HStack>
            <Icon as={AntDesign} color="darkGrey.100" name="rocket1" size={6} />
            <Text fontSize="sm" paddingTop={-2}>
              Ongoing projects
            </Text>
          </HStack>
        </Box>
      </Center>
      <ScrollView marginTop={2}>
        <ChoicesList choices={profileMenuChoices} />
      </ScrollView>
    </VStack>
  )
}

export default ProfileContainer
