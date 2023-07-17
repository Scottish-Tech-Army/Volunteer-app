/**
 * @file the MyExperience screen for the STA Volunteer App
 */
import {
  Heading,
  VStack,
  HStack,
  Checkbox,
  ScrollView,
  Flex,
  Button,
  View,
} from 'native-base'
import StaRibbon from '../Components/StaRibbon'
import StaThemeLogo from '@/NativeBase/Assets/Images/Logos/sta-ribbon-logo.svg'
import FreeSearchBar from '../Components/FreeSearchBar'
import React from 'react'
import { RoleGroup, roleGroups } from '@/Services/modules/projects/roleGroups'

const MyExperienceContainer = () => {
  const [skillsValue, setSkillsValue] = React.useState<string[]>([])
  const [searchTxt, setSearchTxt] = React.useState<string>('') // search text

  /**
   * Filter the role groups based on the search text entered by the user
   */
  const filteredSkills = roleGroups.filter((roleGroup: RoleGroup) => {
    return roleGroup.groupName.toLowerCase().includes(searchTxt.toLowerCase())
  })

  return (
    <>
      <HStack mt={-10} mb={12} alignItems={'flex-end'}>
        <Heading size="md" fontWeight="bold" marginRight={-5} mb={-5}>
          My Experience
        </Heading>
        <Flex flex={1} alignItems={'flex-end'}>
          <StaThemeLogo />
        </Flex>
      </HStack>
      <StaRibbon />
      <View margin={'4'} pt={2}>
        <FreeSearchBar
          marginTop="2"
          handleSubmit={() => {
            null
          }}
          handleChangeText={(text: string) => {
            setSearchTxt(text)
          }}
        />
      </View>
      <ScrollView>
        <VStack pb="1" mt={-3} margin="2">
          <Checkbox.Group
            ml="2"
            onChange={(value: string[]) => {
              setSkillsValue(value)
            }}
            value={skillsValue}
            accessibilityLabel="choose skills"
          >
            {filteredSkills.map((roleGroup: RoleGroup, index: number) => (
              <Checkbox
                borderColor="inputBorder.100"
                _dark={{
                  borderColor: 'white',
                }}
                value={roleGroup.groupName}
                key={`${roleGroup.groupName} - ${index}`}
              >
                {roleGroup.groupName}
              </Checkbox>
            ))}
          </Checkbox.Group>
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
