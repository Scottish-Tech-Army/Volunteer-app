/**
 * @file displays the details of a project role
 */

import React from 'react'
import { navigate } from '@/Navigators/utils'
import { Project } from '@/Services/modules/projects'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import {
  Button,
  Card,
  FavouriteIcon,
  Heading,
  HStack,
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
      <ScrollView
        _dark={{ backgroundColor: 'bgDarkMode.100' }}
        _light={{ backgroundColor: 'bg.secondary' }}
      >
        <VStack space={4} marginBottom={5}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            paddingRight="4"
          >
            <Heading width="70%" fontSize="md">
              {project.name}
            </Heading>
            <ShareIcon
              size="lg"
              color="accentGrey.100"
              onPress={underDevelopmentAlert}
            />
            <FavouriteIcon
              size="lg"
              color="primary.100"
              onPress={underDevelopmentAlert}
            />
          </HStack>

          <Video
            videoWebpage={project.video_webpage}
            videoWebpagePlayerOnly={project.video_webpage_player_only}
            videoWebpageScreen="ProjectVideo"
          />

          <Card>
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
