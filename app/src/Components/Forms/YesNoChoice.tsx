import React, { FC } from 'react'
import { Switch } from 'react-native'
import styled from 'styled-components/native'

interface YesNoChoiceProps {
  description: String
  onChange: (value: Boolean) => void
  value: Boolean
}

const YesNoChoiceView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const YesNoChoiceDescription = styled.Text`
  font-size: 16px;
  margin-right: 12px;
`

const YesNoChoice: FC<YesNoChoiceProps> = ({ description, onChange, value }) => {
  return (
    <YesNoChoiceView>
      <YesNoChoiceDescription>{description}</YesNoChoiceDescription>
      <Switch
        onValueChange={onChange}
        value={value}
      />
    </YesNoChoiceView>
  )
}

export default YesNoChoice
