import React, { FC } from 'react'
import { HStack, Text, Switch } from 'native-base'

interface YesNoChoiceProps {
  description: string
  onChange: (value: boolean) => void
  value: boolean
}

const YesNoChoice: FC<YesNoChoiceProps> = ({
  description,
  onChange,
  value,
}) => {
  return (
    <HStack>
      <Text fontWeight="bold">{description}</Text>
      <Switch colorScheme="secondary" size="md" value={value} />
    </HStack>
  )
}

export default YesNoChoice
