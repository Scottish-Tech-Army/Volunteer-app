/**
 * @file A generalised stacked container used for events or projects.
 */
import React from 'react'
import {
  Box,
  FlatList,
  NativeBaseProvider,
  Text,
  Heading,
  Button,
  HStack,
} from 'native-base'
import Aegon from '@/NativeBase/Theme/Aegon'
import TechBadge from '../Components/TechBadge'
import { ColorType } from 'native-base/lib/typescript/components/types'

type TechBadge = {
  caption: string
  color?: ColorType
}
type data = {
  id: string
  title: string
  charity: string
  role: string
  description: string
  badge: TechBadge
  hours: string
  buddying: true
}

const data = [
  {
    id: '1',
    title: 'Fyne Futures Charity Inventory Integration',
    charity: 'Fyne Futures Ltd',
    role: 'Business analyst',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    badge: [{ caption: 'Analysis', ColorType: 'primary' }],
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
    badge: [{ caption: 'Analysis', ColorType: 'primary' }],
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
    badge: [{ caption: 'Analysis', ColorType: 'primary' }],
    hours: '1-4 hours per week',
    buddying: true,
  },
]

const VerticalStackContainer = () => {
  return (
    <NativeBaseProvider theme={Aegon}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box padding={2} margin={2} bg={'bg.100'} rounded="md" shadow={4}>
            <Heading paddingBottom={2}>{item.title}</Heading>
            <Text fontWeight={'bold'}>{item.charity}</Text>
            <Text>{item.role}</Text>
            <Text>{item.description}</Text>
            <TechBadge badges={item.badge} />
            <Text>{item.hours}</Text>
            <Text>
              {item.buddying
                ? 'Suitable for buddying'
                : 'Not suitable for buddiing'}
            </Text>
            <HStack space={4} justifyContent={'flex-end'}>
              <Button size={'sm'}>Primary</Button>
              <Button size={'sm'} colorScheme={'secondary'} variant={'outline'}>
                Secondary
              </Button>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </NativeBaseProvider>
  )
}

export default VerticalStackContainer
