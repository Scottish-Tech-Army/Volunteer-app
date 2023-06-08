/**
 * @file Show a list of things, e.g. projects or events (can be extended in the future to show other kinds of things).
 */

import React, { FC } from 'react'
import Hyperlink from 'react-native-hyperlink'
import styled from 'styled-components/native'
import EventSummary from '@/Components/Event/EventSummary'
import { ListType } from '@/NativeBase/Containers/ListContainer'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Events, EventsRange } from '@/Services/modules/events'
import { Projects } from '@/Services/modules/projects'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import ColouredTag from '../Components/ColouredTag'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StaTheme from '../Theme/StaTheme'

import {
  FlatList,
  Heading,
  HStack,
  IconButton,
  Pressable,
  ShareIcon,
  Text,
  VStack,
  Card,
  Icon,
} from 'native-base'

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
const List: FC<ListProps> = ({
  data,
  mode,
  options,
  searchScreen,
  type,
}): JSX.Element => {
  if (!data.length)
    return (
      <>
        <Text>
          Sorry, we couldn't find any {type}{' '}
          {mode === ListDisplayMode.Full
            ? 'at the moment.'
            : mode === 'search'
            ? 'matching your search.'
            : ''}
        </Text>

        {mode === ListDisplayMode.Search && (
          <Text
            onPress={() => {
              navigate(searchScreen, undefined)
            }}
            underline
          >
            Try another search
          </Text>
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
              <Card marginY="2" paddingY="3">
                <Pressable
                  onPress={() => {
                    navigate('ProjectDetail', { item, key: item.res_id })
                  }}
                  overflow="hidden"
                >
                  <VStack>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      paddingRight="4"
                      space="0"
                    >
                      <Heading width="70%" fontSize="sm">
                        {item.name}
                      </Heading>

                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        space="4"
                      >
                        <ShareIcon
                          size="md"
                          color="secondaryGrey.100"
                          onPress={underDevelopmentAlert}
                        />
                        <IconButton
                          icon={
                            <Icon
                              as={MaterialIcons}
                              color="secondaryGrey.100"
                              name="favorite-border"
                            />
                          }
                          margin="0"
                          onPress={underDevelopmentAlert}
                          padding="0"
                          size="lg"
                        />
                      </HStack>
                    </HStack>
                    <Text fontSize="xs">{item.client}</Text>
                    <ColouredTag title={item.role} />
                    <Text fontSize="xs">{item.hours}</Text>

                    <Hyperlink
                      linkDefault
                      linkStyle={{ color: StaTheme.colors.primary[100] }}
                    >
                      <Text fontSize="xs">{item.description}</Text>
                    </Hyperlink>

                    {Boolean(item.buddying) && (
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        paddingRight="4"
                      >
                        <Text fontSize="xs">Suitable for pairing</Text>
                        <Icon
                          size={7}
                          as={MaterialIcons}
                          name="group"
                          color="grey"
                          mx={0}
                          px={0}
                        />
                      </HStack>
                    )}
                  </VStack>
                </Pressable>
              </Card>
            )
          }}
          keyExtractor={project => project.res_id}
        />
      )
  }
}

export default List
