import React, { useState, useEffect, SetStateAction } from 'react'
import Fuse from 'fuse.js' // fuzzy text search - see docs at https://fusejs.io
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { navigate } from '@/Navigators/utils'
import {
  useLazyFetchAllQuery,
  Project,
  Projects,
} from '@/Services/modules/projects'
import { dedupeArrayOfObjects } from '@/Utils/Lists'

const Roles = [
  'Web Developer',
  'Tech Support',
  'UI/UX',
  'Researcher',
  'Scrum Master',
  'BA/PM',
]
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
const Causes = [
  'Health & Social Care',
  'Education & Youth',
  'Arts & Culture',
  'Environment & Conservation',
  'Community Projects',
  'Internal STA',
]
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
const QuickSearchButton = styled.TouchableOpacity`
  width: 28%;
  height: 50px;
  margin: 20px 0px 0px 15px;
  padding: 5px;
  background-color: #e3e3e3;
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  display: flex;
  justify-content: center;
`
const QuickSearchTitle = styled.Text`
  display: flex;
  text-align: center;
`

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (input: React.SetStateAction<string>) => {
    setSearchQuery(input)
  }

  const [fetchAll, { data: projects }] = useLazyFetchAllQuery()

  useEffect(() => {
    fetchAll('')
  }, [fetchAll])

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

  const handlePreDefinedChoiceSubmit = (
    searchField: 'client' | 'description' | 'name' | 'role' | 'skills',
    searchQueryChoice: string,
  ) => {
    let searchQueries = [] as string[]

    if (searchField === 'role') {
      const relatedRoles = getRelatedRoles(searchQueryChoice)

      if (relatedRoles?.length) {
        searchQueries = relatedRoles
      }
    }

    searchQueries.push(searchQueryChoice)

    const results = searchByArray(searchQueries, [searchField])

    navigate('ProjectSearchResults', {
      results,
      resultsType: 'groupOfTerms',
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

    const results = searchByArray(searchQueries, [
      'client',
      // default weight is 1, put less importance on description field as more likely to return false positive matches
      { name: 'description', weight: 0.5 },
      'name',
      'role',
      'skills',
    ])

    navigate('ProjectSearchResults', {
      results,
      resultsType: 'singleTerm',
      searchField: undefined,
      searchQuery,
    })
  }

  const searchByArray = (
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

  return (
    <SafeAreaView>
      <ScrollView>
        <TopOfApp />
        <FreeSearchBar
          handleSearch={handleSearch}
          handleSubmit={handleFreeTextSubmit}
        />
        <Heading>Popular Searches</Heading>
        <SubHeading>Roles</SubHeading>
        <SectionView>
          {Roles.map((role, index) => (
            <QuickSearchButton
              onPress={() => handlePreDefinedChoiceSubmit('role', role)}
              key={index}
            >
              <QuickSearchTitle>{role}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Causes</SubHeading>
        <SectionView>
          {Causes.map((cause, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <QuickSearchTitle>{cause}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Tech Stack / Languages</SubHeading>
        <SectionView>
          {TechStack.map((tech, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <QuickSearchTitle>{tech}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchContainer
