/**
 * @file the MySkills form screen
 */
import { Heading, VStack, Checkbox, ScrollView, Flex } from 'native-base'
import StaRibbon from '../Components/StaRibbon'
import StaThemeLogo from '@/NativeBase/Assets/Images/Logos/StaThemeLogo.svg'
import FreeSearchBar from '../Components/FreeSearchBar'
import React from 'react'
import {
  RoleGroup,
  RoleGroupName,
  roleGroups,
} from '@/Services/modules/projects/roleGroups'
const MySkillsContainer = () => {
  const [skillsValue, setSkillsValue] = React.useState<string[]>([])

  return (
    <>
      <Flex
        direction="row"
        alignItems={'flex-end'}
        marginLeft={-12}
        marginTop={-12}
        marginBottom={3}
      >
        <Heading size="md" fontWeight="bold" marginLeft={12} marginBottom={4}>
          My Experience
        </Heading>
        <StaThemeLogo />
      </Flex>
      <StaRibbon />
      <ScrollView>
        <VStack
          paddingTop="2"
          paddingBottom="1"
          margin="1"
          space="2"
          backgroundColor="bg.100"
          _dark={{ backgroundColor: 'bgDarkMode.100' }}
        />

        <FreeSearchBar
          marginBottom="1"
          marginTop="4"
          handleSubmit={() => {
            console.log('submit')
          }}
          handleChangeText={(text: string) => {
            setSkillsValue((skills: string[]) => {
              return [...skills, text]
            })
          }}
        />
        <VStack
          paddingTop="4"
          paddingBottom="2"
          margin="2"
          space="4"
          backgroundColor="bg.100"
          _dark={{ backgroundColor: 'bgDarkMode.100' }}
        >
          <Checkbox.Group
            marginLeft="2"
            onChange={setSkillsValue}
            value={skillsValue}
            accessibilityLabel="choose skills"
          >
            {roleGroups.map((roleGroup: RoleGroup) => (
              <Checkbox
                borderColor="inputBorder.100"
                colorScheme="primary"
                value={roleGroup.groupName}
                key={roleGroup.groupName}
              >
                {roleGroup.groupName}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </VStack>
      </ScrollView>
    </>
  )
}

export default MySkillsContainer
