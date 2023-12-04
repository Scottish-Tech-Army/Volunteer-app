/**
 * @file displays the details of a project role
 */

import React from 'react'
import Hyperlink from 'react-native-hyperlink'
import { navigate } from '@/Navigators/utils'
import { Project } from '@/Services/modules/projects'
import {
  Button,
  Card,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import Video from '../Video'
import ProjectAttachments from '../ProjectAttachments'
import ColouredTag from '../ColouredTag'
import StaTheme from '../../Theme/StaTheme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface ProjectFullDetailsProps {
  project: Project
}

/**
 * Displays the details of a project role
 * @param {ProjectFullDetailsProps} props - the props for this component
 * @param {Project} props.project - the project object
 * @returns {JSX.Element} React element that renders the project details
 */
const ProjectFullDetails = ({
  project,
}: ProjectFullDetailsProps): JSX.Element => {
  return (
    <>
      <ScrollView>
        <VStack space={4} marginBottom={5}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            paddingRight="4"
            space={4}
          >
            <Heading fontSize="md" width="70%">
              {project.name}
            </Heading>

            {/* TODO: reinstate when functionality is ready and set Heading width="70%" */}
            {/* <HStack
              justifyContent="space-between"
              alignItems="center"
              space="4"
            >
              <ShareIcon
                size="md"
                color="secondaryGrey.100"
                //onPress={underDevelopmentAlert}
              />
              <Icon
                as={MaterialIcons}
                color="secondaryGrey.100"
                //onPress={underDevelopmentAlert}
                name="favorite-border"
                size="lg"
              />
            </HStack> */}
          </HStack>

          <Video
            videoWebpage={project.video_webpage}
            videoWebpagePlayerOnly={project.video_webpage_player_only}
            videoWebpageScreen="ProjectVideo"
          />

          <Card>
            <VStack space={2}>
              <Text fontSize="md">{project.client}</Text>
              <ColouredTag title={project.role} />
              <Text fontSize="xs">{project.hours}</Text>
              <Hyperlink
                linkDefault
                linkStyle={{ color: StaTheme.colors.primary[100] }}
              >
                <Text fontSize="xs" fontFamily="primaryLight">
                  {project.description}
                </Text>
              </Hyperlink>
              {Boolean(project.buddying) && (
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingRight="4"
                >
                  <Text fontSize="xs">Suitable for pairing</Text>
                  <Icon
                    size={7}
                    as={MaterialIcons}
                    name="group"
                    color="mediumGrey.100"
                  />
                </HStack>
              )}
              <ProjectAttachments
                details={'Project Scope'}
                url={project.scope}
              />
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
      <Button
        margin={5}
        onPress={() => {
          navigate('ProjectRegisterInterest', { project })
        }}
      >
        Register
      </Button>
    </>
  )
}

export default ProjectFullDetails
