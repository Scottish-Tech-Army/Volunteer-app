/**
 * @file New Application Submitted screen.
 */

//  import { useAuth } from '@/Services/auth'
import { Button, Heading, VStack, Text, Link, Icon } from 'native-base'
import React from 'react'
import StaTheme from '../Theme/StaTheme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

/**
 * A screen container that displays the new submitted application.
 **/
const NewApplicationSubmittedContainer = () => {
  return (
    <VStack
      flex={1}
      padding={4}
      space={4}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Icon size={7} as={MaterialIcons} name="check_circle" color="#3AAA35" />
      <Heading
        textAlign="center"
        size="lg"
        marginTop="80px"
        fontFamily="title"
        color="purple.80"
      >
        APPLICATION SUBMITTED
      </Heading>
      <Text textAlign="center" marginTop="16px">
        We'll review your application and keep you updated on progress via
        email.
      </Text>
      <VStack
        width="100%"
        alignItems="center"
        position="absolute"
        bottom="60px"
      >
        <Button width="90%">Go to Role</Button>

        <Link
          _text={{
            textDecoration: 'none',
            color: StaTheme.colors.primary[100],
          }}
          marginTop="8px"
        >
          Browse Roles
        </Link>
      </VStack>
    </VStack>
  )
}

export default NewApplicationSubmittedContainer
