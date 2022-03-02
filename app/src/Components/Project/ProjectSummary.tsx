import React, { FC } from 'react'
import styled from 'styled-components/native'
import ProjectHeading from './ProjectHeading'
import ProjectSkills from './ProjectSkills'
import ProjectRequirements from './ProjectRequirements'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Project } from '@/Services/modules/projects'

interface ProjectSummaryProps {
  project: Project
}

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
  margin-bottom: 12px;
`

const ProjectSummary: FC<ProjectSummaryProps> = ({ project }) => {  
    return (
      <>
        <ProjectHeading title={project.ItData.projectName} />
        <ProjectSubTitle>{project.ItData.charityName}</ProjectSubTitle>
        <ProjectRole>{project.ResData.jobRole}</ProjectRole>
        <ProjectDescription>{project.ResData.description}</ProjectDescription>
        <ProjectSkills skills={project.ResData.candidateCoreSkills}/>
        <ProjectRequirements
          icon={<Feather name="clock" size={16} />}
          details={project.ResData.candidateTime}
        />
        <ProjectRequirements
          icon={<Feather name="users" size={16} />}
          details={
            project.ResData.suitableForBuddy
              ? 'Suitable for buddying'
              : 'Not suitable for buddying'
          }
        />
      </>
    )
  }

export default ProjectSummary
