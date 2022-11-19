import React from 'react'
import { Center, extendTheme, NativeBaseProvider, VStack } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'

const VerticalStackContainer = () => {
  const Aegon = extendTheme({
    components: {
      Text: {
        baseStyle: {
          color: '#3C3C3B',
          fontFamily: 'Poppins-Medium',
        },
      },
      Heading: {
        baseStyle: {
          color: '#D1338A',
          fontFamily: 'Poppins-Medium',
        },
      },
    },
  })
  return (
    <NativeBaseProvider theme={Aegon}>
      <ScrollView>
        <VStack alignItems="center" space="5">
          <Center bg="primary.400" size="16" />
          <Center bg="secondary.400" size="16" />
          <Center bg="emerald.400" size="16" />
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  )
}

export default VerticalStackContainer
