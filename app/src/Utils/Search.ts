// Functions used across more than one search screen (e.g. searching events, projects)

import Fuse from 'fuse.js' // fuzzy text search - see docs at https://fusejs.io
import { Event } from '@/Services/modules/events'
import { Project } from '@/Services/modules/projects'
import { dedupeArrayOfObjects } from './Lists'

interface GenericObject {
  [key: string]: string | string[]
}

// Converts a typed object (e.g. an Event or Project) into a generic object
// We need to do this in order for searchByArray to work with TypeScript
// when we use searchField as an index
const convertToGenericObject = (
  typedObject: Event | Project,
): GenericObject => {
  const genericObject = {} as GenericObject

  for (const [key, value] of Object.entries(typedObject)) {
    genericObject[key] = value
  }

  return genericObject
}

export const searchByArray = (
  // We set the type this way here rather than using Events | Projects | undefined
  // because otherwise TypeScript complains about the use of array filter below
  arrayToSearch: (Event | Project)[] | undefined,
  searchField:
    | ('client' | 'description' | 'name' | 'role' | 'skills' | 'sector') // project fields we may want to search
    | ('description' | 'name' | 'series'), // event fields we may want to search
  searchQueries: string[],
): (Event | Project)[] => {
  let results = [] as (Event | Project)[]

  if (arrayToSearch) {
    results = arrayToSearch.filter((arrayItem: Event | Project) => {
      const itemToSearch = convertToGenericObject(arrayItem)

      const anySearchQueriesMatching = searchQueries.some(searchQuery => {
        if (searchField in itemToSearch) {
          if (typeof itemToSearch[searchField] === 'string') {
            // most fields are strings, but some are an array of strings (e.g. skills)
            const stringSearchField = itemToSearch[searchField] as string

            return stringSearchField
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          } else if (Array.isArray(itemToSearch[searchField])) {
            // assume it's an array, e.g. skills
            const arrayOfStrings = itemToSearch[searchField] as string[]

            return arrayOfStrings.some(item =>
              item.toLowerCase().includes(searchQuery.toLowerCase()),
            ) // we need to find the search words in a descriptive paragraph (e.g. skills are not in a list)
          }
        }
      })

      return anySearchQueriesMatching // returns a boolean
    })
  }

  return results
}

export const fuzzySearchByArray = (
  // We set the type this way here rather than using Events | Projects | undefined
  // because otherwise TypeScript complains about the use of array in the first argument with new Fuse below
  arrayToSearch: (Event | Project)[] | undefined,
  searchFields: any[],
  searchQueries: string[],
): (Event | Project)[] => {
  console.log('searchFields', searchFields)
  console.log('searchQueries', searchQueries)
  console.log('arrayToSearch', arrayToSearch)

  let results = [] as (Event | Project)[]

  if (arrayToSearch) {
    let fuseResultsArray = [] as Fuse.FuseResult<Event | Project>[]

    for (const searchQueryItem of searchQueries) {
      const fuse = new Fuse(arrayToSearch, {
        keys: searchFields,
        minMatchCharLength: 2,
        threshold: 0.4,
      })

      const fuseResults = fuse.search(searchQueryItem)
      fuseResultsArray.push(...fuseResults)
    }

    fuseResultsArray = dedupeArrayOfObjects(fuseResultsArray)
    results = fuseResultsArray.map(result => result.item)
  }

  return results
}
