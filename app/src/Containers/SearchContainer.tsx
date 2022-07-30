import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js' // fuzzy text search - see docs at https://fusejs.io
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { navigate } from '@/Navigators/utils'
import {
  useLazyFetchAllQuery,
  Project,
  Projects,
} from '@/Services/modules/projects'
import { dedupeArrayOfObjects } from '@/Utils/Lists'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'

// define titles for quick search buttons relating to job roles
const Roles = [
  'Web Developer',
  'Tech Support',
  'UI/UX',
  'Researcher',
  'Scrum Master',
  'BA/PM',
]
// define groups of related job roles
const RolesRelated = [
  {
    roles: [
      'Business Analyst',
      'Business Change Analyst',
      'Business Systems Analyst',
      'Change Analyst',
      'Management Consultant',
      'Process Analyst',
      'Technical Analyst',
      'Senior Business Architect',
    ],
  },
  {
    roles: ['Data Analyst', 'Business Intelligence Analyst', 'MI Analyst'],
  },
  {
    roles: [
      'Data Engineer',
      'Data Scientist',
      'Data Modeller',
      'Data Developer',
      'Database Administrator',
    ],
  },
  {
    roles: [
      'Cyber Security Analyst',
      'Data Security Officer',
      'InfoSec Manager',
    ],
  },
  {
    roles: [
      'UI/UX designer',
      'UI designer',
      'UX designer',
      'Interaction Designer',
      'Visual Designer',
    ],
  },
  {
    roles: ['Mobile developer', 'Mobile Application Developer'],
  },
  {
    roles: [
      'PMO Analyst',
      'Project Co-ordinator',
      'Project Analyst',
      'PMO Lead',
    ],
  },
  {
    roles: [
      'BA/PM',
      'Business Analyst',
      'Product Manager',
      'Product Manager',
      'Product Owner',
      'Project Administrator',
    ],
  },
  {
    roles: [
      'Tech Help (IT Support)',
      'IT Support',
      '1st/2nd Line Support',
      'Support Technician',
    ],
  },
  {
    roles: [
      'Test Analyst',
      'Quality Analyst',
      'Quality Assurance Analyst',
      'QA Analyst',
    ],
  },
  {
    roles: ['Solutions Architect', 'IT architect', 'Design Architect'],
  },
  {
    roles: ['Digital trainer', 'Technology Trainer'],
  },
  {
    roles: ['Digital Consultant', 'Digital Transformation Consultant'],
  },
  {
    roles: [
      'Web developer',
      'Front End Developer',
      'Back End Developer',
      'Full Stack Developer',
    ],
  },
  {
    roles: ['Software engineer', 'DevOps Engineer'],
  },
  {
    roles: [
      'Communications manager',
      'Communications Director',
      'Public Relations Manager',
      'Social Media Manager',
      'Fundraising manager',
    ],
  },
  {
    roles: [
      'Copywriter',
      'Advertising Copywriter',
      'Communications Specialist',
    ],
  },
  {
    roles: ['Researcher', 'User Researcher', 'UX Researcher'],
  },
  {
    roles: [
      'Infrastructure Engineer/Cloud',
      'Infrastructure Engineer',
      'Cloud Engineer',
    ],
  },
  {
    roles: [
      'Marketing Manager',
      'Brand Manager',
      'Product Marketing Manager',
      'Marketing Executive',
      'Social Media Manager',
    ],
  },
]

// define titles for quick search buttons relating to charity sectors
const Causes = [
  'Health & Social Care',
  'Education & Youth',
  'Arts & Culture',
  'Environment & Conservation',
  'Community Projects',
  'Internal STA Project',
]

// define titles for quick search buttons relating to tech stack
const TechStack = [
  'Java',
  'JavaScript',
  'Python',
  'AWS',
  'React Native',
  'React',
]

const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const SubHeading = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin: 10px 15px 0px 15px;
`
const SectionView = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 180px;
`
const QuickSearchTitle = styled.Text`
  display: flex;
  text-align: center;
`

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleFreeTextSearch = (input: React.SetStateAction<string>) => {
    setSearchQuery(input)
  }

  // fetch all projects
  const [fetchAll, { data: projects }] = useLazyFetchAllQuery()

  useEffect(() => {
    fetchAll('')
  }, [fetchAll])

  // ensure job title searches find related roles
  const getRelatedRoles = (
    possibleRoleSearchQuery: string,
  ): string[] | undefined => {
    const fuse = new Fuse(RolesRelated, {
      keys: ['roles'],
      minMatchCharLength: 2,
      threshold: 0.1,
    })

    const fuseResults = fuse.search(possibleRoleSearchQuery)

    if (fuseResults.length) {
      const roles = []

      for (const fuseResult of fuseResults) {
        for (const role of fuseResult.item.roles) {
          roles.push(role)
        }
      }

      return roles
    }

    return undefined
  }

  
  const handleQuickSearchSubmit = (
    searchField: 'client' | 'description' | 'name' | 'role' | 'skills' | 'sector',
    searchQueryChoice: string,
  ) => {
    let searchQueries = [] as string[]
    let results = [] as Projects

    searchQueries.push(searchQueryChoice)

    if (searchField === 'role') {
      const relatedRoles = getRelatedRoles(searchQueryChoice)

      if (relatedRoles?.length) {
        searchQueries = relatedRoles
      }
      results = fuzzySearchByArray(searchQueries, [searchField]) // we need to use fuzzy search as the roles should include various options of a role (i.e. without it developer does not include web developer results) 
    }
    else {
    results = exactSearchByArray(searchQueries, searchField) // here we do not want to use fuzzy search as it would include unwanted results
    }

    navigate('ProjectSearchResults', {
      results,
      searchField,
      searchQuery: searchQueryChoice,
    })
  }
  
  const handleFreeTextSubmit = () => {
    let searchQueries = [] as string[]

    const relatedRoles = getRelatedRoles(searchQuery)

    if (relatedRoles?.length) {
      searchQueries = relatedRoles
    }

    searchQueries.push(searchQuery)

    const results = fuzzySearchByArray(searchQueries, [
      'client',
      // default weight is 1, put less importance on description field as more likely to return false positive matches
      { name: 'description', weight: 0.5 },
      'name',
      'role',
      'skills',
      'sector',
    ])

    navigate('ProjectSearchResults', {
      results,
      searchField: undefined,
      searchQuery,
    })
  }

  const exactSearchByArray = (
    searchQueries: string[],
    searchField: 'client' | 'description' | 'name' | 'role' | 'skills' | 'sector',
  ): Projects => {
    let results = [] as Projects

    if (projects) {
      results = projects.filter(
        project => {
          const anySearchQueriesMatching = searchQueries.some(searchQuery => {
            if (typeof project[searchField] === "string") { // most fields are strings, but some are an array of strings (i.e. skills)
              const isString = project[searchField] as string
              return isString.toLowerCase().includes(searchQuery.toLowerCase())
            }
            else if (Array.isArray(project[searchField])) { // assume it's an array, ie skills
              const arrayOfStrings = project[searchField] as string[]
              return arrayOfStrings.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
            }
          })
          return anySearchQueriesMatching // returns a boolean
        }
      )
    }
    return results
  }

  const fuzzySearchByArray = (
    searchQueries: string[],
    searchKeys: any[],
  ): Projects => {
    let results = [] as Projects

    if (projects) {
      let fuseResultsArray = [] as Fuse.FuseResult<Project>[]

      for (const searchQueryItem of searchQueries) {
        const fuse = new Fuse(projects, {
          keys: searchKeys,
          minMatchCharLength: 2,
          threshold: 0.3,
        })

        const fuseResults = fuse.search(searchQueryItem)
        fuseResultsArray.push(...fuseResults)
      }

      fuseResultsArray = dedupeArrayOfObjects(fuseResultsArray)
      results = fuseResultsArray.map(result => result.item)
    }
    return results
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TopOfApp />
        <FreeSearchBar
          handleSearch={handleFreeTextSearch}
          handleSubmit={handleFreeTextSubmit}
        />
        <Heading>Popular Searches</Heading>
        <SubHeading>Roles</SubHeading>
        <SectionView>
          {Roles.map((role, index) => (
            <QuickSearchButton
              onPress={() => handleQuickSearchSubmit('role', role)}
              key={index}
            >
              <QuickSearchTitle>{role}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Causes</SubHeading>
        <SectionView>
          {Causes.map((cause, index) => (
            <QuickSearchButton onPress={() => handleQuickSearchSubmit('sector', cause) } key={index}>
              <QuickSearchTitle>{cause}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Tech Stack / Languages</SubHeading>
        <SectionView>
          {TechStack.map((tech, index) => (
            <QuickSearchButton onPress={() => handleQuickSearchSubmit('skills', tech)} key={index}>
              <QuickSearchTitle>{tech}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchContainer
