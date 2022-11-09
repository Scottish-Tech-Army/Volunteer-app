/**
 * @file Show a list of things, e.g. projects or events (can be extended in the future to show other kinds of things).
 */

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import EventSummary from '@/Components/Event/EventSummary'
import ProjectSummary from '@/Components/Project/ProjectSummary'
import { ListType } from '@/Containers/ListContainer'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Events, EventsRange } from '@/Services/modules/events'
import { Projects } from '@/Services/modules/projects'

// General styled components
const NoneFound = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const TryAnotherSearch = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
  text-decoration: underline;
`
// Events-specific
const EventListItem = styled.TouchableOpacity`
  margin: 21px 21px 0px 21px;
  width: 150px;
`
// Projects-specific
const ProjectListItem = styled.TouchableOpacity`
  margin: 21px 21px 0px 21px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`

export enum ListDisplayMode {
  Full = 'full',
  Search = 'search',
}

export interface ListOptions {
  events?: {
    range: EventsRange
  }
}

interface ListProps {
  data: Events | Projects
  mode: ListDisplayMode
  options: ListOptions
  searchScreen: keyof RootStackParamList
  type: ListType
}

/**
 * Component to show a list of things
 *
 * @param {ListProps} props The component props
 * @param {Events | Projects} props.data The actual list data
 * @param {ListDisplayMode} props.mode Are we showing a full list of things, or some search results
 * @param {ListOptions} props.options Some extra options for displaying particular kinds of list data
 * @param {keyof RootStackParamList} props.searchScreen The name of the search screen for this kind of data - so we can take the user there if they want to do another search
 * @param {ListType} props.type Which type of data is in the list, e.g. projects or events
 * @returns ReactElement Component
 */
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
              <ProjectListItem
                onPress={() => {
                  navigate('ProjectDetail', { item, key: item.res_id })
                }}
              >
                <ProjectSummary project={item} />
              </ProjectListItem>
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
        {mode === ListDisplayMode.Full
          ? 'at the moment.'
          : mode === 'search'
          ? 'matching your search.'
          : ''}
      </NoneFound>

      {mode === ListDisplayMode.Search && (
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
