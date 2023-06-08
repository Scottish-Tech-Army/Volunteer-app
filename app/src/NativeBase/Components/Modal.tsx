/**
 * @file Modal display a message to the user, and optionally button(s) for the user to make a choice.
 */

import React, { FC } from 'react'
import {
  Button,
  Icon,
  Modal as NativeBaseModal,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SecondaryButton from './Forms/SecondaryButton'

export interface ModalButton {
  isSecondary?: boolean
  text: string
  onPress: () => void
}

interface ModalProps {
  body: JSX.Element[]
  header: string
  headerIcon: string // the name of a Material Icons icon
  isOpen: boolean
  onClose?: () => void
  buttons?: ModalButton[]
  requiresButtonPress?: boolean // if true, the user has to press one of the buttons you specify -- if false, they can press on/outside the modal to simply close it
}

const Modal: FC<ModalProps> = ({
  body,
  header,
  headerIcon,
  isOpen,
  onClose,
  buttons,
  requiresButtonPress,
}) => (
  <NativeBaseModal
    closeOnOverlayClick={!requiresButtonPress}
    isOpen={isOpen}
    onClose={onClose}
    justifyContent="center"
    size="xl"
  >
    <NativeBaseModal.Content>
      <Pressable onPress={onClose && !requiresButtonPress ? onClose : null}>
        <NativeBaseModal.Header
          alignItems="center"
          borderBottomWidth="0"
          pb="0"
          _dark={{ color: 'textDarkMode.100' }}
          _light={{ color: 'text.100' }}
        >
          <Icon
            as={MaterialIcons}
            mb="4"
            mt="4"
            color="mediumGrey.100"
            name={headerIcon}
          />
          {header}
        </NativeBaseModal.Header>
        <NativeBaseModal.Body p="0">
          <VStack space="4">
            {body.map((paragraph, index) => (
              <Text key={index} fontSize="sm" p="0" textAlign="center">
                {paragraph}
              </Text>
            ))}
          </VStack>

          {Boolean(buttons?.length) && (
            <VStack marginTop="6">
              {(buttons as ModalButton[]).map(button =>
                button.isSecondary ? (
                  <SecondaryButton
                    key={button.text}
                    onPress={button.onPress}
                    text={button.text}
                  />
                ) : (
                  <Button key={button.text} onPress={button.onPress}>
                    {button.text}
                  </Button>
                ),
              )}
            </VStack>
          )}
        </NativeBaseModal.Body>
      </Pressable>
    </NativeBaseModal.Content>
  </NativeBaseModal>
)

export default Modal
