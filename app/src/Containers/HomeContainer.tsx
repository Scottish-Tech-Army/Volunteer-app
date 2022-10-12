import React, { FC, useEffect } from 'react'
import { Text, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import SafeArea from '@/Components/SafeArea'
import TopOfApp from '@/Components/TopOfApp'
import ProjectOptions from '@/Components/Project/ProjectOptions'
import ProjectReturnedList from '@/Components/Project/ProjectReturnedList'
import SearchIconButton from '@/Components/SearchIconButton'
import { navigate } from '@/Navigators/utils'
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
      <SearchIconButton onPress={() => navigate('ProjectSearch', '')} />
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
