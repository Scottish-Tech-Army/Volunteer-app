/**
 * @file displays the details of a project role
 */

import React from 'react'
import { navigate } from '@/Navigators/utils'
import { Project } from '@/Services/modules/projects'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import {
  Box,
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
    <ScrollView bgColor="bg.secondary">
      <VStack space={4}>
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

        <Video url={project.video_file} />

        <Box
          backgroundColor="bg.100"
          borderWidth={1}
          borderColor="secondaryGrey.80"
          rounded="xl"
        >
          <Text>{project.client}</Text>
          <ColouredTag title={project.role} />
          <Text fontSize="xs">{project.hours}</Text>
          <Text fontSize="xs" fontWeight="300">
            {project.description}
          </Text>
          {project.buddying ? (
            <Text fontSize="xs">Suitable for pairing</Text>
          ) : null}
          <ProjectAttachments details={'Project Scope'} url={project.scope} />
        </Box>

        <Button
          marginBottom="12"
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
