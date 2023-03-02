/**
 * @file displays the details of a project role
 */

import React, { FC, ReactElement } from 'react'
import styled from 'styled-components/native'
import ProjectHeading from './ProjectHeading'
import ProjectInterestButton from './ProjectInterestButton'
import ProjectSkills from './ProjectSkills'
import ProjectRequirements from './ProjectRequirements'
import ProjectAttachments from './ProjectAttachments'
import Feather from 'react-native-vector-icons/Feather'
import Video from '@/NativeBase/Components/Video'
import { Project } from '@/Services/modules/projects'
import { ScrollView } from 'react-native-gesture-handler'

interface ProjectFullDetailsProps {
  project: Project
}

const ProjectFullDetailsView = styled.View`
  margin: 21px 27px 0px 27px;
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

const ProjectDetailsBlock = styled.View`
  margin: 21px 25px 21px 25px;
  border: ${props => `1.5px solid ${props.theme.colors.staBlack}`};
  padding: 17px 20px 11px 20px;
`

const SectionHeader = styled.Text`
  font-weight: 400;
  font-size: 18px;
  margin-top: 12px;
`

const ProjectTeam = styled.Text`
  margin: 12px 0px 12px 0px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`
const HorizontalLine = styled.View`
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  margin: 12px 0px 12px 0px;
`

const ProjectRelatedRoles = styled.Text`
  margin: 12px 0px 21px 0px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`
/**
 * Displays the details of a project role
 * @param {Project} project object
 * @returns {ReactElement} project details
 */
const ProjectFullDetails: FC<ProjectFullDetailsProps> = ({ project }) => {
  return (
    <ScrollView>
      <ProjectFullDetailsView>
        <ProjectHeading screen="details" title={project.name} />
        <ProjectSubTitle>{project.client}</ProjectSubTitle>
        <ProjectRole>{project.role}</ProjectRole>
        <ProjectInterestButton project={project} />
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectDetailsBlock>
          <ProjectSkills skills={project.skills} />
          <ProjectRequirements
            icon={<Feather name="clock" size={16} />}
            details={project.hours}
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
        <ProjectAttachments
          icon={<Feather name="file" size={24} />}
          details={'A3 - Project Scope'}
          url={project.scope}
        />
        <Video
          video_file={project.video_file}
          video_webpage={'project.video_webpage'}
        />
        <SectionHeader>Team</SectionHeader>
        <ProjectTeam>Placeholder text</ProjectTeam>
        <HorizontalLine />
        <SectionHeader>Related Roles</SectionHeader>
        <ProjectRelatedRoles>Placeholder text</ProjectRelatedRoles>
      </ProjectFullDetailsView>
    </ScrollView>
  )
}

export default ProjectFullDetails
