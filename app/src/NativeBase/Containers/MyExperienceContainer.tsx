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
      <Flex alignItems={'flex-end'} marginY={-12}>
        <HStack marginBottom={12} alignItems={'flex-end'}>
          <Heading size="md" fontWeight="bold" marginRight={-5} marginY={2}>
            My Experience
          </Heading>
          <StaThemeLogo />
        </HStack>
      </Flex>
      <StaRibbon />
      <ScrollView>
        <FreeSearchBar
          marginBottom="1"
          marginTop="4"
          handleSubmit={() => {
            null
          }}
          handleChangeText={(text: string) => {
            setSearchTxt(text)
          }}
        />
        <VStack paddingTop="4" paddingBottom="2" margin="2" space="4">
          <Checkbox.Group
            _dark={
              {
                // backgroundColor: 'bgDarkMode.100',
              }
            }
            marginLeft="2"
            onChange={(value: string[]) => {
              setSkillsValue(value)
            }}
            value={skillsValue}
            accessibilityLabel="choose skills"
          >
            {filteredSkills.map((roleGroup: RoleGroup, index: number) => (
              <Checkbox
                borderColor="inputBorder.100"
                colorScheme="primary"
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
            variant="outline"
            borderColor="purple.100"
            _text={{
              color: 'purple.100',
            }}
          >
            Next
          </Button>
          <Button
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
