/**
 * @file Profile screen showing user's personal profile.
 */

import {
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import {
  Box,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import React from 'react'
import ChoicesList, {
  ChoicesListChoice,
  ChoicesListColour,
  ChoicesListFontStyle,
} from '../Components/ChoicesList'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'

// Define the menu items to show in the profile menu
const profileMenuItems: string[] = [
  'My Projects',
  'My Experience',
  'Volunteer Vibes',
  'Notifications & Settings',
]

// Define the colour and font style for the profile menu
const colourChoice = ChoicesListColour.purple
const fontStyleChoice = ChoicesListFontStyle.smallSemiBold

const profileMenuChoices = profileMenuItems.map(
  (item: string) =>
    ({
      text: item,
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
      <ScrollView>
        <VStack alignItems="center" fontSize="xs">
          <Heading fontFamily="title" size="lg">
            My Profile
          </Heading>
          <HStack marginTop={4}>
            <Box
              height="93px"
              width="93px"
              borderColor="darkGrey.100"
              _dark={{ borderColor: 'secondaryGrey.40' }}
              borderWidth="4px"
              borderRadius="full"
              marginLeft="24px"
            />
            <Icon
              as={MaterialIcons}
              color="darkGrey.100"
              _dark={{ color: 'secondaryGrey.40' }}
              name="lock"
              size={6}
            />
          </HStack>
          <HStack>
            <Heading fontSize="md" fontWeight="700" paddingLeft="24px">
              Full Name
            </Heading>
            <Text fontSize="xs" paddingLeft="-2">
              (She)
            </Text>
            <Box
              width="24px"
              height="24px"
              marginTop="-2"
              borderBottomWidth={2}
              borderBottomColor="darkGrey.100"
              _dark={{ borderBottomColor: 'secondaryGrey.40' }}
            >
              <Icon
                as={MaterialCommunityIcons}
                color="darkGrey.100"
                _dark={{ color: 'secondaryGrey.40' }}
                name="pencil-outline"
                size={6}
              />
            </Box>
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
                _dark={{ color: 'secondaryGrey.40' }}
                name="award"
                size={6}
                marginTop={2}
              />
              <Text fontSize="sm">Completed projects</Text>
            </HStack>
            <HStack>
              <Icon
                as={AntDesign}
                color="darkGrey.100"
                _dark={{ color: 'secondaryGrey.40' }}
                name="rocket1"
                size={6}
              />
              <Text fontSize="sm" paddingTop={-2}>
                Ongoing projects
              </Text>
            </HStack>
          </Box>
        </VStack>
        <VStack textAlign="left" marginY={4}>
          <ChoicesList
            choices={profileMenuChoices}
            colour={colourChoice}
            style={fontStyleChoice}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}

export default ProfileContainer
