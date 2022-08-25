import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import SafeArea from '@/Components/SafeArea'
import TopOfApp from '@/Components/TopOfApp'
import ProjectOptions from '@/Components/Project/ProjectOptions'
import ProjectSearch from '@/Components/Project/ProjectSearch'
import ProjectReturnedList from '@/Components/Project/ProjectReturnedList'
import { Text, SafeAreaView } from 'react-native'
import Theme from '@/Theme/OldTheme'
import { Projects, useLazyFetchAllQuery } from '@/Services/modules/projects'

interface ProjectProps {
  data: Projects
}

const HorizontalLine = styled.View`
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  margin: 0px 75px 10px 75px;
`

const ProjectList: FC<ProjectProps> = ({ data }) => {
  return (
    <SafeArea>
      <TopOfApp />
      <ProjectSearch />
      <ProjectOptions />
      <HorizontalLine />
      <ProjectReturnedList data={data} mode="fullList" />
    </SafeArea>
  )
}

const HomeContainer = () => {
  
  const [fetchAll, { data: projects }] = useLazyFetchAllQuery()

  useEffect(() => {
    fetchAll('')
  }, [fetchAll])

  if (projects) {
    return (
      <Theme>
        <ProjectList data={projects} />
      </Theme>
    )
  } else {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
}

export default HomeContainer
