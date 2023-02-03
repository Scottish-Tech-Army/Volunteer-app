import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  Text,
} from 'native-base'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StackHeaderProps } from '@react-navigation/stack'
import StaTheme from '../Theme/StaTheme'

const NavigationHeader: React.FC<StackHeaderProps> = ({
  back,
  navigation,
  options,
}) => {
  return (
    <>
      <StatusBar />

      <Box safeAreaTop>
        <HStack
          alignItems="center"
          justifyContent={back ? 'space-between' : 'center'}
          marginY={2}
          paddingX={2}
          width="100%"
        >
          {Boolean(back) && (
            <IconButton
              icon={<Icon as={MaterialIcons} name="arrow-back-ios" />}
              marginLeft={0}
              paddingLeft={0}
              onPress={navigation.goBack}
              size="sm"
            />
          )}

          <Heading size="md">{options.title}</Heading>

          {/* Empty Box is here to ensure layout of title and back button */}
          {Boolean(back) && <Box width={8} />}
        </HStack>
      </Box>
    </>
  )
}

export default NavigationHeader
