import React from 'react'
import ProjectRegisterInterest from '../Components/Project/ProjectRegisterInterest'
import ButtonComponent from '../Components/Forms/Button'
import YesNoChoice from '../Components/Forms/YesNoChoice'
import TextInputControl from '../Components/Forms/TextInputControl'
import { Project } from '@/Services/modules/projects/index'
import { ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const ProjectRegisterInterestContainer = (props: {
  route: { params: { project: Project } }
}) => {
  const { project } = props.route.params
  const navigation = useNavigation()
  navigation.setOptions({
    title: project.name,
  })

  return (
    <ScrollView>
      <ProjectRegisterInterest project={project} />
    </ScrollView>
  )
}

export default ProjectRegisterInterestContainer
