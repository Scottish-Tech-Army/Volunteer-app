/**
 * @file New Application Submitted screen.
 */

//  import { useAuth } from '@/Services/auth'
import { Button, Heading, VStack, Text, Link, Icon } from 'native-base'
import React from 'react'
import StaTheme from '../Theme/StaTheme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { navigate } from '@/Navigators/utils'
import { Project } from '@/Services/modules/projects'
import { goBack } from '@/Navigators/utils'
import { ListType } from './ListContainer'

/**
 * A screen container that displays the new submitted application.
 **/

interface NewApplicationSubmittedContainerProps {
  project: Project
}

const NewApplicationSubmittedContainer = ({
  project,
}: NewApplicationSubmittedContainerProps) => {
  return (
    <VStack
      flex={1}
      padding={4}
      space={4}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Icon
        size={'95px'}
        as={MaterialIcons}
        name="check-circle-outline"
        color="#3AAA35"
        marginTop="48px"
      />
      <Heading
        textAlign="center"
        size="lg"
        marginTop="64px"
        fontFamily="title"
        color="purple.80"
      >
        APPLICATION SUBMITTED
      </Heading>
      <Text textAlign="center" marginTop="16px" fontSize="md" fontWeight="bold">
        We'll review your application and keep you updated on progress via
        email.
      </Text>
      <VStack
        width="100%"
        alignItems="center"
        position="absolute"
        bottom="60px"
      >
        <Button
          width="90%"
          onPress={() => {
            navigate('ProjectDetail', { item: project, key: project.it_key })
            // goBack()
          }}
        >
          Go to Role
        </Button>

        <Link
          _text={{
            textDecoration: 'none',
            color: StaTheme.colors.primary[100],
          }}
          marginTop="8px"
          onPress={() => {
            navigate('Projects', { type: ListType.Projects, options: {} })
          }}
        >
          Browse Roles
        </Link>
      </VStack>
    </VStack>
  )
}

export default NewApplicationSubmittedContainer
