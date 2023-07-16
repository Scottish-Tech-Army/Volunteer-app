/**
 * @file A generalised stacked container used for events or projects.
 */
import React from 'react'
import {
  Box,
  FlatList,
  Text,
  Heading,
  Button,
  HStack,
  FavouriteIcon,
  VStack,
} from 'native-base'
import TechBadge from '../Components/TechBadge'
import TopOfApp from '../Components/TopOfApp'
import { ColorType } from 'native-base/lib/typescript/components/types'

type TechBadge = {
  caption: string
  color: ColorType
}

const data = [
  {
    id: '1',
    title: 'Fyne Futures Charity Inventory Integration',
    charity: 'Fyne Futures Ltd',
    role: 'Business analyst',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    badge: [
      { caption: 'Analysis', color: 'primary' },
      { caption: 'Data', color: 'secondary' },
    ],
    hours: '1-4 hours per week',
    buddying: true,
  },
  {
    id: '2',
    title: 'Fyne Futures Charity Inventory Integration',
    charity: 'Fyne Futures Ltd',
    role: 'Frontend Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    badge: [{ caption: 'Frontend', color: 'primary' }],
    hours: '1-4 hours per week',
    buddying: true,
  },
  {
    id: '3',
    title: 'Fyne Futures Charity Inventory Integration',
    charity: 'Fyne Futures Ltd',
    role: 'Backend Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    badge: [{ caption: 'Backend', color: 'primary' }],
    hours: '1-4 hours per week',
    buddying: true,
  },
]

const VerticalStackContainer = () => {
  return (
    <>
      <TopOfApp showSearchButton={false} />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            rounded="md"
            margin="2"
            padding="2"
            borderWidth="2"
            borderColor="secondary.100"
          >
            <VStack padding="2" shadow="2">
              <Heading paddingBottom="2">{item.title}</Heading>
              <Text fontFamily="primaryBold">{item.charity}</Text>
              <Text>{item.role}</Text>
              <Text>{item.description}</Text>
              <TechBadge badges={item.badge} />
              <Text>{item.hours}</Text>
              <Text color="secondary.100">
                {item.buddying
                  ? 'Suitable for buddying'
                  : 'Not suitable for buddiing'}
              </Text>
              <HStack space="4" justifyContent={'flex-end'}>
                <Button size="sm" leftIcon={<FavouriteIcon size="sm" />}>
                  Favourite
                </Button>
                <Button size="sm" colorScheme="secondary" variant={'outline'}>
                  Secondary
                </Button>
              </HStack>
            </VStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </>
  )
}

export default VerticalStackContainer
