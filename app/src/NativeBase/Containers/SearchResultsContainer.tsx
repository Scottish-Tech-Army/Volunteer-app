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
  ScrollView,
  Text,
} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { EventSearch } from '@/Containers/EventSearchContainer'
import {
  ListRouteParams,
  ListScreens,
  ListSearch,
  ListType,
} from '@/Containers/ListContainer'
import List, { ListDisplayMode, ListOptions } from '@/Components/List'
import SearchIcon from '@/NativeBase/Components/SearchIcon'
import { goBack, navigate, RootStackParamList } from '@/Navigators/utils'
import { Events } from '@/Services/modules/events'
import { Projects } from '@/Services/modules/projects'
import { ProjectSearch } from './ProjectSearchContainer'

export interface SearchResults extends ListSearch {
  results: Projects // the projects results for this search
}

export interface SearchResultsRouteParams {
  type: ListType
  search?: EventSearch | ProjectSearch
  options: ListOptions
}

/**
 * Container for showing search results
 *
 * @param {object} props The container props
 * @param {object} props.route A route object containing params
 * @param {SearchResultsRouteParams} props.route.params The parameters to send to this container when navigating, to set what it displays
 * @param {ListType} props.route.params.type The type of data to show in the list, e.g. events or projects
 * @param {EventSearch | ProjectSearch} [props.route.params.search] The search the user has performed - or not included if showing full list of data, not search results
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
    <>
      <Box>
        <ScrollView>
          <HStack
            alignItems="center"
            backgroundColor="secondaryGrey.100"
            borderBottomColor="primary.100"
            borderBottomWidth="1"
            borderRadius="4"
            justifyContent="space-between"
            marginBottom="6"
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
                } // prevent text spilling over and overlapping close button
              >
                <SearchIcon />

                {params?.search?.description && (
                  <Text fontSize="sm">
                    Results for {params.search.description}
                  </Text>
                )}
              </HStack>
            </Pressable>

            <IconButton
              _light={{ color: 'accentPurple.100' }}
              _dark={{ color: 'white' }}
              icon={<Icon as={MaterialIcons} name="close" />}
              onPress={clearSearch}
              size="xs"
            />
          </HStack>
        </ScrollView>

        {Boolean(params.search?.results) && (
          <List
            data={params.search?.results as Events | Projects}
            mode={ListDisplayMode.Search}
            options={params?.options}
            searchScreen={screens[params.type]}
            type={params.type}
          />
        )}
      </Box>
    </>
  )
}

export default SearchResultsContainer
