/**
 * @file displays the details of a project role
 */

import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { navigate } from '@/Navigators/utils'
import { Project } from '@/Services/modules/projects'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import {
  Box,
  Button,
  FavouriteIcon,
  Heading,
  HStack,
  ShareIcon,
  Text,
  VStack,
} from 'native-base'
import VideoComponent from '../Video'
import ProjectAttachments from './ProjectAttachments'
import ProjectRoleTitle from './ProjectRoleTitle'

interface ProjectFullDetailsProps {
  project: Project
}

/**
 * Displays the details of a project role
 * @param {ProjectFullDetailsProps} props - the props for this component
 * @param {Project} props.project - the project object
 * @returns {JSX.Element} - renders the project details
 */
const ProjectFullDetails = ({
  project,
}: ProjectFullDetailsProps): JSX.Element => {
  return (
    <ScrollView>
      <VStack paddingX="2" bgColor="bg.secondary" space={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading maxWidth={246} fontSize="lg">
            {project.name}
          </Heading>
          <ShareIcon
            size="md"
            color="accentGrey"
            onPress={underDevelopmentAlert}
          />
          <FavouriteIcon
            size="md"
            color="primary.100"
            onPress={underDevelopmentAlert}
          />
        </HStack>

        <VideoComponent url={project.video_file} />

        <Box
          backgroundColor="bg.100"
          borderWidth={1}
          borderColor="grey.80"
          rounded="xl"
        >
          <Text fontSize="lg">{project.client}</Text>
          <ProjectRoleTitle role={project.role} />
          <Text>{project.hours}</Text>
          <Text>{project.description}</Text>
          {project.buddying ? <Text>Suitable for pairing</Text> : null}
          <ProjectAttachments details={'Project Scope'} url={project.scope} />
        </Box>

        <Button
          onPress={() => {
            navigate('ProjectRegisterInterest', { project })
          }}
        >
          Register
        </Button>
      </VStack>
    </ScrollView>
  )
}

export default ProjectFullDetails
