/**
 * @file Show a list of things, e.g. projects or events (can be extended in the future to show other kinds of things).
 */

import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventSummary from '@/Components/Event/EventSummary'
import ProjectSummary from '@/Components/Project/ProjectSummary'
import { ListType } from '@/NativeBase/Containers/ListContainer'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Events, EventsRange } from '@/Services/modules/events'
import { Projects } from '@/Services/modules/projects'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'
import ProjectRoleTitle from '../Components/Project/ProjectRoleTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {
  Box,
  FavouriteIcon,
  FlatList,
  Heading,
  HStack,
  Pressable,
  ShareIcon,
  Text,
  VStack,
  Icon,
} from 'native-base'

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
 * @returns {React.ReactElement} Component
 */
const List: FC<ListProps> = ({ data, mode, options, searchScreen, type }) => {
  if (!data.length)
    return (
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

  switch (type) {
    case ListType.Events:
      return (
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

    case ListType.Projects:
      return (
        <FlatList
          data={data as Projects}
          renderItem={({ item }) => {
            return (
              <Box
                borderWidth={1}
                borderColor="grey.80"
                rounded="xl"
                backgroundColor="bg.100"
                margin="2"
              >
                <Pressable
                  onPress={() => {
                    navigate('ProjectDetail', { item, key: item.res_id })
                  }}
                  overflow="hidden"
                >
                  <VStack paddingX="2" bgColor="bg.secondary" space={1}>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Heading maxWidth={246} fontSize="lg">
                        {item.name}
                      </Heading>
                      <ShareIcon
                        size="md"
                        color="accentGrey"
                        onPress={underDevelopmentAlert}
                      />
                      <FavouriteIcon
                        size="md"
                        color="primary.100"
                        onPress={underDevelopmentAlert}
                      />
                    </HStack>
                    <Text fontSize="lg">{item.client}</Text>
                    <ProjectRoleTitle role={item.role} />
                    <Text>{item.hours}</Text>
                    <Text>{item.description}</Text>
                    <Text>
                      {item.buddying
                        ? 'Suitable for pairing'
                        : 'Not suitable for pairing'}
                    </Text>
                    <Icon
                      as={MaterialIcons}
                      color="primary.100"
                      name="Handshake"
                      size="sm"
                    />
                  </VStack>
                </Pressable>
              </Box>
            )
          }}
          keyExtractor={project => project.res_id}
        />
      )
  }
}

export default List