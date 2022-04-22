import React, { FC } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import ProjectSummary from './ProjectSummary'
import { Projects } from '@/Services/modules/projects'
import { navigate } from '@/Navigators/utils'

interface ProjectReturnedListProps {
  data: Projects
}

const ProjectDetails = styled.TouchableOpacity`
  margin: 21px 21px 0px 21px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`

const ProjectReturnedList: FC<ProjectReturnedListProps> = ({ data }) => {
  return (
    <FlatList 
      data={data}
      keyExtractor={(project) => project.res_id}
      renderItem={ ({ item }) => {
        return (
          <ProjectDetails onPress={() => { navigate('ProjectDetail', { item, key: item.res_id }) }}>
            <ProjectSummary project={item} ></ProjectSummary>
          </ProjectDetails>
        )
      }}
    />
  )
}

export default ProjectReturnedList
