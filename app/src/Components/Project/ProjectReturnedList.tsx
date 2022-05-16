import React, { FC } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import ProjectSummary from './ProjectSummary'
import { Projects } from '@/Services/modules/projects'
import { goBack, navigate } from '@/Navigators/utils'

interface ProjectReturnedListProps {
  data: Projects
  mode: 'fullList' | 'search'
}

const GoBack = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
  text-decoration: underline;
`
const NoneFound = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const ProjectDetails = styled.TouchableOpacity`
  margin: 21px 21px 0px 21px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`

const ProjectReturnedList: FC<ProjectReturnedListProps> = ({ data, mode }) => {
  return data.length ? (
    <FlatList
      data={data}
      keyExtractor={project => project.res_id}
      renderItem={({ item }) => {
        return (
          <ProjectDetails
            onPress={() => {
              navigate('ProjectDetail', { item, key: item.res_id })
            }}
          >
            <ProjectSummary project={item}></ProjectSummary>
          </ProjectDetails>
        )
      }}
    />
  ) : (
    <>
      <NoneFound>
        Sorry, we couldn't find any projects{' '}
        {mode === 'fullList'
          ? 'at the moment.'
          : mode === 'search'
          ? 'matching your search.'
          : ''}{' '}
        Please try again another time.
      </NoneFound>
      <GoBack onPress={goBack}>Try another search</GoBack>
    </>
  )
}

export default ProjectReturnedList
