import React from 'react'
import styled from 'styled-components/native'
import { FlatList, ScrollView, SafeAreaView, SectionList } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'

const roles =
    [
        "Web Developer",
        "Tech Support",
        "UI/UX",
        "Data Analyst",
        "Researcher",
        "Scrum Master",
        "BA/PM",
        "Test Analyst",
    ]

const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 21px 15px 0px 15px;
`

const SubHeading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 20px 15px 0px 15px;
`

const QuickSearchButton = styled.TouchableOpacity`
  width: 100px;
  height: 60px;
  margin: 20px 0px 0px 15px;
  padding: 5px;
  background-color: #e3e3e3;
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const QuickSearchTitle = styled.Text`
  display: flex;
  text-align: center;
`

const SearchContainer = () => {
    return (
        <>
            <TopOfApp />
            <Heading>Popular Searches</Heading>
            <SubHeading>Roles</SubHeading>
            <FlatList
                horizontal
                data={roles}
                keyExtractor={index => index.toString()}
                renderItem={({ item }) => {
                    return (                       
                            <QuickSearchButton>
                                <QuickSearchTitle>
                                    {item}
                                </QuickSearchTitle>
                            </QuickSearchButton>
                    )
                }}
            />
        </>
    )
}

export default SearchContainer
