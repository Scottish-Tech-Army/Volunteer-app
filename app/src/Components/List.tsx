import React, { FC } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import EventSummary from '@/Components/Event/EventSummary'
import ProjectSummary from '@/Components/Project/ProjectSummary'
import { ListType } from '@/Containers/ListContainer'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Events, EventsRange } from '@/Services/modules/events'
import { Projects } from '@/Services/modules/projects'

export interface ListOptions {
  events?: {
    range: EventsRange
  }
}

interface ListProps {
  data: Events | Projects
  mode: 'fullList' | 'search'
  options: ListOptions
  searchScreen: keyof RootStackParamList
  type: ListType
}

const EventListItem = styled.TouchableOpacity`
  margin: 21px 21px 0px 21px;
  width: 150px;
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
const TryAnotherSearch = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
  text-decoration: underline;
`

const List: FC<ListProps> = ({ data, mode, options, searchScreen, type }) => {
  let flatList

  switch (type) {
    case ListType.Events:
      flatList = (
        <FlatList
          data={data as Events}
          keyExtractor={event => event.id}
          renderItem={({ item }) => {
            return (
              <EventListItem
                onPress={() =>
                  navigate('EventDetail', { event: item, key: item.id })
                }
              >
                <EventSummary
                  event={item}
                  hideDateTime={options?.events?.range === EventsRange.Past}
                />
              </EventListItem>
            )
          }}
        />
      )
      break

    case ListType.Projects:
      flatList = (
        <FlatList
          data={data as Projects}
          keyExtractor={project => project.res_id}
          renderItem={({ item }) => {
            return (
              <ProjectDetails
                onPress={() => {
                  navigate('ProjectDetail', { item, key: item.res_id })
                }}
              >
                <ProjectSummary project={item} />
              </ProjectDetails>
            )
          }}
        />
      )
      break
  }

  return data.length ? (
    flatList
  ) : (
    <>
      <NoneFound>
        Sorry, we couldn't find any {type}{' '}
        {mode === 'fullList'
          ? 'at the moment.'
          : mode === 'search'
          ? 'matching your search.'
          : ''}
      </NoneFound>

      {mode === 'search' && (
        <TryAnotherSearch
          onPress={() => {
            navigate(searchScreen, undefined)
          }}
        >
          Try another search
        </TryAnotherSearch>
      )}
    </>
  )
}

export default List
