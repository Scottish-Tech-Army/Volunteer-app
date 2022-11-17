/**
 * @file Displays a small icon (left) and a text label (to the right).
 */

import React, { FC } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'
import ThemeVariables from '@/Theme/Variables'

interface IconAndLabelProps {
  icon: string
  onPress?: () => void
  text: string
}

const IconAndLabelView = styled.TouchableOpacity`
  margin-right: 20px;
  margin-top: 9px;
  display: flex;
  flex-direction: row;
`

const IconAndLabelText = styled.Text`
  font-weight: 600;
  font-size: ${ThemeVariables.FontSize.small}px;
  margin-left: 10px;
`

/**
 * Component to show an icon and a text label
 *
 * @param {IconAndLabelProps} props The component props
 * @param {string} props.icon The name of the icon to use, from the React Native Vector Icons Feather library - see https://oblador.github.io/react-native-vector-icons/
 * @param {Function} [props.onPress] A function to run when the user taps on this component
 * @param {string} props.text The text for the label
 * @returns {ReactElement} Component
 */
const IconAndLabel: FC<IconAndLabelProps> = ({ icon, onPress, text }) => (
  <IconAndLabelView onPress={onPress}>
    <Feather name={icon} size={28} />
    <IconAndLabelText>{text}</IconAndLabelText>
  </IconAndLabelView>
)

export default IconAndLabel
