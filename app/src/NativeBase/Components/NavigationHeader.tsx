/**
 * @file This can be used to show a screen title and a back button, usually for detail / individual screens
 * e.g. looking at a specific project or doing an events search
 */

import { Box, Heading, HStack, Icon, IconButton, StatusBar } from 'native-base'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StackHeaderProps } from '@react-navigation/stack'

const NavigationHeader: React.FC<StackHeaderProps> = ({
  back,
  navigation,
  options,
}) => (
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

export default NavigationHeader
