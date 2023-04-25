/**
 * @file Search results screen container.
 */

import React, { useState } from 'react'
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  View,
} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { EventSearch } from '@/Containers/EventSearchContainer'
import List, {
  ListDisplayMode,
  ListOptions,
} from '@/NativeBase/Components/List'
import SearchIcon from '@/NativeBase/Components/SearchIcon'
import { goBack, navigate, RootStackParamList } from '@/Navigators/utils'
import { Events } from '@/Services/modules/events'
import { Projects } from '@/Services/modules/projects'
import {
  ListRouteParams,
  ListScreens,
  ListSearch,
  ListType,
  searchScreens,
} from './ListContainer'
import { ProjectSearch } from './ProjectSearchContainer'

export interface SearchResults extends ListSearch {
  results: Events | Projects
}

export interface SearchResultsRouteParams {
  type: ListType
  search: EventSearch | ProjectSearch
  options: ListOptions
}

/**
 * Container for showing search results
 *
 * @param {object} props The container props
 * @param {object} props.route A route object containing params
 * @param {SearchResultsRouteParams} props.route.params The parameters to send to this container when navigating, to set what it displays
 * @param {ListType} props.route.params.type The type of data to show in the list, e.g. events or projects
 * @param {EventSearch | ProjectSearch} props.route.params.search The search the user has performed
 * @param {ListOptions} props.route.params.options Any additional options for specific data types, that tell the container how to behave
 * @returns {React.ReactElement} Container
 */
const SearchResultsContainer = (props: {
  route: {
    params: SearchResultsRouteParams
  }
}) => {
  const [boxWidth, setBoxWidth] = useState<number | string>('100%')
  const clearButtonWidth = 50
  const params = props.route.params
  const screens = {
    [ListType.Events]: 'Events' as keyof RootStackParamList,
    [ListType.Projects]: 'Projects' as keyof RootStackParamList,
  } as ListScreens

  const clearSearch = () => {
    navigate(screens[params.type], {
      type: params.type,
      search: undefined,
    } as ListRouteParams)
  }

  return (
    <Box>
      <View padding="4">
        <HStack
          alignItems="center"
          backgroundColor="secondaryGrey.100"
          borderBottomColor="primary.80"
          borderBottomWidth="1"
          borderRadius="4"
          justifyContent="space-between"
          onLayout={onLayoutEvent => {
            const { width } = onLayoutEvent.nativeEvent.layout
            setBoxWidth(width)
          }}
          paddingRight="1"
          width="100%"
        >
          <Pressable onPress={goBack}>
            <HStack
              alignItems="center"
              maxWidth={
                boxWidth === '100%'
                  ? boxWidth
                  : (boxWidth as number) - clearButtonWidth
              } // prevent longer text from spilling over and overlapping the close button
            >
              <SearchIcon />

              {Boolean(params?.search.description) && (
                <Text color="text.100" fontSize="sm">
                  Results for {params.search.description}
                </Text>
              )}
            </HStack>
          </Pressable>

          <IconButton
            icon={
              <Icon as={MaterialIcons} color="accentPurple.100" name="close" />
            }
            onPress={clearSearch}
            size="xs"
          />
        </HStack>
      </View>

      {Boolean(params.search?.results) && (
        <View padding="4">
          <List
            data={params.search?.results as Events | Projects}
            mode={ListDisplayMode.Search}
            options={params?.options}
            searchScreen={searchScreens[params.type]}
            type={params.type}
          />
        </View>
      )}
    </Box>
  )
}

export default SearchResultsContainer
