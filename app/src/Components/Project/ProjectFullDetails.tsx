import React, { FC } from 'react'
import styled from 'styled-components/native'
import ProjectHeading from './ProjectHeading'
import ProjectSkills from './ProjectSkills'
import ProjectRequirements from './ProjectRequirements'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Project } from '@/Services/modules/projects'

interface ProjectFullDetailsProps {
  project: Project
}

const ProjectFullDetailsView = styled.View`
  margin: 38px 27px 0px 27px;
`

const ProjectSubTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
`

const ProjectRole = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-top: 9px;
  margin-bottom: 9px;
`

const ProjectDescription = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin-top: 4px;
`

const ProjectDetailsBlock = styled.Text`
  margin: 21px 45px 21px 45px;
  border: ${props => `1.5px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`

const SectionHeader = styled.Text`
  font-weight: 400;
  font-size: 18px;
`

// TODO: create ProjectTeam component
const ProjectTeam = styled.Text`
  margin: 21px 0px 21px 0px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`
// TODO: create ProjectRelatedRoles component
const ProjectRelatedRoles = styled.Text`
  margin: 21px 0px 21px 0px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`
const ProjectFullDetails: FC<ProjectFullDetailsProps> = ({ project }) => {
    return (
      <ProjectFullDetailsView >
        <ProjectHeading title={project.name} />
        <ProjectSubTitle>{project.client}</ProjectSubTitle>
        <ProjectRole>{project.role}</ProjectRole>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectDetailsBlock>
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
        </ProjectDetailsBlock>
        <SectionHeader>Team</SectionHeader>
        <ProjectTeam>Placeholder text</ProjectTeam>
        <SectionHeader>Related Roles</SectionHeader>
        <ProjectRelatedRoles>Placeholder text</ProjectRelatedRoles>
      </ProjectFullDetailsView>
    )
  }

export default ProjectFullDetails 