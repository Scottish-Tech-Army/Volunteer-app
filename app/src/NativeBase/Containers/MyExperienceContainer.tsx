/**
 * @file the MyExperience screen for the STA Volunteer App
 */
import {
  Heading,
  VStack,
  HStack,
  ScrollView,
  Flex,
  View,
  Text,
  Button,
} from 'native-base'
import ProfileButtons from '../Components/ProfileButtons'
import ProgressBar from '../Components/ProgressBar'
import StaThemeLogo from '@/NativeBase/Assets/Images/Logos/sta-ribbon-logo.svg'
import FreeSearchBar from '../Components/FreeSearchBar'
import React from 'react'
import Checkbox from '../Components/Checkbox'
import { RoleGroup, roleGroups } from '@/Services/modules/projects/roleGroups'
import {
  getProgressBarColors,
  nextScreen,
} from '../../Utils/ProgressBarColours'

const MyExperienceContainer = () => {
  const [skillsValue, setSkillsValue] = React.useState<string[]>([]) // skills selected by the user
  const [searchTxt, setSearchTxt] = React.useState<string>('') // search text
  const [currentBox, setCurrentBox] = React.useState<number>(1) // current box in the progress bar
  const [nextButton, setNextButton] = React.useState<boolean>(false) // next screen button
  /**
   * Filter the role groups based on the search text entered by the user
   */
  const filteredSkills = roleGroups.filter((roleGroup: RoleGroup) =>
    roleGroup.groupName.toLowerCase().includes(searchTxt.toLowerCase()),
  )

  //  get the progress bar colours for the current box in the progress bar
  const progressBarColourObject = Object.values(
    getProgressBarColors(currentBox, 'purple.20'),
  )

  const handleButtonPress = () => {
    setNextButton(true)
    nextScreen(currentBox, setCurrentBox)
  }

  return (
    <>
      <HStack mt={-10} mb={5} alignItems={'flex-end'}>
        <Heading size="md" fontFamily="title" adjustsFontSizeToFit>
          My Experience
        </Heading>
        <Flex flex={1} mt={-5} alignItems={'flex-end'}>
          <StaThemeLogo />
        </Flex>
      </HStack>
      <ProgressBar colours={progressBarColourObject} />
      <View margin={4}>
        <FreeSearchBar
          marginTop="2"
          marginBottom="-2"
          handleSubmit={() => null}
          handleChangeText={(text: string) => setSearchTxt(text)}
        />
      </View>
      <ScrollView>
        <VStack mt={-2} margin={5}>
          {filteredSkills.map((roleGroup: RoleGroup, index: number) => (
            <View
              key={`${roleGroup.groupName} - ${index}`}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <Checkbox
                onChange={() => {
                  // required to make the checkbox work on android devices (ios should work without this)  https://reactnative.dev/blog/2022/12/13/pointer-events-in-react-native
                  if (skillsValue.includes(roleGroup.groupName)) {
                    setSkillsValue(
                      skillsValue.filter(
                        skill => skill !== roleGroup.groupName, // remove skill from the array
                      ),
                    )
                  } else {
                    setSkillsValue([...skillsValue, roleGroup.groupName]) // add skill to the array
                  }
                }}
                checked={skillsValue.includes(roleGroup.groupName)}
              />
              <Text
                ml="4"
                marginY="0.5"
                onPress={() => {
                  // required to make the text label work on android devices (ios should work without this)
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
        <VStack marginX={5}>
          <ProfileButtons
            borderWidth={2}
            backgroundColor="bg.100"
            borderColor="purple.100"
            fontFamily="primarySemiBold"
            _text={{
              color: 'purple.100',
            }}
            onPress={handleButtonPress}
            disabled={currentBox === currentBox - 1}
          >
            Next
          </ProfileButtons>
          {nextButton ? (
            <View marginBottom={8} />
          ) : (
            <Button
              backgroundColor="bg.100"
              borderColor="bg.100"
              fontFamily="primarySemiBold"
              _dark={{
                backgroundColor: 'bgDarkMode.200',
                _text: { color: 'white' },
                borderColor: 'white',
              }}
              _text={{
                color: 'darkGrey.100',
              }}
              onPress={() => []}
            >
              Skip
            </Button>
          )}
        </VStack>
      </ScrollView>
    </>
  )
}

export default MyExperienceContainer
