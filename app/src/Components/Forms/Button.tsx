/**
 * @file Button.
 */

import React, { FC } from 'react'
import styled from 'styled-components/native'

interface ButtonProps {
  disabled: boolean
  listItem?: boolean
  listSelected?: boolean
  onPress: () => void
  primary?: boolean
  text: string
}

/**
 * Tappable button component
 *
 * @param {ButtonProps} props The component props
 * @param {boolean} props.disabled Should button be disabled
 * @param {boolean} [props.listItem] Is this one of a list of choices
 * @param {boolean} [props.listSelected] Is this selected in a list of choices
 * @param {function} props.onPress Function to run when button is pressed
 * @param {boolean} [props.primary] Is it a main (primary) button
 * @param {string} props.text The text to show on the button
 * @returns {ReactElement} Component
 */
const Button: FC<ButtonProps> = ({
  disabled,
  listItem,
  listSelected,
  onPress,
  primary,
  text,
}) => {
  const ButtonView = styled.TouchableOpacity`
    background-color: ${props =>
      listSelected ? props.theme.colors.staOrange : 'transparent'};
    border: ${props =>
      listItem
        ? `2px solid ${props.theme.colors.greyFaint}`
        : `2px solid ${props.theme.colors.staBlack}`};
    border-radius: 20px;
    display: flex;
    margin: ${listItem ? '5px 0' : '10px 0'};
    padding: 5px 10px 5px 10px;
    width: 100%;
  `

  const ButtonText = styled.Text`
    color: ${props => (listSelected ? 'white' : props.theme.colors.staBlack)};
    font-size: 18px;
    font-weight: ${primary ? 'bold' : 'normal'};
    justify-content: center;
    text-align: center;
  `

  return (
    <ButtonView disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonView>
  )
}

export default Button
