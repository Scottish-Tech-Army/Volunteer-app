/**
 * @file the MyExperience screen for the STA Volunteer App
 */
import {
  Heading,
  VStack,
  HStack,
  ScrollView,
  Flex,
  Button,
  View,
  Text,
} from 'native-base'
import ProgressBar from '../Components/ProgressBar'
import StaThemeLogo from '@/NativeBase/Assets/Images/Logos/sta-ribbon-logo.svg'
import FreeSearchBar from '../Components/FreeSearchBar'
import React from 'react'
import Checkbox from '../Components/Checkbox'
import { RoleGroup, roleGroups } from '@/Services/modules/projects/roleGroups'

const MyExperienceContainer = () => {
  const [skillsValue, setSkillsValue] = React.useState<string[]>([])
  const [searchTxt, setSearchTxt] = React.useState<string>('') // search text
  /**
   * Filter the role groups based on the search text entered by the user
   */
  const filteredSkills = roleGroups.filter((roleGroup: RoleGroup) =>
    roleGroup.groupName.toLowerCase().includes(searchTxt.toLowerCase()),
  )

  return (
    <>
      <HStack mt={-10} mb={5} alignItems={'flex-end'}>
        <Heading
          size="md"
          letterSpacing={3}
          fontWeight={400}
          fontFamily="BebasNeue-Regular"
          adjustsFontSizeToFit
        >
          My Experience
        </Heading>
        <Flex flex={1} alignItems={'flex-end'} mt={-10}>
          <StaThemeLogo width={'110%'} />
        </Flex>
      </HStack>
      <ProgressBar bgColor="purple.20" />
      <View margin={'4'}>
        <FreeSearchBar
          marginTop="2"
          marginBottom="-2"
          handleSubmit={() => null}
          handleChangeText={(text: string) => setSearchTxt(text)}
        />
      </View>
      <ScrollView>
        <VStack mt={-2} margin="2">
          {filteredSkills.map((roleGroup: RoleGroup, index: number) => (
            <View
              key={`${roleGroup.groupName} - ${index}`}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <Checkbox
                onChange={() => {
                  if (skillsValue.includes(roleGroup.groupName)) {
                    setSkillsValue(
                      skillsValue.filter(
                        skill => skill !== roleGroup.groupName, // remove the skill from the array
                      ),
                    )
                  } else {
                    setSkillsValue([...skillsValue, roleGroup.groupName]) // add the skill to the array
                  }
                }}
                checked={skillsValue.includes(roleGroup.groupName)}
              />
              <Text
                ml="4"
                marginY="0.5"
                onPress={() => {
                  if (skillsValue.includes(roleGroup.groupName)) {
                    setSkillsValue(
                      skillsValue.filter(
                        skill => skill !== roleGroup.groupName,
                      ),
                    )
                  } else {
                    setSkillsValue([...skillsValue, roleGroup.groupName])
                  }
                }}
              >
                {roleGroup.groupName}
              </Text>
            </View>
          ))}
        </VStack>
        <VStack marginX={6}>
          <Button
            borderWidth={2}
            backgroundColor="bg.100"
            borderColor="purple.100"
            _text={{
              color: 'purple.100',
            }}
          >
            Next
          </Button>
          <Button
            borderWidth={2}
            borderColor={'bg.100'}
            backgroundColor="bg.100"
            _dark={{
              backgroundColor: 'bgDarkMode.100',
              _text: { color: 'white' },
              borderColor: 'white',
            }}
            _text={{
              color: 'black',
            }}
          >
            Skip
          </Button>
        </VStack>
      </ScrollView>
    </>
  )
}

export default MyExperienceContainer
