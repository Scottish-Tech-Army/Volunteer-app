import React, { FC } from 'react'
import styled from 'styled-components/native'
import ProjectHeading from './ProjectHeading'
import ProjectSkills from './ProjectSkills'
import ProjectRequirements from './ProjectRequirements'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Projects } from './types'

interface ProjectSummaryProps {
  data: Projects
}

const ProjectDetails = styled.TouchableOpacity`
  margin: 21px 41px 0px 21px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`

const ProjectSubTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
`

const ProjectRole = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-top: 9px;
`

const ProjectDescription = styled.Text`
  font-weight: 400;
  font-size: 10px;
  margin-top: 4px;
`

const ProjectSummary: FC<ProjectSummaryProps> = ({ data }) => {
  const projectList = data.map((project, index) => {
    return (
      <ProjectDetails key={index}>
        <ProjectHeading title={project.name} />
        <ProjectSubTitle>{project.client}</ProjectSubTitle>
        <ProjectRole>{project.role}</ProjectRole>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectSkills skills={project.skills} />
        <ProjectRequirements
          icon={<Feather name="clock" size={16} />}
          details={project.hours}
        />
        <ProjectRequirements
          icon={<AntDesign name="user" size={16} />}
          details={`${project.required} required`}
        />
        <ProjectRequirements
          icon={<Feather name="users" size={16} />}
          details={
            project.buddying
              ? 'Suitable for buddying'
              : 'Not suitable for buddying'
          }
        />
      </ProjectDetails>
    )
  })

  return <>{projectList}</>
}

export default ProjectSummary
