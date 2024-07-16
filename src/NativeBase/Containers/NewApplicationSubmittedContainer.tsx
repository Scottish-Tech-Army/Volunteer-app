/**
 * @file New Application Submitted screen.
 */

//  import { useAuth } from '@/Services/auth'
import { Button, HStack, Heading, VStack } from 'native-base'
import React from 'react'

/**
 * A screen container that displays the  new submitted applicaton.
 **/
const NewApplicationSubmittedContainer = () => {
  return (
    <>
      <VStack flex={1} padding={4} space={4}>
        <HStack>
          <VStack>
            <Heading
              textAlign="center"
              size="lg"
              marginTop={'48px'}
              fontFamily="title"
              color={'purple.80'}
            >
              APPLICATION SUBMITTED
            </Heading>
          </VStack>
        </HStack>

        <VStack minHeight="30%" justifyContent="flex-end">
          <Button width="90%">Go to Role</Button>
        </VStack>
      </VStack>
    </>
  )
}

export default NewApplicationSubmittedContainer
