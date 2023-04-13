import React from 'react'
import styled from 'styled-components/native'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'

const FilterSortView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 23px 10px;
`
const FilterSortText = styled.Text`
  font-size: 18px;
  text-decoration: underline;
`
const FilterSortTouch = styled.TouchableOpacity``

const ProjectFilterSort = () => {
  return (
    <FilterSortView>
      <FilterSortTouch>
        <FilterSortText onPress={underDevelopmentAlert}>Filter</FilterSortText>
      </FilterSortTouch>
      <FilterSortTouch>
        <FilterSortText onPress={underDevelopmentAlert}>Sort</FilterSortText>
      </FilterSortTouch>
    </FilterSortView>
  )
}

export default ProjectFilterSort
