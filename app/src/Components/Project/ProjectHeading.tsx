import React, { FC } from 'react'
import styled from 'styled-components/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Title from '../Title'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'

interface ProjectHeadingProps {
  hideSaveProjectIcon?: boolean
  screen: 'details' | 'list' // which screen is this being used in
  title: string
}

const ProjectHeadingView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SaveProjectHeart = styled.TouchableOpacity``

const ProjectHeading: FC<ProjectHeadingProps> = ({
  hideSaveProjectIcon,
  screen,
  title,
}) => {
  return (
    <ProjectHeadingView>
      <Title text={title} type={screen === 'details' ? 'main' : 'list'} />
      {!hideSaveProjectIcon && (
        <SaveProjectHeart onPress={underDevelopmentAlert}>
          <AntDesign name="hearto" size={20} />
        </SaveProjectHeart>
      )}
    </ProjectHeadingView>
  )
}

export default ProjectHeading
