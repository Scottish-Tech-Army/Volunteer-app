/**
 * @file displays the details of a project role
 */

import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { navigate } from '@/Navigators/utils'
import { Project } from '@/Services/modules/projects'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import {
  Button,
  Card,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  ShareIcon,
  Text,
  VStack,
} from 'native-base'
import Video from '../Video'
import ProjectAttachments from '../ProjectAttachments'
import ColouredTag from '../ColouredTag'

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
          >
            <Heading width="70%" fontSize="md">
              {project.name}
            </Heading>

            <HStack
              justifyContent="space-between"
              alignItems="center"
              space="4"
            >
              <ShareIcon
                size="md"
                color="secondaryGrey.100"
                onPress={underDevelopmentAlert}
              />
              <IconButton
                icon={
                  <Icon
                    as={MaterialIcons}
                    color="secondaryGrey.100"
                    name="favorite-border"
                  />
                }
                margin="0"
                onPress={underDevelopmentAlert}
                padding="0"
                size="lg"
              />
            </HStack>
          </HStack>

          <Video
            videoWebpage={project.video_webpage}
            videoWebpagePlayerOnly={project.video_webpage_player_only}
            videoWebpageScreen="ProjectVideo"
          />

          <Card paddingY="3">
            <Text>{project.client}</Text>
            <ColouredTag title={project.role} />
            <Text fontSize="xs">{project.hours}</Text>
            <Text fontSize="xs" fontWeight="300">
              {project.description}
            </Text>
            {Boolean(project.buddying) && (
              <Text fontSize="xs">Suitable for pairing</Text>
            )}
            <ProjectAttachments details={'Project Scope'} url={project.scope} />
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
