/**
 * @file A container for the form for the user to register interest in taking part in a volunteer project.
 */

import React, { useLayoutEffect } from 'react'
import ProjectRegisterInterest from '../Components/Project/ProjectRegisterInterest'
import { Project } from '@/Services/modules/projects/index'
import { ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const ProjectRegisterInterestContainer = (props: {
  route: { params: { project: Project } }
}) => {
  const { project } = props.route.params
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project.name,
    })
  }, [navigation, project.name])

  return (
    <ScrollView>
      <ProjectRegisterInterest project={project} />
    </ScrollView>
  )
}

export default ProjectRegisterInterestContainer
